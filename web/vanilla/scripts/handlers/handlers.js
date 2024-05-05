import Storage from "../api/storage.js";
import Key from "../enum/keys.js";
import Components from "../client/components.js";

function createTaskModal(element)
{
    Components.createTaskModal(element);
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
}

function createGoalModal(element)
{

}

function createProjectModal(element)
{

}

function createResolutionModal(element)
{

}

export const handleModals = function()
{

    const taskModalButtons = document.querySelectorAll("[data-modal-task]");
    const goalModalButtons = document.querySelectorAll("[data-modal-goal]");
    const projectModalButtons = document.querySelectorAll("[data-modal-project]");
    const reModalButtons = document.querySelectorAll("[data-modal-res]");
    
    const container = document.getElementById("modal");

    taskModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            createTaskModal(container);
        });
    });
}

export const menuToggle = function()
{
    document.body.addEventListener("click", e => {

        if (e.target.classList.contains("menu-item"))
        {
            const items = document.getElementsByClassName("menu-item")
            console.log(items);
            for(let i = 0; i < items.length; i++)
            {
                items[i].classList.remove("active");
            }

            e.target.classList.add("active");
        }
    });
}

export const labelsToggle = function()
{
    document.body.addEventListener("click", e => {
        
        if( e.target.classList.contains("tabs-label"))
        {
            const labels = document.getElementsByClassName("tabs-label")

            for(let i = 0; i < labels.length; i++)
            {
                labels[i].classList.remove("active");
            }

            e.target.classList.add("active");
        }
    });

}



