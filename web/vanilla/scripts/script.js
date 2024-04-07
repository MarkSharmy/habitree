const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach( item => {
    const li = item.parentElement;

    item.addEventListener("click", function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove("active");
        });

        li.classList.add("active");

    });
});

//Toggle Sidebar
const menubar = document.querySelector("#content header nav .bx.bx-menu");
console.log("here");
console.log(menubar);

const sidebar = document.getElementById("sidebar");
console.log(sidebar);
menubar.addEventListener("click", () => {
    sidebar.classList.toggle("hide");
});
