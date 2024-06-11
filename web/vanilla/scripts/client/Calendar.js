import Key from "../enum/keys.js";
import Status from "../enum/status.js";
import Time from "../utils/Time.js";

export default class Calendar
{
    constructor(obj)
    {
        if(typeof obj === "string")
        {
            this.date = obj;
            this.efficiency = 0.0;
            this.output = new Time(0, 0, 0);
            this.tasks = [];
            this.progress = 0.0;
        }
        else
        {
            this.date = obj.date;
            this.efficiency = obj.efficiency;
            this.output = new Time(obj.output.hours, obj.output.minutes, obj.output.seconds);
            this.tasks = obj.tasks;
            this.tasks.forEach(task => {
                task.output = new Time(task.output.hours, task.output.minutes, task.output.seconds);
            });

            this.progress = obj.progress;
        }
    }

    getTask(id)
    {
        let task = this.tasks.find( task => {
            return task.id == id;
        });

        return task;
    }

    push(task)
    {
        this.tasks.push(task);
        this.refresh();
    }

    remove(id)
    {
        const task = this.tasks.find(task => { return task.id == id});
        this.tasks.splice(this.tasks.indexOf(task), 1);
        this.refresh();
    }

    update(task)
    {
        const agenda = this.tasks;
        let found = this.tasks.find(entry => { return entry.id == task.id});
        agenda[this.tasks.indexOf(found)] = task;
        this.refresh();
    }

    refresh()
    {
        Calendar.replaceAgenda(this);
        let completedItems = this.tasks.filter( task => { return task.status == Status.DONE});
        this.progress = Math.floor((completedItems.length / this.tasks.length));
        this.aggregateOutput(completedItems);
    }

    aggregateOutput(entries)
    {
        let time = new Time(0, 0, 0);

        entries.forEach(entry => {
            time = time.add(entry.output);
        });

        this.output = time;
    }

    static today()
    {
        const date = new Date();
        return `${getDay(date.getDay())}, ${date.getDate()} ${getMonth(date.getMonth())} ${date.getFullYear()}`;
    }

    static getCurrentDate()
    {
        const date = new Date().toISOString().split("T").shift();
        return date;
    }

    static getAgenda(date)
    {
        const calendar = getCalendar();

        let agenda = calendar.find( agenda => {return agenda.date == date});

        if(!agenda)
        {
            agenda = new Calendar(date);
            calendar.push(agenda);
            saveCalendar(calendar);
        }

        agenda = new Calendar(agenda);
        
        agenda.sort();

        agenda.refresh();

        return agenda;
    }

    sort()
    {
        
        this.tasks.sort((a, b) => {
            // Convert the time strings to Date objects

            const dateA = new Date(`${a.date}T${a.time}:00`);
            const dateB = new Date(`${b.date}T${b.time}:00`);

            return dateB - dateA;

        });

      }

    static replaceAgenda(agenda)
    {
        //Get the calendar array with agendas
        const calendar = getCalendar();

        //Replace agenda of the same date with the new agenda
        let found = calendar.find(entry => {return entry.date == agenda.date});
        calendar[calendar.indexOf(found)] = agenda;

        //Save new calendar to local storage
        saveCalendar(calendar);
    }
}

function getCalendar()
{
    let calendar = [];

    const data = localStorage.getItem(Key.CALENDAR);

    if(!data)
    {
        const agenda = new Calendar(Calendar.getCurrentDate());
        calendar.push(agenda);
        saveCalendar(calendar);
    }
    else {
        calendar = JSON.parse(data);
    }

    return calendar;
}

function saveCalendar(calendar)
{
    const data = JSON.stringify(calendar);
    localStorage.setItem(Key.CALENDAR, data);
}

function getDay(dayIndex)
{
    switch(dayIndex)
    {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
    }

    throw Error("Invalid date index");
}

function getMonth(monthIndex)
{
    switch(monthIndex)
    {
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
    }

    throw Error("Invalid month index");
}

