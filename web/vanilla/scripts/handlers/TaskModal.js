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

    static save(element)
    {
        Model.saveTask();
        this.close(element);
    }

    static update(element)
    {

    }

    static delete(element)
    {
        Model.deleteTask();
        this.close(element);
    }

    static addEntry()
    {

    }
}