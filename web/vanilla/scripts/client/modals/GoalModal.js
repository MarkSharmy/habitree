import Utils from "../../utils/Utils.js";
import Status from "../../enum/status.js";
import Components from "../components.js";
import Key from "../../enum/keys.js";
import Storage from "../../api/storage.js";
import VirtualTask from "../VirualTask.js";
import AgendaModal from "./AgendaModal.js";

export default class 
{
    static close(element)
    {
        element.innerHTML = "";
        const overlay = document.getElementById("overlay");
        overlay.classList.remove("active");
        Components.refresh();
    }   
    
    static save(element, data)
    {
        Storage.insertItem(Key.GOAL, data);
        this.close(element);
    }

    static update(element, data)
    {
        Storage.updateItem(Key.GOAL, data)
        this.close(element);
    }

    static delete(element, id)
    {
        Storage.deleteItem(Key.GOAL, id)
        this.close(element);
    }

    static create(container)
    {
        const overlay = document.getElementById("overlay");
        overlay.classList.add("active");
        this.createGoalModal(container);
    }

    static open(container, id)
    {
        const overlay = document.getElementById("overlay");
        overlay.classList.add("active");
        this.openGoalModal(container, id);
    }

    static createGoalModal(container)
    {
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.classList.add("active");
        container.appendChild(popup);

        const header = document.createElement("header");
        popup.appendChild(header);

        let title_span = document.createElement("span");
        title_span.classList.add("title");
        header.appendChild(title_span);

        let entry_span = document.createElement("span");
        entry_span.classList.add("entry");
        entry_span.textContent = "Title: ";
        title_span.appendChild(entry_span);

        let title_input = document.createElement("input");
        title_input.placeholder = "Add title.";
        title_span.appendChild(title_input);

        let closeButton = document.createElement("button");
        closeButton.setAttribute("data-modal-close", "#modal");
        closeButton.classList.add("btn-close");
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", () => {this.close(container)});
        header.appendChild(closeButton);


        const body = document.createElement("article");
        body.classList.add("body");
        popup.appendChild(body);

        const hgroup = document.createElement("hgroup");
        body.appendChild(hgroup);

        let option_span = document.createElement("span");
        option_span.classList.add("text");
        hgroup.appendChild(option_span);

        let label = document.createElement("label");
        label.setAttribute("for", "list-type");
        label.textContent = "Type: ";
        option_span.appendChild(label);

        let selection = document.createElement("select");
        selection.name = "type";
        selection.id = "type";
        option_span.appendChild(selection);

        let read_option = document.createElement("option");
        read_option.value = "Read";
        read_option.textContent = "Read";
        selection.appendChild(read_option);

        let watch_option = document.createElement("option");
        watch_option.value = "Watch";
        watch_option.textContent = "Watch";
        selection.appendChild(watch_option);

        let note_option = document.createElement("option");
        note_option.value = "Note";
        note_option.textContent = "Note";
        selection.appendChild(note_option);

        let practice_option = document.createElement("option");
        practice_option.value = "Practice";
        practice_option.textContent = "Practice";
        selection.appendChild(practice_option);

        let pushButton = document.createElement("button");
        pushButton.classList.add("btn-add");
        pushButton.textContent = "Do Today";
        hgroup.appendChild(pushButton);
        pushButton.addEventListener("click", () => {

        });

        const section = document.createElement("section");
        body.appendChild(section);

        let milestones = document.createElement("ul");
        milestones.classList.add("milestones");
        section.appendChild(milestones);

        let entryDiv = document.createElement("div");
        entryDiv.classList.add("add-entry");
        section.appendChild(entryDiv);

        let taskInput = document.createElement("input");
        taskInput.setAttribute("type", "text");
        taskInput.placeholder = "Add subtask";
        entryDiv.appendChild(taskInput);

        let addButton = document.createElement("button");
        addButton.addEventListener("click", () => { createMilestone(taskInput, milestones)});
        addButton.setAttribute("data-btn-add", "");
        addButton.innerHTML = "+";
        entryDiv.appendChild(addButton);

        const footer = document.createElement("footer");
        body.appendChild(footer);

        let saveButton = document.createElement("button");
        saveButton.setAttribute("data-modal-close", "");
        saveButton.classList.add("btn-save");
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", () => {

            const listElements = [...milestones.children];

            let listValues = []

            for (let i = 0; i < listElements.length; i++)
            {
                let item = listElements[i];

                let entry = item.children[0];

                let status = Status.NOT_DONE;

                if (item.classList.contains("checked"))
                    status = Status.DONE;
                
                listValues.push({
                    index: i,
                    task: entry.innerText,
                    status: status,
                });
            }

            const data = {
                id: Utils.generateItemID(),
                title: title_input.value,
                type: selection.value,
                entries: listValues,
                progress: 0.0,
            }

            this.save(container, data);

        });

        footer.appendChild(saveButton);

        
    }

    static openGoalModal(container, id)
    {
        const data = Storage.getItem(Key.GOAL, id);

        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.classList.add("active");
        container.appendChild(popup);

        const header = document.createElement("header");
        popup.appendChild(header);

        let title_span = document.createElement("span");
        title_span.classList.add("title");
        header.appendChild(title_span);

        let entry_span = document.createElement("span");
        entry_span.classList.add("entry");
        entry_span.textContent = "Title: ";
        title_span.appendChild(entry_span);

        let title_input = document.createElement("input");
        title_input.value = data.title;
        title_span.appendChild(title_input);

        let closeButton = document.createElement("button");
        closeButton.setAttribute("data-modal-close", "#modal");
        closeButton.classList.add("btn-close");
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", () => {this.close(container)});
        header.appendChild(closeButton);


        const body = document.createElement("article");
        body.classList.add("body");
        popup.appendChild(body);

        const hgroup = document.createElement("hgroup");
        body.appendChild(hgroup);

        let option_span = document.createElement("span");
        option_span.classList.add("text");
        hgroup.appendChild(option_span);

        let label = document.createElement("label");
        label.setAttribute("for", "list-type");
        label.textContent = "Type: ";
        option_span.appendChild(label);

        let selection = document.createElement("select");
        selection.name = "type";
        selection.id = "type";
        selection.value = data.type;
        option_span.appendChild(selection);

        let read_option = document.createElement("option");
        read_option.value = "Read";
        read_option.textContent = "Read";
        selection.appendChild(read_option);

        let watch_option = document.createElement("option");
        watch_option.value = "Watch";
        watch_option.textContent = "Watch";
        selection.appendChild(watch_option);

        let note_option = document.createElement("option");
        note_option.value = "Note";
        note_option.textContent = "Note";
        selection.appendChild(note_option);

        let practice_option = document.createElement("option");
        practice_option.value = "Practice";
        practice_option.textContent = "Practice";
        selection.appendChild(practice_option);

        let pushButton = document.createElement("button");
        pushButton.classList.add("btn-add");
        pushButton.textContent = "Do Today";
        hgroup.appendChild(pushButton);
        pushButton.addEventListener("click", () => {

        });

        const section = document.createElement("section");
        body.appendChild(section);

        let milestones = document.createElement("ul");
        milestones.classList.add("milestones");
        section.appendChild(milestones);

        const entries = data.entries;
        entries.forEach(entry => {

            let li = document.createElement("li");
            li.classList.add("milestone");

            if (entry.status == Status.DONE)
                li.classList.add("checked");

            let span_entry = document.createElement("span");
            span_entry.classList.add("entry");
            span_entry.textContent = entry.task;
            span_entry.addEventListener("click", () => {
                li.classList.toggle("checked");
            });
            li.appendChild(span_entry);

            let button_delete = document.createElement("button");
            button_delete.classList.add("btn-delete");
            button_delete.textContent = "Delete";
            li.appendChild(button_delete);

            button_delete.addEventListener("click", () => {
                const listEntry = button_delete.closest(".milestone");
                milestones.removeChild(listEntry);
            });

            let button_push = document.createElement("button");
            button_push.classList.add("btn-push");
            button_push.textContent = "Push";
            li.appendChild(button_push);

            button_push.addEventListener("click", () => {
                let index = entries.indexOf(entry);
                let taskID = `${id}-${index}`;
                const virtualTask = new VirtualTask(
                    taskID,
                    title_input.value,
                    Key.GOAL,
                    true
                );

                virtualTask.setContent(span_entry.textContent);
                AgendaModal.createAgendaModal(container, virtualTask);
            });

            milestones.appendChild(li);

        });

        let entryDiv = document.createElement("div");
        entryDiv.classList.add("add-entry");
        section.appendChild(entryDiv);

        let taskInput = document.createElement("input");
        taskInput.setAttribute("type", "text");
        taskInput.placeholder = "Add subtask";
        entryDiv.appendChild(taskInput);

        let addButton = document.createElement("button");
        addButton.addEventListener("click", () => { createMilestone(taskInput, milestones)});
        addButton.setAttribute("data-btn-add", "");
        addButton.innerHTML = "+";
        entryDiv.appendChild(addButton);

        const footer = document.createElement("footer");
        body.appendChild(footer);

        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("data-modal-close", "");
        deleteButton.classList.add("btn-delete");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            this.delete(container);
        });

        footer.appendChild(deleteButton);

        let saveButton = document.createElement("button");
        saveButton.setAttribute("data-modal-close", "");
        saveButton.classList.add("btn-save");
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", () => {

            const listElements = [...milestones.children];

            let listValues = []

            for (let i = 0; i < listElements.length; i++)
            {
                let item = listElements[i];

                let entry = item.children[0];

                let status = Status.NOT_DONE;

                if (item.classList.contains("checked"))
                    status = Status.DONE;
                
                listValues.push({
                    index: i,
                    task: entry.innerText,
                    status: status,
                });
            }

            const data = {
                id: id,
                title: title_input.value,
                type: selection.value,
                entries: listValues,
                progress: 0.0,
            }

            this.update(container, data);

        });

        footer.appendChild(saveButton);

        
    }
}

function createMilestone(input, goalItems)
{
    if(input.value === "")
        {
            alert("Please write something");
            return;
        }
    
        let li = document.createElement("li");
        li.classList.add("item");
        let entry = document.createElement("span");
        entry.classList.add("entry");
        entry.textContent = input.value;
        li.appendChild(entry);

        goalItems.appendChild(li);
    
        li.addEventListener("click", () => {
            li.classList.toggle("checked");
        });
    
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn-delete");
        deleteButton.textContent = "delete";
        li.appendChild(deleteButton);
        input.value = "";
    
        deleteButton.addEventListener("click", () => {
            const listEntry = deleteButton.closest(".item");
            goalItems.removeChild(listEntry);
        });

}