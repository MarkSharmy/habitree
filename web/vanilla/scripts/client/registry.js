import { registerHandlers } from "./handlers.js"
import { registerComponents } from "./components.js";
import { registerEventHandlers } from "./events.js";

export function registerEvents()
{
    registerHandlers();
    registerComponents();
    registerEventHandlers();
    
}
