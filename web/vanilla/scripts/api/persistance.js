import Utils from "../utils/Utils.js";
import Status from "../enum/status.js";
import Storage from "./storage.js";

export function registerPersistanceHandlers()
{
    document.addEventListener("DOMContentLoaded", () => {
        createOrUpdateTask();
    });
}

function createOrUpdateTask()
{
    const button = document.getElementById("update-task");

    try {
        
        const modal = button.closest(".popup");

        const id = modal.dataset.id;

        if (!id)
            saveTask();
        else
            updateTask();

    } catch (error) {
        
    }
        
}


function saveTask()
{   
    const saveButton = document.getElementById("update-task");

    saveButton.addEventListener("click", () => {
    
        const entryTitle = document.getElementById("title");

        if (entryTitle.value === "")
        {
            alert("Please enter a title!");
        }
        else{

            const listElements = [...document.getElementById("task-items").children];

            let listValues = []
    
            for (let i = 0; i < listElements.length; i++)
            {
                let span = listElements[i].lastChild;
                listElements[i].removeChild(span);
                
                listValues.push({
                    index: i,
                    task: listElements[i].innerHTML,
                    status: Status.NOT_DONE
                });
            }

            const key = "todo";
            
            const data = {
                id: Utils.generateItemID(),
                title: entryTitle.value,
                entries: listValues,
                status: Status.NOT_DONE,
                time: "",
            }

            Storage.insertItem(key, data);
        }
    });
    
}