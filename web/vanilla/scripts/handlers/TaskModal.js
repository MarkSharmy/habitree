import Components from "../client/components.js";
import Model from "../api/persistance.js"

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

    static addEntry()
    {

    }
}