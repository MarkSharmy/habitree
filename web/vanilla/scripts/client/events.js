export default class EventBus
{
    eventbus = null;
    subscribedEvents = [];

    static getEventBus()
    {
        if (!this.eventbus)
            this.eventbus = new EventBus();

        return this.eventbus;
    }

    subsribeEvent(event)
    {
        this.subscribedEvents.push(event);
    }

    registerEvents()
    {
        this.subscribedEvents.forEach(event => {
            event();
        });
    }
}

