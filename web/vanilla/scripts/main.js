import EventBus from "./client/events.js";
import { handleModals } from "./handlers/handlers.js";
import { labelsToggle } from "./handlers/handlers.js";
import { menuToggle } from "./handlers/handlers.js";


const eventbus = EventBus.getEventBus();

eventbus.subsribeEvent(handleModals);
eventbus.subsribeEvent(menuToggle);
eventbus.subsribeEvent(labelsToggle);


document.addEventListener("DOMContentLoaded", () => {
    eventbus.registerEvents();
});


