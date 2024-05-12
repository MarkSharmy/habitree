import EventBus from "./client/events.js";
import Key from "./enum/keys.js";
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

//Mockito.mockUpdate(39986, Key.TODO);


