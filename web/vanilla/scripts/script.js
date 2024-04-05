const sidebar = document.querySelectorAll("#sidebar .side-menu.top li a");


console.log(sidebar);

sidebar.forEach( item => {
    const li = item.parentElement;

    item.addEventListener("click", function () {
        sidebar.forEach(i => {
            i.parentElement.classList.remove("active");
        });

        li.classList.add("active");

    });
});