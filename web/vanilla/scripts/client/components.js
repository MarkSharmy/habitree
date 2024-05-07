import DashboardUtil from "../handlers/DashboardUtil.js";

export default class Components
{

    static refresh()
    {
        refreshTaskPanel();
        refreshDashboard();
    }
}

function refreshDashboard()
{
    console.log("Refresh");
    const agenda = document.querySelector(".agenda");
    const progressBar = document.createElement("li");
    progressBar.classList.add("progress-bar");
    agenda.appendChild(progressBar);

    const tasks = DashboardUtil.getCurrentAgenda();

    tasks.forEach(task => {
        
    });
}

function refreshTaskPanel()
{
    const taskList = document.querySelector(".task-list");

    if (!taskList) return;

    const data = Storage.getItems(Key.TODO);

    if(!data) return;

    taskList.innerHTML = "";

    data.forEach(item => {

        //Create li element containter for the item
        const li = document.createElement("li");

        //Attach modal-target attribute to li so it opens the modal
        li.setAttribute("data-task-item", "");

        //Store item id in state
        li.setAttribute("listID", item.id);

        //Create li item components
        const div = document.createElement("div");
        div.classList.add("item-box");
        //Add icon to item
        const iconSpan = document.createElement("span");
        iconSpan.classList.add("icon");
        const img = document.createElement("img");

        //TODO: Create function to change url src based on item type
        img.src = "../images/icons_read.svg";
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

    const container = document.getElementById("modal");
    const taskListItems = document.querySelectorAll("[data-task-item]");

    taskListItems.forEach(item => {
        item.addEventListener("click", () => {
            let id = parseInt(item.getAttribute("listID"));
            Components.openTaskModal(container, id);
        });
    });

      
}



