import Key from "../enum/keys.js";
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

    button.addEventListener("click", () => {

        const modal = button.closest(".popup");

        if (!modal) return;

        const hasID = modal.dataset.id;

        console.log("ID:", hasID);

        if (hasID == "null")
            saveTask();
        else
            updateTask();
    });
        
}

function updateTask()
{
    console.log("Updating task");
    
}


function saveTask()
{   
    console.log("Saving new.");
    const input = document.querySelector("title");

    if (input.value === "")
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

        const key = Key.TODO;
        
        const data = {
            id: Utils.generateItemID(),
            title: input.value,
            entries: listValues,
            status: Status.NOT_DONE,
            time: "",
        }

        console.log("data:", data);

        Storage.insertItem(key, data);
    }
    
}