import Components from "../components.js";
import Calendar from "../Calendar.js";
import { handleItemEdits } from "../../handlers/handlers.js";
import Status from "../../enum/status.js";
import VirtualTask from "../VirualTask.js";
import TaskAPI from "../../api/storage.js";

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

    static open(container, id)
    {
        const overlay = document.getElementById("overlay");
        overlay.classList.add("active");
        this.openAgendaModal(container, id);
    }

    static createAgendaModal(container, task)
    {
        container.innerHTML = "";

        let content = task.title;

        if(task.subtask)
        {
            content = task.content;
        }

        const popup = document.createElement("div");
        popup.classList.add("popup");

        const header = document.createElement("header");
        popup.appendChild(header);

        let titleDiv = document.createElement("div");
        titleDiv.classList.add("title");

        let iconSpan = document.createElement("span");
        iconSpan.classList.add("icon");
        iconSpan.textContent = task.type.toUpperCase();
        titleDiv.appendChild(iconSpan);

        let textSpan = document.createElement("span");
        textSpan.classList.add("text");
        textSpan.textContent = task.title;
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
        
        //Task Info
        let span_title_a = document.createElement("span");
        span_title_a.classList.add("title");
        span_title_a.textContent = "Task - ";
        taskItem.appendChild(span_title_a);

        let span_entry_a = document.createElement("span");
        span_entry_a.classList.add("entry");
        span_entry_a.textContent = content;
        taskItem.appendChild(span_entry_a);
        ///////////////////////////////////

        //Schedule info
        let scheduleItem = document.createElement("li");

        let date_span = document.createElement("div");
        scheduleItem.appendChild(date_span);

        let date_entry = document.createElement("span");
        date_entry.classList.add("entry");
        date_span.appendChild(date_entry);

        let date_label = document.createElement("label");
        date_label.classList.add("title");
        date_label.textContent = "Date - ";
        date_entry.appendChild(date_label);

        let date_input = document.createElement("input");
        date_input.setAttribute("type", "date");
        date_input.classList.add("schedule");
        date_input.value = Calendar.getCurrentDate();
        date_entry.appendChild(date_input);

        let time_span = document.createElement("div");
        scheduleItem.appendChild(time_span);

        let time_entry = document.createElement("span");
        time_entry.classList.add("entry");
        time_span.appendChild(time_entry);

        let time_label = document.createElement("label");
        time_label.classList.add("title");
        time_label.textContent = "Time - ";
        time_entry.appendChild(time_label);

        let time_input = document.createElement("input");
        time_input.setAttribute("type", "time");
        time_input.classList.add("schedule");
        time_entry.appendChild(time_input);
        ///////////////////////////////////////

        //Status info
        let progressItem = document.createElement("li");

        let span_title_c = document.createElement("span");
        span_title_c.classList.add("title");
        span_title_c.textContent = "Progress - ";
        progressItem.appendChild(span_title_c);

        let span_entry_c = document.createElement("span");
        span_entry_c.classList.add("entry");

        let selection = document.createElement("select");
        selection.name = "status";
        selection.id = "status";
        span_entry_c.appendChild(selection);

        let option_a = document.createElement("option");
        option_a.value = `${Status.NOT_DONE}`;
        option_a.textContent = "Not Done";
        selection.appendChild(option_a);

        let option_b = document.createElement("option");
        option_b.value = `${Status.DOING}`;
        option_b.textContent = "Doing";
        selection.appendChild(option_b);

        let option_c = document.createElement("option");
        option_c.value = `${Status.DONE}`;
        option_c.textContent = "Done";
        selection.appendChild(option_c);

        progressItem.appendChild(span_entry_c);
        ///////////////////////////////////////

        //Output info 
        let timeItem = document.createElement("li");

        let span_title_d = document.createElement("span");
        span_title_d.classList.add("title");
        span_title_d.textContent = "Output - ";
        timeItem.appendChild(span_title_d);

        let span_entry_d = document.createElement("span");
        span_entry_d.classList.add("entry");
        timeItem.appendChild(span_entry_d);

        let hh_label = document.createElement("label");
        hh_label.textContent = "HH";
        span_entry_d.appendChild(hh_label);

        let hh_input = document.createElement("input");
        hh_input.classList.add("time");
        hh_input.setAttribute("type", "number");
        hh_input.setAttribute("min", "0");
        span_entry_d.appendChild(hh_input);

        let mm_label = document.createElement("label");
        mm_label.textContent = "MM";
        span_entry_d.appendChild(mm_label);

        let mm_input = document.createElement("input");
        mm_input.classList.add("time");
        mm_input.setAttribute("type", "number");
        mm_input.setAttribute("min", "0");
        mm_input.setAttribute("max", "60");
        span_entry_d.appendChild(mm_input);

        let ss_label = document.createElement("label");
        ss_label.textContent = "SS";
        span_entry_d.appendChild(ss_label);

        let ss_input = document.createElement("input");
        ss_input.classList.add("time");
        ss_input.setAttribute("type", "number");
        ss_input.setAttribute("min", "0");
        ss_input.setAttribute("max", "60");
        span_entry_d.appendChild(ss_input);
        ///////////////////////////////////

        //Append children
        items.appendChild(taskItem);
        items.appendChild(scheduleItem);
        items.appendChild(progressItem);
        items.appendChild(timeItem);

        const footer = document.createElement("footer");
        body.appendChild(footer);

        let pushButton = document.createElement("button");
        pushButton.textContent = "Schedule";
        pushButton.id = "push";
        pushButton.classList.add("btn-push");
        pushButton.setAttribute("data-close-button", "");
        footer.appendChild(pushButton);

        

        pushButton.addEventListener("click", () => {

            let hours = hh_input.value ? hh_input.value : 0;
            let minutes = mm_input.value ? mm_input.value : 0;
            let seconds = ss_input.value ? ss_input.value : 0;

            task.setContent(content);
            task.setSchedule(date_input.value, time_input.value);
            task.setStatus(parseInt(selection.value));
            task.setOutput(hours, minutes, seconds);
            
            const calendar = Calendar.getAgenda(Calendar.getCurrentDate());
            calendar.push(task);
            this.close(container);
        });

        popup.appendChild(body);
        popup.classList.add("active");
        container.appendChild(popup);
        handleItemEdits();
    }

    static openAgendaModal(container, id)
    {
        container.innerHTML = "";
        const data = Calendar.getAgenda(Calendar.getCurrentDate()).getTask(id);
        
        let content = data.title;

        if(data.subtask)
        {
            content = data.content;
        }

        const popup = document.createElement("div");
        popup.classList.add("popup");

        const header = document.createElement("header");
        popup.appendChild(header);

        let titleDiv = document.createElement("div");
        titleDiv.classList.add("title");

        let iconSpan = document.createElement("span");
        iconSpan.classList.add("icon");
        iconSpan.textContent = data.type.toUpperCase();
        titleDiv.appendChild(iconSpan);

        let textSpan = document.createElement("span");
        textSpan.classList.add("text");
        textSpan.textContent = data.title;
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
        
        //Task Info
        let span_title_a = document.createElement("span");
        span_title_a.classList.add("title");
        span_title_a.textContent = "Task - ";
        taskItem.appendChild(span_title_a);

        let span_entry_a = document.createElement("span");
        span_entry_a.classList.add("entry");
        span_entry_a.textContent = content;
        taskItem.appendChild(span_entry_a);
        ///////////////////////////////////

        //Schedule info
        let scheduleItem = document.createElement("li");

        let date_span = document.createElement("div");
        scheduleItem.appendChild(date_span);

        let date_entry = document.createElement("span");
        date_entry.classList.add("entry");
        date_span.appendChild(date_entry);

        let date_label = document.createElement("label");
        date_label.classList.add("title");
        date_label.textContent = "Date - ";
        date_entry.appendChild(date_label);

        let date_info = document.createElement("span");
        date_info.setAttribute("type", "date");
        date_info.classList.add("schedule");
        date_info.textContent = data.date;
        date_entry.appendChild(date_info);

        let time_span = document.createElement("div");
        scheduleItem.appendChild(time_span);

        let time_entry = document.createElement("span");
        time_entry.classList.add("entry");
        time_span.appendChild(time_entry);

        let time_label = document.createElement("label");
        time_label.classList.add("title");
        time_label.textContent = "Time - ";
        time_entry.appendChild(time_label);

        let time_info = document.createElement("span");
        time_info.setAttribute("type", "time");
        time_info.classList.add("schedule");
        time_info.textContent = data.time;
        time_info.addEventListener("click", () => { makeEditable(time_info)});
        time_entry.appendChild(time_info);
        ///////////////////////////////////////

        //Status info
        let progressItem = document.createElement("li");

        let span_title_c = document.createElement("span");
        span_title_c.classList.add("title");
        span_title_c.textContent = "Progress - ";
        progressItem.appendChild(span_title_c);

        let span_entry_c = document.createElement("span");
        span_entry_c.classList.add("entry");

        let selection = document.createElement("select");
        selection.name = "status";
        selection.id = "status";
        span_entry_c.appendChild(selection);

        let option_a = document.createElement("option");
        option_a.value = `${Status.NOT_DONE}`;
        option_a.textContent = "Not Done";
        selection.appendChild(option_a);

        let option_b = document.createElement("option");
        option_b.value = `${Status.DOING}`;
        option_b.textContent = "Doing";
        selection.appendChild(option_b);

        let option_c = document.createElement("option");
        option_c.value = `${Status.DONE}`;
        option_c.textContent = "Done";
        selection.appendChild(option_c);

        if(data.status == Status.DONE)
            selection.value = `${Status.DONE}`

        progressItem.appendChild(span_entry_c);
        ///////////////////////////////////////

        //Output info 
        let timeItem = document.createElement("li");

        let span_title_d = document.createElement("span");
        span_title_d.classList.add("title");
        span_title_d.textContent = "Output - ";
        timeItem.appendChild(span_title_d);

        let span_entry_d = document.createElement("span");
        span_entry_d.classList.add("entry");
        timeItem.appendChild(span_entry_d);

        let hh_input = document.createElement("input");
        hh_input.classList.add("time");
        hh_input.setAttribute("type", "number");
        hh_input.setAttribute("min", "0");

        let mm_input = document.createElement("input");
        mm_input.classList.add("time");
        mm_input.setAttribute("type", "number");
        mm_input.setAttribute("min", "0");
        mm_input.setAttribute("max", "60");

        let ss_input = document.createElement("input");
        ss_input.classList.add("time");
        ss_input.setAttribute("type", "number");
        ss_input.setAttribute("min", "0");
        ss_input.setAttribute("max", "60");

        if(data.status == Status.DONE)
        {
            let hours = data.output.hours;
            let minutes = data.output.minutes;
            let seconds = data.output.seconds;

            if(parseInt(hours) < 10)
                hours = "0"+hours

            if(parseInt(minutes) < 10)
                minutes = "0"+minutes

            if(parseInt(seconds) < 10)
                seconds = "0"+seconds

            span_entry_d.textContent = `${hours}:${minutes}:${seconds}`;
        }
        else
        {
            let hh_label = document.createElement("label");
            hh_label.textContent = "HH";
            span_entry_d.appendChild(hh_label);
            
            span_entry_d.appendChild(hh_input);

            let mm_label = document.createElement("label");
            mm_label.textContent = "MM";
            span_entry_d.appendChild(mm_label);

            span_entry_d.appendChild(mm_input);

            let ss_label = document.createElement("label");
            ss_label.textContent = "SS";
            span_entry_d.appendChild(ss_label);
            
            span_entry_d.appendChild(ss_input);
        }
        ///////////////////////////////////

        //Append children
        items.appendChild(taskItem);
        items.appendChild(scheduleItem);
        items.appendChild(progressItem);
        items.appendChild(timeItem);

        const footer = document.createElement("footer");
        body.appendChild(footer);

        let shelveButton = document.createElement("button");
        shelveButton.textContent = "Shelve";
        shelveButton.classList.add("btn-shelve");
        footer.appendChild(shelveButton);

        shelveButton.addEventListener("click", () => {
            VirtualTask.shelve(id);
            this.close(container);
        });

        let doneButton = document.createElement("button");
        doneButton.textContent = "Done";
        doneButton.classList.add("btn-save");
        footer.appendChild(doneButton);

        doneButton.addEventListener("click", () => {

            if(selection.value != Status.DONE)
            {
                Calendar.getAgenda(Calendar.getCurrentDate()).update(data);
            }
            else
            {
                let task = VirtualTask.getTask(data);
            
                task.setStatus(parseInt(selection.value));

                let hours = hh_input.value ? hh_input.value : 0;
                let minutes = mm_input.value ? mm_input.value : 0;
                let seconds = ss_input.value ? ss_input.value : 0;

                task.setOutput(hours, minutes, seconds);
                task.synchronize();
                Calendar.getAgenda(Calendar.getCurrentDate()).update(task);
            }

            this.close(container);

        });

        popup.appendChild(body);
        popup.classList.add("active");
        container.appendChild(popup);
    }

}

function makeEditable(element) {
    let originalText = element.textContent;
    let input = document.createElement('input');
    input.setAttribute("type", "time");
    input.value = originalText;
  
    // Replace the text with an input element
    element.replaceWith(input);
  
    // Add event listeners to handle the change and blur events
    input.addEventListener('change', () => {
      // Create a new text element with the updated value
      let newText = document.createElement('span');
      newText.textContent = input.value;
  
      // Replace the input element with the new text element
      input.replaceWith(newText);
  
      // Restore the makeEditable function on the new text element
      newText.addEventListener('click', () => makeEditable(newText));
    });
  
    input.addEventListener('blur', () => {
      // If the input is empty, revert to the original text
      if (input.value.trim() === '') {
        input.replaceWith(originalText);
      }
    });
  }