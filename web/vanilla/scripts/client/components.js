import Key from "../enum/keys.js";
import Storage from "../api/storage.js";

export default class Components
{
    static createApplicationComponents()
    {
        document.addEventListener("DOMContentLoaded", () => {
            createSubTask();
        });
    }

    static loadParsedComponents()
    {
        onTaskPanelLoaded();

    }

    static createTaskModal(element)
    {
        const popup = document.createElement("div");
        popup.classList.add("popup", "active");
        const header = document.createElement("header");

        let titleDiv = document.createElement("div");
        titleDiv.classList.add("title");

        let titleSpan = document.createElement("span");
        titleSpan.classList.add("text");
        titleSpan.innerText = "Title:";
        
        let titleInput = document.createElement("input");
        titleInput.setAttribute("id", "title");
        titleInput.setAttribute("type", "text");
        titleInput.placeholder = "Enter title";

        titleDiv.appendChild(titleSpan);
        titleDiv.appendChild(titleInput);
        header.appendChild(titleDiv);

        let closeButton = document.createElement("button");
        closeButton.setAttribute("data-close-button", "");
        closeButton.classList.add("btn-close");
        closeButton.innerHTML = "&times";
        header.appendChild(closeButton);

        const body = document.createElement("article");
        body.classList.add("body");

        let hgroup = document.createElement("hgroup");
        let section = document.createElement("section");
        let footer = document.createElement("footer");

        let label = document.createElement("label");
        label.setAttribute("for", "list-type");
        label.innerHTML = "Type: ";
        hgroup.appendChild(label);

        let optionSpan = document.createElement("span");

        let selection = document.createElement("select");
        selection.name = "list-type";

        let option = document.createElement("option");
        option.value = "Todo";
        option.innerText = "Todo";
        selection.appendChild(option)
        optionSpan.appendChild(selection);
        hgroup.appendChild(optionSpan);

        let taskItems = document.createElement("ul");
        taskItems.setAttribute("id", "task-items");
        
        let entryDiv = document.createElement("div");
        entryDiv.classList.add("add-entry");



        body.appendChild(hgroup);
        body.appendChild(section);
        body.appendChild(footer);

        popup.appendChild(header);
        popup.appendChild(body);
        element.appendChild(popup);

    }
}

function onDashboardLoaded()
{

}

function onTaskPanelLoaded()
{
    const taskList = Array.from(document.getElementsByClassName("task-list")).pop();

    if (!taskList) return;

    const data = Storage.getItems(Key.TODO);

    if(!data) return;

    data.forEach(item => {

        //Create li element containter for the item
        const li = document.createElement("li");

        //Attach modal-target attribute to li so it opens the modal
        li.setAttribute("data-modal-target", "#modal");

        //Store item id in state
        li.dataset.id = item.id;

        //Create li item components
        const div = document.createElement("div");
        div.classList.add("item-box");
        //Add icon to item
        const iconSpan = document.createElement("span");
        iconSpan.classList.add("icon");
        const img = document.createElement("img");

        //TODO: Create function to change url src based on item type
        img.src = "/images/icons_read.svg";
        img.alt = "icon";
        const h3 = document.createElement("h3");
        //Add item title 
        h3.innerHTML = item.title;
        h3.classList.add("title");
        //TODO: Progress bar div
        const innerDiv = document.createElement("div");
        innerDiv.classList.add("progress-bar");
        //TODO: Menu bar options
        const menuSpan = document.createElement("span");
        menuSpan.classList.add("menu");
        const i = document.createElement("i");
        i.classList.add("bx");
        i.classList.add("bx-dots-vertical-rounded");

        //Append children to parent nodes
        iconSpan.appendChild(img);
        div.appendChild(iconSpan);       
        div.appendChild(h3);
        div.appendChild(innerDiv);
        menuSpan.appendChild(i);
        li.appendChild(div);
        li.appendChild(menuSpan);
        taskList.appendChild(li);

    });

      
}

function createSubTask()
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