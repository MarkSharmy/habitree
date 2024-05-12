import Components from "../components.js";
import Model from "../../api/persistance.js"
import Key from "../../enum/keys.js";
import Storage from "../../api/storage.js";

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
        closeButton.innerHTML = "&times;";
        header.appendChild(closeButton);

        const body = document.createElement("article");
        body.classList.add("body");

        let items = document.createElement("ul");
        items.classList.add("items");
        body.appendChild(items);

        let taskItem = document.createElement("li");
        taskItem.setAttribute("data-item-edit", "");
        
        let span_title = document.createElement("span");
        span_title.classList.add("title");
        span_title.textContent = "Task -";
        taskItem.appendChild(span_title);

        let span_entry_a = document.createElement("span");
        span_entry_a.classList.add("entry");
        span_entry_a.textContent = "Read Chapter 5";
        taskItem.appendChild(span_entry_a);

        let icon_a = document.createElement("i");
        icon_a.classList.add("bx", "bxs-edit-alt");
        taskItem.appendChild(icon_a)

        let scheduleItem = document.createElement("li");
        scheduleItem.setAttribute("data-item-edit", "");

        let span_entry_b = document.createElement("span");
        span_entry_b.classList.add("entry");
        span_entry_b.textContent = "Read Chapter 5";
        scheduleItem.appendChild(span_entry_b);

        let icon_b = document.createElement("i");
        icon_a.classList.add("bx", "bxs-edit-alt");
        scheduleItem.appendChild(icon_b);

        let progressItem = document.createElement("li");
        progressItem.setAttribute("data-item-edit", "")
        let timeItem = document.createElement("li");
        timeItem.setAttribute("data-item-edit", "")

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
    }

}