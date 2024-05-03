import { saveData } from "../api/data.js";

export function registerComponents()
{
    document.addEventListener("DOMContentLoaded", () => {
        createEntry();
        saveEntry();
    });
}

function createEntry()
{
    const addButton = document.querySelectorAll("[data-btn-add]");
    const taskItems = document.getElementById("task-items");

    addButton.forEach(button => {
        button.addEventListener("click", ()=> {
            const input = document.getElementById("data-entry");

            if(input.value === "")
            {
                alert("Please write something");
            }

            let li = document.createElement("li");
            li.classList.add("item");
            li.innerHTML = input.value;
            taskItems.appendChild(li);

            li.addEventListener("click", () => {
                li.classList.toggle("checked");
            });

            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            input.value = "";

            span.addEventListener("click", () => {
                const listEntry = span.closest(".item");
                taskItems.removeChild(listEntry);
            });
        });
        
    });
}

function saveEntry()
{   
    const saveButton = Array.from(document.getElementsByClassName("btn-save"));

    saveButton.forEach(button => {

        button.addEventListener("click", () => {
    
            const entryTitle = document.getElementById("title");

            if (entryTitle.value === "")
            {
                alert("Please enter a title!");
            }
            else{

                const listElements = [...document.getElementById("task-items").children];
    
                let listValues = []
        
                listElements.forEach(item => {
                    item.removeChild(item.lastChild);
                    listValues.push(item.innerText);
                });
                
                const dataEntry = {
                    title: entryTitle.value,
                    tasks: listValues
                };

                saveData(dataEntry, "todo");
            }
        });
    });
    
}