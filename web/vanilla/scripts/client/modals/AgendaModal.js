import Components from "../components.js";
import Model from "../../api/persistance.js"
import Key from "../../enum/keys.js";
import Storage from "../../api/storage.js";
import { handleItemEdits } from "../../handlers/handlers.js";

export default class 
{
    static edit(element, entry)
    {
        const input = document.createElement("input");
        
         // Set the input value to the text content of the text element
        input.value = entry.textContent;
        
        // Replace the text element with the input element
        entry.parentNode.replaceChild(input, entry);
        
        // Automatically focus on the input element
        input.focus();
        
        // Add a blur event listener to the input element
        input.addEventListener('blur', function() {
            // Replace the input element with the updated text element
            input.parentNode.replaceChild(entry, input);
        });
    }

    static close(element)
    {
        element.innerHTML = "";
        const overlay = document.getElementById("overlay");
        overlay.classList.remove("active");
        Components.refresh();
    }

    static update(element)
    {

    }

    static delete(element)
    {

    }

    static openModal(container)
    {
        console.log("container:", container)
        const popup = document.createElement("div");
        popup.classList.add("popup");

        const header = document.createElement("header");
        popup.appendChild(header);

        let titleDiv = document.createElement("div");
        titleDiv.classList.add("title");

        let iconSpan = document.createElement("span");
        iconSpan.classList.add("icon");
        iconSpan.textContent = "GOAL";
        titleDiv.appendChild(iconSpan);

        let textSpan = document.createElement("span");
        textSpan.classList.add("text");
        textSpan.textContent = "Read Book: Flutter for Beginners";
        titleDiv.appendChild(textSpan);

        header.appendChild(titleDiv);

        let closeButton = document.createElement("button");
        closeButton.addEventListener("click", () => {
            this.close(container);
        });
        closeButton.classList.add("btn-close");
        closeButton.innerHTML = "&times;";
        header.appendChild(closeButton);

        const body = document.createElement("article");
        body.classList.add("body");

        let items = document.createElement("ul");
        items.classList.add("items");
        body.appendChild(items);

        let taskItem = document.createElement("li");
        taskItem.setAttribute("data-item-edit", "");
        
        let span_title_a = document.createElement("span");
        span_title_a.classList.add("title");
        span_title_a.textContent = "Task - ";
        taskItem.appendChild(span_title_a);

        let span_entry_a = document.createElement("span");
        span_entry_a.classList.add("entry");
        span_entry_a.textContent = "Read Book";
        taskItem.appendChild(span_entry_a);

        let icon_a = document.createElement("i");
        icon_a.classList.add("bx", "bxs-edit-alt");
        taskItem.appendChild(icon_a)

        let scheduleItem = document.createElement("li");
        scheduleItem.setAttribute("data-item-edit", "");

        let span_title_b = document.createElement("span");
        span_title_b.classList.add("title");
        span_title_b.textContent = "Schedule - ";
        scheduleItem.appendChild(span_title_b);

        let span_entry_b = document.createElement("span");
        span_entry_b.classList.add("entry");
        span_entry_b.textContent = "12:00";
        scheduleItem.appendChild(span_entry_b);

        let icon_b = document.createElement("i");
        icon_b.classList.add("bx", "bxs-edit-alt");
        scheduleItem.appendChild(icon_b);

        let progressItem = document.createElement("li");
        progressItem.setAttribute("data-item-edit", "")

        let span_title_c = document.createElement("span");
        span_title_c.classList.add("title");
        span_title_c.textContent = "Progress - ";
        progressItem.appendChild(span_title_c);

        let span_entry_c = document.createElement("span");
        span_entry_c.classList.add("entry");
        span_entry_c.textContent = "DOING";
        progressItem.appendChild(span_entry_c);

        let icon_c = document.createElement("i");
        icon_c.classList.add("bx", "bxs-edit-alt");
        progressItem.appendChild(icon_c);


        let timeItem = document.createElement("li");
        timeItem.setAttribute("data-item-edit", "");

        let span_title_d = document.createElement("span");
        span_title_d.classList.add("title");
        span_title_d.textContent = "Time Complete - ";
        timeItem.appendChild(span_title_d);

        let span_entry_d = document.createElement("span");
        span_entry_d.classList.add("entry");
        span_entry_d.textContent = "00:56;47";
        timeItem.appendChild(span_entry_d);

        let icon_d = document.createElement("i");
        icon_d.classList.add("bx", "bxs-edit-alt");
        timeItem.appendChild(icon_d);

        items.appendChild(taskItem);
        items.appendChild(scheduleItem);
        items.appendChild(progressItem);
        items.appendChild(timeItem);

        const footer = document.createElement("footer");
        body.appendChild(footer);

        let shelveButton = document.createElement("button");
        shelveButton.textContent = "shelve";
        shelveButton.id = "shelve";
        shelveButton.classList.add("btn-shelve");
        shelveButton.setAttribute("data-close-button", "");
        footer.appendChild(shelveButton);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.id = "delete";
        deleteButton.classList.add("btn-delete");
        deleteButton.setAttribute("data-close-button", "");
        footer.appendChild(deleteButton);


        popup.appendChild(body);
        popup.classList.add("active");
        container.appendChild(popup);
        handleItemEdits();
    }

}