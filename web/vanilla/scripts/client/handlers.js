import Storage from "../api/storage.js";
import Key from "../enum/keys.js";
import Components from "./components.js";

export function registerHandlers()
{
    document.addEventListener("DOMContentLoaded", () =>{
        handleModals();
        handleMenuToggle();
        handleLabelsToggle();

    });
}

function createModal(element)
{
    Components.createTaskModal(element);
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
}

function handleModals()
{

    const createModalButtons = document.querySelectorAll("[data-modal-create]");
    const openModalButtons = document.querySelectorAll("[data-modal-target]");
    const closeModalButtons = document.querySelectorAll("[data-close-button]");
    

    createModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const container = document.getElementById("modal");
            createModal(container);
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

