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
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".popup");
            closeModal(modal);
        });
    });

    const createModal = (modal) => {
        if (modal == null) return;

        modal.classList.add("active");
        overlay.classList.add("active");
    };

    const openModal = (modal) => {
        if (modal == null) return;

        

        title = document.getElementById("title");

        modal.classList.add("active");
        overlay.classList.add("active")
    };


    const closeModal = (modal) => {
        if (modal == null) return;

        modal.classList.remove("active");
        overlay.classList.remove("active")
    };
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