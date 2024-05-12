import Status from "../enum/status.js"
import TaskAPI from "../api/storage.js"

export default class Mockito
{
    static mockUpdate(id, key)
    {
        const data = {
            id: id,
            title: "Buy Groceries",
            entries: [],
            status: Status.DOING,
            time: "",
        }

        TaskAPI.updateItem(key, data);
    }
}