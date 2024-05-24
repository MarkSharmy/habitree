import Status from "../enum/status.js";

export default class VirualTask
{
    constructor(id, title, type, subtask)
    {
        this.id = id;
        this.title = title;
        this.type = type;
        this.status = Status.NOT_DONE;
        this.output = 0;
        this.date = "";
        this.time = "";
        this.subtask = subtask;
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
        this.output = {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    setSchedule(date, time)
    {
        this.date = date;
        this.time = time;
    }

    static parse(task, subtask)
    {
        let id = 0;

        if(subtask)
        {
            
        }
    }

    static synchronize(task)
    {
        
    }
}