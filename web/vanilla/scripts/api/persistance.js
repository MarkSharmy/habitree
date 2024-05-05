import Key from "../enum/keys.js";
import Utils from "../utils/Utils.js";
import Status from "../enum/status.js";
import Storage from "./storage.js";


export default class Model 
{
    static saveTask(input)
    {   
        if (input.value === "")
        {
            alert("Please enter a title!");
        }
        else
        {

            const taskItems = document.querySelector(".task-items");
            const listElements = [...taskItems.children];

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

            Storage.insertItem(key, data);
        }
        
    }

    static updateTask(input, id)
    {
        if (input.value === "")
        {
            alert("Please enter a title!");
        }
        else
        {
            const taskItems = document.querySelector(".task-items");
            const listElements = [...taskItems.children];

            let listValues = []

            for (let i = 0; i < listElements.length; i++)
            {
                let span = listElements[i].lastChild;
                listElements[i].removeChild(span);

                let status = Status.NOT_DONE;

                if (listElements[i].classList.contains("checked"))
                    status = Status.DONE;
                
                listValues.push({
                    index: i,
                    task: listElements[i].innerHTML,
                    status: status,
                });
            }

            const key = Key.TODO;
            
            const data = {
                id: id,
                title: input.value,
                entries: listValues,
                status: Status.NOT_DONE,
                time: "",
            }

            Storage.updateItem(key, data);
        }
    }

    static deleteTask(id)
    {
        const key = Key.TODO;
        Storage.deleteItem(key, id);
    }

}