import Key from "../enum/keys.js";
import Status from "../enum/status.js";
import { handleModals } from "../handlers/handlers.js";
import Utils from "../utils/Utils.js";
import TaskModal from "./modals/TaskModal.js";
import GoalModal from "./modals/GoalModal.js";
import Calendar from "./Calendar.js";
import AgendaModal from "./modals/AgendaModal.js";
import TaskAPI from "../api/storage.js";
import { routeToPage } from "../index.js";

export default class Components
{
    static refresh()
    {
        refreshTaskPanel();
        refreshDashboard();
        refreshGoalsPanel();
        refreshProjectsPanel();
        handleModals();
    }
}

function refreshDashboard()
{
    //Get UL element with the Today's list of tasks
    const agenda = document.querySelector(".agenda");
    const calendar = Calendar.getAgenda(Calendar.getCurrentDate());
    
    if (!agenda) return;

    agenda.innerHTML = ""; //Reset agenda for every refresh

    //Add right-side components
    let output = document.getElementById("output");

    output.textContent = `${calendar.output.toString()}`;

    //Add left-side components

    //Update today's date
    let date = document.getElementById("date");
    date.textContent = `${Calendar.today()}`;

    const progressBar = document.createElement("li");
    progressBar.classList.add("progress-bar");
    let progressDiv = document.createElement("div");
    progressDiv.classList.add("progress");
    progressBar.appendChild(progressDiv);

    let meter = document.createElement("span");
    meter.classList.add("meter");
    progressDiv.appendChild(meter);

    let bar = document.createElement("span");
    bar.classList.add("bar");
    meter.appendChild(bar);

    let text = document.createElement("span");
    text.classList.add("text");
    
    progressDiv.appendChild(text);

    agenda.appendChild(progressBar);

    let tasks = calendar.tasks;

    Utils.renderProgress(tasks, bar);
    text.textContent = `${Utils.getNumItemsDone(tasks)} / ${Utils.getNumItemsTotal(tasks)} (${Utils.getItemsDonePercentile(tasks)})`;

    tasks.forEach(task => {

        const listContainer = document.createElement("li");
        listContainer.setAttribute("data-modal-agenda", "");
        listContainer.classList.add("task");
        listContainer.setAttribute("task-id", task.id);
        agenda.appendChild(listContainer);

        if (task.status == Status.DONE)
        {
            listContainer.classList.add("checked");
        }

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
        time.appendChild(clock);

        let time_entry = document.createElement("span");
        time_entry.textContent = task.time;
        time.appendChild(time_entry);

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

    const container = document.getElementById("modal");
    const taskItems = document.querySelectorAll("[data-modal-agenda]");

    taskItems.forEach(task => {
        task.addEventListener("click", () => {
            let id = task.getAttribute("task-id");
            AgendaModal.open(container, id);
        });
    });
}

function refreshTaskPanel()
{
    const taskList = document.querySelector(".task-list");

    if (!taskList) return;

    const data = TaskAPI.getItems(Key.TODO);

    if(!data) return;

    taskList.innerHTML = "";

    data.forEach(item => {

        //Create li element containter for the item
        const li = document.createElement("li");

        //Attach modal-target attribute to li so it opens the modal
        li.setAttribute("data-task-item", "");

        //Store item id in state
        li.setAttribute("task-id", item.id);

        if(item.status == 2)
        {
            li.classList.add("checked");
        }
        else
        {
            li.classList.remove("checked");
        }

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
            let id = parseInt(item.getAttribute("task-id"));
            TaskModal.openTaskModal(container, id);
        });
    });

      
}

function refreshGoalsPanel()
{
    const goalsList = document.querySelector(".goals-list");

    if (!goalsList) return;

    const data = TaskAPI.getItems(Key.GOAL);

    if (!data) return;

    goalsList.innerHTML = "";

    data.forEach(goal => {

        const li = document.createElement("li");
        li.setAttribute("data-goal-item", "");
        li.classList.add("goal");
        li.setAttribute("goal-id", goal.id);
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
        Utils.renderProgress(goal.entries, bar);
        meter.appendChild(bar);

        let text = document.createElement("span");
        text.classList.add("text");
        text.textContent = `${Utils.getNumItemsDone(goal.entries)} / ${Utils.getNumItemsTotal(goal.entries)} (${Utils.getItemsDonePercentile(goal.entries)})`;
        progressDiv.appendChild(text);

        let menu = document.createElement("i");
        menu.classList.add("bx", "bx-dots-vertical-rounded");
        li.appendChild(menu);
    });

    const container = document.getElementById("modal");
    const goalItems = document.querySelectorAll("[data-goal-item]");

    goalItems.forEach(goal => {
        goal.addEventListener("click", () => {
            let id = parseInt(goal.getAttribute("goal-id"));
            GoalModal.open(container, id);
        });
    });
}

function refreshProjectsPanel()
{
    const projectList = document.querySelector(".project-list");

    if(!projectList) return;

    const data = TaskAPI.getItems(Key.PROJECT);

    if(!data) return;

    projectList.innerHTML = "";

    data.forEach( project => {

        const listItem = document.createElement("li");
        listItem.classList.add("project");

        listItem.addEventListener("click", () => {
            routeToPage(`/dashboard/projects/${project.id}`);
        });

        listItem.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            console.log("Right Click!");
        });

        projectList.appendChild(listItem);

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info");
        listItem.appendChild(infoDiv);

        let title_span = document.createElement("span");
        title_span.classList.add("title");
        title_span.textContent = project.name;
        infoDiv.appendChild(title_span);

        let desc_span = document.createElement("span");
        desc_span.classList.add("description");
        desc_span.textContent = project.description;
        infoDiv.appendChild(desc_span);

        let date_span = document.createElement("date");
        date_span.classList.add("date");
        date_span.textContent = project.date;
        infoDiv.appendChild(date_span);

        const progressDiv = document.createElement("div");
        progressDiv.classList.add("progress");
        listItem.appendChild(progressDiv);

        

        const menuDiv = document.createElement("div");
        menuDiv.classList.add("menu");
        listItem.appendChild(menuDiv);

        let i = document.createElement("i");
        i.classList.add("bx", "bx-dots-vertical-rounded");
        menuDiv.appendChild(i);
    });
}



