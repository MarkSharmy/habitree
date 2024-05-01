export function registerEvents()
{
    registerLabelsToggle();
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