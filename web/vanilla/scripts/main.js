import { registerEvents } from "./client/registry.js";
import Components from "./client/components.js";
import { runDebug } from "./debug.js";

console.log("Main.js running");

//runDebug();

registerEvents();
Components.createApplicationComponents();


