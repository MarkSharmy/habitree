import Storage from "../api/storage.js";
import Key from "../enum/keys.js";

export function registerHandlers()
{
    document.addEventListener("DOMContentLoaded", () =>{
        handleModal();
        handleMenuToggle();
        handleLabelsToggle();

    });
}

function handleModal()
{

    const createModalButtons = document.querySelectorAll("[data-modal-create]");
    const openModalButtons = document.querySelectorAll("[data-modal-target]");
    const closeModalButtons = document.querySelectorAll("[data-close-button]");
    const overlay = document.getElementById("overlay");

    createModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = document.querySelector(button.dataset.modalCreate);
            createModal(modal);
        });
    });

    openModalButtons.forEach(element => {
        
        element.addEventListener("click", () => {

            const modal = document.querySelector(element.dataset.modalTarget);
            const data = Storage.getItem(Key.TODO, element.dataset.id);
            openModal(modal, data);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".popup");
            closeModal(modal);
        });
    });

    
}

function handleMenuToggle()
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

function createModal(modal)
{
    if (modal == null) return;

    modal.classList.add("active");
    overlay.classList.add("active");
};

function openModal(modal, data)
{
    if (modal == null) return;

    const title = document.getElementById("title")
    title.value = data.title;

    const taskItems = document.getElementById("task-items");

    let entries = data.entries;

    entries.forEach(entry => {

        let li = document.createElement("li");
        li.classList.add("item");
        li.setAttribute("data-list-item", "");
        li.innerText = entry.task;
        let span = document.createElement("span");
        span.innerHTML = "&times;";
        li.appendChild(span);
        taskItems.appendChild(li);

    });

    modal.classList.add("active");
    overlay.classList.add("active")
};


function closeModal(modal)
{
    if (modal == null) return;

    const taskList = document.getElementById("task-items");
    const entryTitle = document.getElementById("title");
    entryTitle.value = "";
    taskList.innerHTML = "";

    modal.classList.remove("active");
    overlay.classList.remove("active")
};

function handleLabelsToggle()
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

