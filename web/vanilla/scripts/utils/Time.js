export default class Time 
{
    constructor(hours, minutes, seconds)
    {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }   

    toString()
    {
        return `${this.pad(this.hours)}:${this.pad(this.minutes)}:${this.pad(this.seconds)}`;
    }

    add(otherTime)
    {
        let totalSeconds = this.getTotalSeconds() + otherTime.getTotalSeconds();
        return Time.fromTotalSeconds(totalSeconds);
    }

    subtract(otherTime)
    {
        let totalSeconds = this.getTotalSeconds() - otherTime.getTotalSeconds();
        return Time.fromTotalSeconds(totalSeconds);
    }

    getTotalSeconds()
    {
        return (this.hours * 3600) + (this.minutes * 60) + this.seconds;
    }

    static fromTotalSeconds(totalSeconds)
    {
        let hours = Math.floor(totalSeconds / 3600);

        let minutes = Math.floor((totalSeconds % 3600) / 60);

        let seconds = totalSeconds % 60;

        return new Time(hours, minutes, seconds);
    }

    pad(number)
    {
        return String(number).padStart(2, "0");
    }
}