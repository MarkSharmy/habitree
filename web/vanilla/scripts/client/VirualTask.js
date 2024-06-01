import Status from "../enum/status.js";
import Time from "../utils/Time.js";
import TaskAPI from "../api/storage.js";

export default class VirtualTask
{
    constructor(id, title, type, subtask)
    {
        this.id = id;
        this.title = title;
        this.type = type;
        this.status = Status.NOT_DONE;
        this.output = new Time(0, 0, 0);
        this.date = "";
        this.time = "";
        this.subtask = subtask;
    }

    static getTask(data)
    {
        return new VirtualTask(
            data.id,
            data.title,
            data.type,
            data.subtask
        );
    }

    setContent(content)
    {
        this.content = content;
    }

    setStatus(status)
    {
        this.status = status;
    }

    setOutput(hours, minutes, seconds)
    {
        this.output = new Time(hours, minutes, seconds);
    }

    setSchedule(date, time)
    {
        this.date = date;
        this.time = time;
    }

    synchronize()
    {
        const key = this.type;
        let id = null;
        let index = null;

        let entries = TaskAPI.getItems(key);

        if(this.subtask)
        {
            let dat = this.id.split("-");
            id = parseInt(dat[0]);
            index = parseInt(dat[1]);
            let task = entries.find( entry => { return entry.id == id});
            task.entries[index].status = this.status;
            TaskAPI.updateItem(key, task);
        }
        else
        {
            id = this.id;
            let task = entries.find( entry => { return entry.id == id});
            task.status = this.status;
            TaskAPI.updateItem(key, task);
        }
    }
    
}