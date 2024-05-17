import Key from "../enum/keys.js";
import Status from "../enum/status.js";
import Storage from "../api/storage.js"
import DashboardUtil from "../handlers/DashboardUtil.js";
import { handleModals } from "../handlers/handlers.js";
import Utils from "../utils/Utils.js";

export default class Components
{
    static refresh()
    {
        refreshTaskPanel();
        refreshDashboard();
        refreshGoalsPanel();
        handleModals();
    }
}

function refreshDashboard()
{
    //Get UL element with the Today's list of tasks
    const agenda = document.querySelector(".agenda");
    
    if (!agenda) return;

    agenda.innerHTML = ""; //Reset agenda for every refresh

    const progressBar = document.createElement("li");
    progressBar.classList.add("progress-bar");
    progressBar.innerText = "1 / 4 (25%)";

    agenda.appendChild(progressBar);

    const tasks = DashboardUtil.getCurrentAgenda();

    tasks.forEach(task => {
        console.log(task);

        const listContainer = document.createElement("li");
        listContainer.setAttribute("data-modal-agenda", "");
        listContainer.classList.add("task");

        const article = document.createElement("article");
        article.classList.add("task-entry");

        let title = document.createElement("p");
        title.innerText = task.title;
        article.appendChild(title);

        let taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        let time = document.createElement("time");
        taskInfo.appendChild(time);

        let clock = document.createElement("i");
        clock.classList.add("bx", "bx-time");
        taskInfo.appendChild(clock);

        let progress = document.createElement("span");
        progress.classList.add("progress");
        progress.innerText = "Progress: " + Status.getStatus(task.status);
        taskInfo.appendChild(progress);

        let menu = document.createElement("i");
        menu.classList.add("bx", "bx-dots-vertical");

        article.appendChild(taskInfo);
        listContainer.appendChild(article);
        listContainer.appendChild(menu);
        agenda.appendChild(listContainer);

    });

    const btnItem = document.createElement("li");
    btnItem.classList.add("btn-item");

    const addButton = document.createElement("button");
    addButton.innerText = "Add";
    addButton.addEventListener("click", () => {

    });

    btnItem.appendChild(addButton);
    agenda.appendChild(btnItem);
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

function refreshGoalsPanel()
{
    const goalsList = document.querySelector(".goals-list");

    if (!goalsList) return;

    const data = Storage.getItems(Key.GOAL);

    if (!data) return;

    goalsList.innerHTML = "";

    data.forEach(goal => {

        const li = document.createElement("li");
        li.classList.add("goal");
        goalsList.appendChild(li);

        const itemBox = document.createElement("div");
        itemBox.classList.add("item-box");
        li.appendChild(itemBox);

        let icon_span = document.createElement("span");
        icon_span.classList.add("icon");
        itemBox.appendChild(icon_span);

        let icon = document.createElement("img");
        icon.src = Utils.getIcon(goal.type);
        icon.alt = "icon";
        icon.height = "36";
        icon_span.appendChild(icon);

        let infoDiv = document.createElement("info");
        infoDiv.classList.add("info");
        itemBox.appendChild(infoDiv);

        let title = document.createElement("h4");
        title.classList.add("title");
        title.textContent = goal.title;
        infoDiv.appendChild(title);

        let latest = document.createElement("p");
        latest.classList.add("latest");
        latest.textContent = Utils.getCurrent(goal);
        infoDiv.appendChild(latest);

        let progressDiv = document.createElement("div");
        progressDiv.classList.add("progress");
        itemBox.appendChild(progressDiv);

        let meter = document.createElement("span");
        meter.classList.add("meter");
        progressDiv.appendChild(meter);

        let bar = document.createElement("span");
        bar.classList.add("bar");
        Utils.renderProgress(goal, bar);
        meter.appendChild(bar);

        let text = document.createElement("span");
        text.classList.add("text");
        text.textContent = `${Utils.getNumItemsDone(goal)} / ${Utils.getNumItemsTotal(goal)} (${Utils.getItemsDonePercentile(goal)})`;
        progressDiv.appendChild(text);

        let menu = document.createElement("i");
        menu.classList.add("bx", "bx-dots-vertical-rounded");
        li.appendChild(menu);
    });
}



