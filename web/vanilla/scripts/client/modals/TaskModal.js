import Components from "../components.js";
import Model from "../../api/persistance.js"
import Key from "../../enum/keys.js";
import Storage from "../../api/storage.js";

export default class
{
    static close(element)
    {
        element.innerHTML = "";
        const overlay = document.getElementById("overlay");
        overlay.classList.remove("active");
        Components.refresh();
    }

    static save(element, title)
    {
        Model.saveTask(title);
        this.close(element);
    }

    static update(element, title, id)
    {
        Model.updateTask(title, id);
        this.close(element);
    }

    static delete(element, id)
    {
        Model.deleteTask(id);
        this.close(element);
    }

    static createTaskModal(container)
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
        closeButton.addEventListener("click", () => {this.close(container)});
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

        let statusLabel = document.createElement("label");
        statusLabel.setAttribute("for", "status");
        statusLabel.innerHTML = "Status: ";
        hgroup.appendChild(statusLabel);

        let contSpan = document.createElement("span");

        let statSelection = document.createElement("select");
        statSelection.name = "list-type";

        let not_done = document.createElement("option");
        not_done.value = "Not done";
        not_done.innerText = "Not done";
        statSelection.appendChild(not_done);

        let doing = document.createElement("option");
        doing.value = "Doing";
        doing.innerText = "Doing";
        statSelection.appendChild(doing);

        let done = document.createElement("option");
        done.value = "Done";
        done.innerText = "Done";
        statSelection.appendChild(done);

        contSpan.appendChild(statSelection);
        hgroup.appendChild(contSpan);

        let taskItems = document.createElement("ul");
        taskItems.classList.add("task-items");
        section.appendChild(taskItems);

        let entryDiv = document.createElement("div");
        entryDiv.classList.add("add-entry");

        let taskInput = document.createElement("input");
        taskInput.setAttribute("type", "text");
        taskInput.placeholder = "Add subtask";
        entryDiv.appendChild(taskInput);

        let addButton = document.createElement("button");
        addButton.addEventListener("click", () => { createSubTask(taskInput, taskItems)});
        addButton.setAttribute("data-btn-add", "");
        addButton.innerHTML = "+";
        entryDiv.appendChild(addButton);

        section.appendChild(entryDiv);

        let saveButton = document.createElement("button");
        saveButton.addEventListener("click", () => {
            this.save(container, titleInput);
        });
        saveButton.setAttribute("data-close-button", "");
        saveButton.classList.add("btn-save");
        saveButton.setAttribute("id", "update-task");
        saveButton.innerText = "Save";
        footer.appendChild(saveButton);

        body.appendChild(hgroup);
        body.appendChild(section);
        body.appendChild(footer);

        popup.appendChild(header);
        popup.appendChild(body);
        container.appendChild(popup);

    }

    static openTaskModal(container, id)
    {
        const data = Storage.getItem(Key.TODO, id);

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
        titleInput.value = data.title;

        titleDiv.appendChild(titleSpan);
        titleDiv.appendChild(titleInput);
        header.appendChild(titleDiv);

        let closeButton = document.createElement("button");
        closeButton.setAttribute("data-close-button", "");
        closeButton.classList.add("btn-close");
        closeButton.innerHTML = "&times";
        closeButton.addEventListener("click", () => {this.close(container)});
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

        let statusLabel = document.createElement("label");
        statusLabel.setAttribute("for", "status");
        statusLabel.innerHTML = "Status: ";
        hgroup.appendChild(statusLabel);

        let contSpan = document.createElement("span");

        let statSelection = document.createElement("select");
        statSelection.name = "list-type";

        let not_done = document.createElement("option");
        not_done.value = "Not done";
        not_done.innerText = "Not done";
        statSelection.appendChild(not_done);

        let doing = document.createElement("option");
        doing.value = "Doing";
        doing.innerText = "Doing";
        statSelection.appendChild(doing);

        let done = document.createElement("option");
        done.value = "Done";
        done.innerText = "Done";
        statSelection.appendChild(done);

        contSpan.appendChild(statSelection);
        hgroup.appendChild(contSpan);

        let taskItems = document.createElement("ul");
        taskItems.classList.add("task-items");
        section.appendChild(taskItems);

        const entries = data.entries;
        entries.forEach(entry => {

            let li = document.createElement("li");

            li.addEventListener("click", () => {
                li.classList.toggle("checked");
            });
            
            li.classList.add("item");
            li.innerText = entry.task;
            let delSpan = document.createElement("span");

            delSpan.addEventListener("click", () => {
                const listEntry = delSpan.closest(".item");
                taskItems.removeChild(listEntry);
            });

            delSpan.innerHTML = "&times;"
            li.appendChild(delSpan);
            taskItems.appendChild(li);

        });

        let entryDiv = document.createElement("div");
        entryDiv.classList.add("add-entry");

        let taskInput = document.createElement("input");
        taskInput.setAttribute("type", "text");
        taskInput.setAttribute("id", "data-entry");
        taskInput.placeholder = "Add subtask";
        entryDiv.appendChild(taskInput);

        let addButton = document.createElement("button");
        addButton.addEventListener("click", () => { createSubTask(taskInput, taskItems)});
        addButton.setAttribute("data-btn-add", "");
        addButton.innerHTML = "+";
        entryDiv.appendChild(addButton);

        section.appendChild(entryDiv);

        let deleteButton = document.createElement("button");
        deleteButton.addEventListener("click", () => {
            this.delete(container, id);
        });

        deleteButton.setAttribute("data-close-button", "");
        deleteButton.classList.add("btn-delete");
        deleteButton.setAttribute("id", "delete-task");
        deleteButton.innerText = "Delete";
        footer.appendChild(deleteButton);

        let saveButton = document.createElement("button");
        saveButton.addEventListener("click", () => {
            this.update(container, titleInput, id);
        });

        saveButton.setAttribute("data-close-button", "");
        saveButton.classList.add("btn-save");
        saveButton.setAttribute("id", "update-task");
        saveButton.innerText = "Save";
        footer.appendChild(saveButton);

        body.appendChild(hgroup);
        body.appendChild(section);
        body.appendChild(footer);

        popup.appendChild(header);
        popup.appendChild(body);
        container.appendChild(popup);
    }
}

function createSubTask(input, taskItems)
{
    
    if(input.value === "")
    {
        alert("Please write something");
        return;
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
}