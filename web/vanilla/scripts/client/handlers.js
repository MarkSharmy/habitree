export function toggleActive(element)
{
    labels = document.getElementsByClassName("tabs-label");

    for (let i = 0; i < labels.length; i++)
    {
        label = labels[i]

        if (label.classList.contains("active"))
        {
            label.classList.remove("active");
        }
    }
    
    element.classList.toggle("active");
}