import TaskModal from "../client/modals/TaskModal.js";
import Components from "../client/components.js";
import AgendaModal from "../client/modals/AgendaModal.js";

function createTaskModal(element)
{
    TaskModal.createTaskModal(element);
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
}

function createGoalModal(element)
{
    GoalModal.createTaskModal(element);
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
}

function createProjectModal(element)
{
    ProjectModal.createTaskModal(element);
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
}

function createResolutionModal(element)
{
    ResolutionModal.createTaskModal(element);
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
}

function openAgendaModal(element)
{
    AgendaModal.openModal(element);
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
}

function editItem(element)
{
    let nodes = Array.from(element.children);

    let index = nodes.indexOf(nodes.find( node => {
        return node.classList.contains("entry");
    }));

    AgendaModal.edit(element, nodes[index]);
}

export const handleModals = function()
{

    const taskModalButtons = document.querySelectorAll("[data-modal-task]");
    const goalModalButtons = document.querySelectorAll("[data-modal-goal]");
    const projectModalButtons = document.querySelectorAll("[data-modal-project]");
    const resModalButtons = document.querySelectorAll("[data-modal-res]");
    const agendaModalButtons = document.querySelectorAll("[data-modal-agenda]")

    const container = document.getElementById("modal");

    agendaModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            openAgendaModal(container);
        });
    });

    

    taskModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            createTaskModal(container);
        });
    });
}

export const handleItemEdits = function ()
{
    const editableItems = document.querySelectorAll("[data-item-edit]");
    const container = document.getElementById("modal");

    editableItems.forEach(item => {
        item.addEventListener("click", () => {
            editItem(item);
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



