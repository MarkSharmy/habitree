import { registerHandlers } from "./handlers.js"
import { registerPersistanceHandlers } from "../api/persistance.js";

export function registerEvents()
{
    registerHandlers();
    registerPersistanceHandlers();
}
