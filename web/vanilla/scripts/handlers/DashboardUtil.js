import Status from "../enum/status.js";
import Storage from "../api/storage.js";

export default class
{
    static getCurrentAgenda()
    {
        const data = Storage.getAllItems();

        let tasks = data.filter(task => {
            return task.status == Status.DOING;
        });

        return tasks;
    }
}