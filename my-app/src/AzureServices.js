import React, { useMemo, useRef, useState } from 'react';

import './AzureServices.css';

            /*
            <script>{`
var acc = document.getElementsByClassName("categoryButton");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
      console.log("Hi");
    this.classList.toggle("active");
    var panel = document.getElementById(this.textContent);
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
`}</script>
*/

export default function AzureServiceView(props) {
    
    return (
        <div class="azureServiceView">
            <h1>Browse Azure products</h1>
            <div class="categoryView"> 
                <CategoryList />
                <ServiceCategory name="Compute"/>
                <ServiceCategory name="Web"/>
            </div>
        </div>
    );
}

function CategoryList(props) {
    const categories = [ {
        name: "Compute"
    }, {
        name: "Web" 
    }];

    const hideAllPanels = () => {
        categories.forEach(category => {
            let panel = document.getRootNode().querySelector("#".concat(category.name));
            panel.style.display = "none";
            console.log(`Hid ${category.name}`);
        });
    }

    const toggleThings = category => {
        
        hideAllPanels();
        let panel = document.getRootNode().querySelector("#".concat(category.name));

        if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
    }

    return (
        <div class="categoryList">
            <h2 class="categoryTitleSpacer">Spacer</h2>
            {categories.map(category => (
                <button class="categoryButton" onClick={event => toggleThings(category)}>{category.name}</button>
            ))}
        </div>
    );
}

function ServiceCategory(props) {
    return (
        <div class="serviceCategory" id={props.name}>
            <h2>{props.name}</h2>
            <ServiceCardView />
        </div>
    );
}

function ServiceCardView(props) {
    const services = [
        {
            name: "Function",
            desc: "Some info about a function!"
        }, {
            name: "Function",
            desc: "Some info about a function!"
        }, {
            name: "Function",
            desc: "Some info about a function!"
        }, {
            name: "Function",
            desc: "Some info about a function!  A really long fun with a longer than normal description so we can see how it displays!"
        }, {
            name: "Function",
            desc: "Some info about a function!"
        }, {
            name: "Function",
            desc: "Some info about a function!"
        }, {
            name: "Function",
            desc: "Some info about a function!"
        }, {
            name: "Function",
            desc: "Some info about a function!"
        }
    ];

    return (
        <div class="serviceContainer">
            {services.map(service => (
                <div class="card">
                    <img class="cardImg" src="https://static.docs.com/ui/media/product/azure/app-service.svg" loading="lazy" width="48" height="48"></img>
                    <div class="cardInfo">
                        <h3 class="cardTitle">{service.name}</h3>
                        <p class="cardDesc">{service.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}