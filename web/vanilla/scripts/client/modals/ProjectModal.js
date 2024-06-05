import Components from "../components.js";
import Utils from "../../utils/Utils.js";
import TaskAPI from "../../api/storage.js";
import Key from "../../enum/keys.js";

export default class
{
    static close(element)
    {
        element.innerHTML = "";
        const overlay = document.getElementById("overlay");
        overlay.classList.remove("active");
        Components.refresh();
    }

    static open(element)
    {
        const overlay = document.getElementById("overlay");
        overlay.classList.add("active");
        this.openModal(element);
    }

    static openModal(container)
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

        let text_entry = document.createElement("span");
        text_entry.classList.add("text");
        text_entry.textContent = "Project Name:";
        title_span.appendChild(text_entry);

        let title_input = document.createElement("input");
        title_input.placeholder = "Add project pame";
        title_span.appendChild(title_input);

        let closeButton = document.createElement("button");
        closeButton.classList.add("btn-close");
        closeButton.innerHTML = "&times;";
        closeButton.setAttribute("data-modal-close", "");

        closeButton.addEventListener("click", () => {
            this.close(container);
        });

        header.appendChild(closeButton);

        const body = document.createElement("article");
        body.classList.add("body");
        popup.appendChild(body);

        const section = document.createElement("section");
        body.appendChild(section);

        let desc_div = document.createElement("div");
        section.appendChild(desc_div);

        let desc_label = document.createElement("label");
        desc_label.setAttribute("for", "desc");
        desc_label.textContent = "Description:";
        desc_div.appendChild(desc_label);

        let textarea = document.createElement("textarea");
        textarea.name = "desc";
        textarea.id = "desc";
        textarea.rows = "8";
        textarea.cols = "40";
        desc_div.appendChild(textarea);


        let date_div = document.createElement("div");
        section.appendChild(date_div);

        let date_label = document.createElement("label");
        date_label.setAttribute("for", "date");
        date_label.textContent = "Date Created:";
        date_div.appendChild(date_label);

        let date_input = document.createElement("input");
        date_input.setAttribute("type", "date");
        date_input.setAttribute("id", "date");
        date_input.setAttribute("name", "date");
        date_div.appendChild(date_input);

        const footer = document.createElement("footer");
        body.appendChild(footer);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn-delete");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-modal-close", "");
        footer.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
            this.close(container);
        });

        let saveButton = document.createElement("button");
        saveButton.classList.add("btn-save");
        saveButton.textContent = "Save";
        saveButton.setAttribute("data-modal-close", "");
        footer.appendChild(saveButton);

        saveButton.addEventListener("click", () => {
            if(title_input.value === "")
            {
                alert("Please enter project name!")
                return;
            }

            else if(textarea.value === "")
            {
                alert("Please enter project description!");
                return;
            }

            else if(date_input.value === "")
            {
                alert("Please enter date created!");
                return;
            }
                
            const project = {

                id: Utils.generateItemID(),
                name: title_input.value,
                description: textarea.value,
                date: date_input.value,
                progress: 0,
                columns: [
                    {
                        id: 0,
                        title: "Backlog",
                        entries: []
                    },
                    {
                        id: 1,
                        title: "Design",
                        entries: []
                    },
                    {
                        id: 2,
                        title: "Todo",
                        entries: []
                    },
                    {
                        id: 3,
                        title: "Doing",
                        entries: []
                    },
                    {
                        id: 4,
                        title: "Done",
                        entries: []
                    }
                ]
            };

            TaskAPI.insertItem(Key.PROJECT, project);
            this.close(container);
        });
    }
}