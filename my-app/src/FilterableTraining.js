import React, { useMemo, useRef, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import styled from 'styled-components'
import Papa from 'papaparse';
import { CSVReader } from 'react-papaparse';
import {AgGridColumn, AgGridReact } from 'ag-grid-react';
import { BaseGridSerializingSession, CellMouseOverEvent } from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }`
  
function loadTraining(event, resultHandler) {
    console.log(event);
    let file = event.target.files[0];
    console.log(`Target: ${file}`);
    let reader = new FileReader();
    reader.onloadend = function(event) { 
        console.log('Loaded!');
        //console.log(event.target.result);
        const csvLoadResult = Papa.parse(event.target.result);
    };
    //reader.readAsText(file);

    Papa.parse(file, { header: true, complete: function(results) {
//        console.log(JSON.stringify(results.data));
        resultHandler(results);
    }});
}

function ShowTraining(props) {
    const csv = props.data;
    let json = Papa.parse
}

function TrainingTable(props) {
    const filterState = props.filterState;
    const columns = useMemo(() => [
        {
            Header: "Training",
            columns: filterState.columns.map(c => ( {
                Header: c,
                accessor: c
            }))
        }
    ], []);
    const data = props.data;

              // Use the useTable Hook to send the columns and data to build the table
              const {
                getTableProps, // table props from react-table
                getTableBodyProps, // table body props from react-table
                headerGroups, // headerGroups, if your table has groupings
                rows, // rows for the table based on the data passed
                prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
              } = useTable({
                columns,
                data
              },
              useSortBy);
            
  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
    // Render the UI for your table
    return (
        <div>
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' v'
                                            : ' ^'
                                        : ' -'}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>                    
                    {rows.filter(row => {
                        return filterState.roleState[row.original.Role];
                    }).map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
            )
}

const Checkbox = ({ label, isSelected, onCheckboxChange }) =>
    (
    <div className="form-check">
      <label>
        <input
          type="checkbox"
          name={label}
          checked={isSelected}
          onChange={onCheckboxChange}
          className="form-check-input"
        />
        {label}
      </label>
    </div>
  );

function useFilterState() {
    const columns = [ "Readiness Name", "Role", "Level", "Description" ];
    const [roles, setRoles] = useState([]);
    const [roleState, setRoleState] = useState({});

    const setRolesWithDefault = (roles) => {
        let tempRoleState = {};
        tempRoleState = roles.reduce((tempRoleState, role) => ({
            ...tempRoleState,
            [role]: true
        }), {});
        console.log(`roleState: ${tempRoleState}`);
    
        setRoleState(tempRoleState);
        setRoles(roles);
    };

    const toggleRole = (role) => {
        setRoleState(prevState => ({
            ...prevState,
            [role]: !prevState[role]
        }))};

    return {
        columns,
        roles,
        setRolesWithDefault,
        roleState,
        toggleRole
    }
}

function parseUniqueValues(data, key) {
    if(!(data instanceof Array)) {
        throw Error("Data should be array!");
    }
    let uniqueValues = new Set();
    data.forEach(row => {
        const value = row[key];
        if(value) {
            uniqueValues.add(value);
        }
    });

    return [ ...uniqueValues].sort();
}

function AGTrainingTable(props) {
    const gridRef = useRef(null);
    const filterState = props.filterState;
    const rowData = props.data;

    const mouseOverHandler = (event) => {
        console.log(`Mouse over: ${event.value}`);
        console.log(event.column);
    };

    return (
        <div>            
        <div className="ag-theme-alpine" style={{height: 800, width: 1200}}>
            <AgGridReact
                rowData={rowData} ref={gridRef} onCellMouseOver={mouseOverHandler}>
                <AgGridColumn field="Readiness Name" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="Role" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="Level" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="Major Category" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="Cost" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="Readiness Name" sortable={true}></AgGridColumn>
            </AgGridReact>
        </div>
        </div>
    );
}

export default function FilterableTraining() {
    let [data, setData] = useState();
    const filterState = useFilterState();

    const trainingLoader = (event) => {
        const resultHandler = (results) => 
        {
            filterState.setRolesWithDefault(parseUniqueValues(results.data, "Role"));
            setData(results.data);
        }
        loadTraining(event, resultHandler);
        
    };
    if(!data || data.length === 0) { 
    return (
        <div>
            <input type='file' onChange={trainingLoader}></input>
        </div>
    );
    }

    return (
        <Styles>
            { filterState.roles.map(role => 
                <Checkbox label={role} isSelected={filterState.roleState[role]} onCheckboxChange={() => { 
                    filterState.toggleRole(role);
                }} />
            )}
            <TrainingTable data={data} filterState={filterState} />
        </Styles>    );
}