import Components from "../components.js";
import Key from "../../enum/keys.js";
import Storage from "../../api/storage.js";
import VirtualTask from "../VirualTask.js";
import AgendaModal from "./AgendaModal.js";
import TaskAPI from "../../api/storage.js";
import Utils from "../../utils/Utils.js";

export default class
{
    static close(element)
    {
        element.innerHTML = "";
        const overlay = document.getElementById("overlay");
        overlay.classList.remove("active");
        Components.refresh();
    }


    static delete(element, id)
    {
        TaskAPI.deleteItem(Key.TODO, id);
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


        let saveButton = document.createElement("button");
        saveButton.setAttribute("data-close-button", "");
        saveButton.classList.add("btn-save");
        saveButton.setAttribute("id", "update-task");
        saveButton.innerText = "Save";

        saveButton.addEventListener("click", () => {
            
            const data = {

                id: Utils.generateItemID(),
                title: titleInput.value,
                status: statSelection.value
            }

            Storage.insertItem(Key.TODO, data);
            this.close(container);

        }); 

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

        let pushButton = document.createElement("button");
        pushButton.classList.add("btn-add");
        pushButton.textContent = "Do Today";
        hgroup.appendChild(pushButton);

        pushButton.addEventListener("click", () => {

            if( titleInput.value == "")
            {
                alert("Please enter a title");
                return;
            }

            const virtualTask = new VirtualTask(
                id, 
                titleInput.value,
                Key.TODO,
                false
            );

            AgendaModal.createAgendaModal(container, virtualTask);

        });


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
            
            const data = {

                id: id,
                title: titleInput.value,
                status: statSelection.value
            }

            Storage.updateItem(Key.TODO, data);
            this.close(container);

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
