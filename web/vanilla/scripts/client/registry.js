export function registerEvents()
{
    registerMenuToggle();
    registerLabelsToggle();
}

function registerMenuToggle()
{
    document.addEventListener("DOMContentLoaded", () => {
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
    });
}

function registerLabelsToggle()
{
    document.addEventListener("DOMContentLoaded", () =>{
        
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
    });
}