import Calendar from "./client/Calendar.js";
import EventBus from "./client/events.js";
import { handleModals } from "./handlers/handlers.js";
import { labelsToggle } from "./handlers/handlers.js";
import { menuToggle } from "./handlers/handlers.js";
import { handleItemEdits } from "./handlers/handlers.js";
import Mockito from "./test/mocktest.js";

const eventbus = EventBus.getEventBus();

eventbus.subscribeEvent(handleModals);
eventbus.subscribeEvent(menuToggle);
eventbus.subscribeEvent(labelsToggle);
eventbus.subscribeEvent(handleItemEdits);


document.addEventListener("DOMContentLoaded", () => {
    eventbus.registerEvents();
});

let date = Calendar.getCurrentDate();
let agenda = Calendar.getAgenda(date);
console.log("Agenda:", agenda);



//Mockito.mockUpdate(39986, Key.TODO);


