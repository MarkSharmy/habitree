import { readData } from "../api/data.js";

export function registerEventHandlers() 
{
    document.addEventListener("DOMContentLoaded", () => {
        //onTaskPanelLoaded();
    });
}

export function loadParsedComponents()
{
    onTaskPanelLoaded();
}

function onTaskPanelLoaded()
{
    const taskList = Array.from(document.getElementsByClassName("task-list")).pop();

    const data = readData("todo");

    if(!data) return;

    const parsedData = JSON.parse(data);

   const dataEntries = parsedData.entries;

   dataEntries.forEach(element => {
        const li = document.createElement("li");
        li.setAttribute("data-modal-target", "#modal");
        const div = document.createElement("div");
        div.classList.add("item-box");
        const iconSpan = document.createElement("span");
        iconSpan.classList.add("icon");
        const img = document.createElement("img");
        img.src = "/images/icons_read.svg";
        img.alt = "icon";
        const h3 = document.createElement("h3");
        h3.innerHTML = element.title;
        h3.classList.add("title");
        const innerDiv = document.createElement("div");
        innerDiv.classList.add("progress-bar");
        const menuSpan = document.createElement("span");
        menuSpan.classList.add("menu");
        const i = document.createElement("i");
        i.classList.add("bx");
        i.classList.add("bx-dots-vertical-rounded");

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