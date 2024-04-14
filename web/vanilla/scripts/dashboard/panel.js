window.onload = init;

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

function init()
{
    setCurrentDate();
}


function setCurrentDate()
{
    let currentDate = new Date();

    let dateIndex = currentDate.getDate();
    let date = 0;

    if (dateIndex === 1)
        date = dateIndex + "st";
    else if (dateIndex === 2)
        date = dateIndex + "nd"
    else if (dateIndex === 3)
        date = dateIndex + "rd"
    else
        date = dateIndex + "th"

    let monthIndex = currentDate.getMonth();
    let month = 0;

    switch(monthIndex)
    {
        case 0: month = "January";
        break;
        case 1: month = "February";
        break;
        case 2: month = "March";
        break;
        case 3: month = "April";
        break;
        case 4: month = "May";
        break;
        case 5: month = "June";
        break;
        case 6: month = "July";
        break;
        case 7: month = "August";
        break;
        case 8: month = "September";
        break;
        case 9: month = "October";
        break;
        case 10: month = "November";
        break;
        case 11: month = "December";
        break;
    }

    let dayTitle = document.getElementById("currentDate");
    dayTitle.innerHTML = `Today - ${date} of ${month}`;
}