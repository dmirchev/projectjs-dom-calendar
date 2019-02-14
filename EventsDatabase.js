var eventDatabese = [];
var currentID = 0;
var currentDatabaseYear = 0;
var currentDatabaseMonth = 0;
var currentDatabaseDay = 0;

var displayedEvents = [];

var nullEvent;

var EventDabase =
{
    "initEventDatave" : function()
    {
        //var counter = 0;
        
        var _null = '{"events":[' 
        + '{"year":"", "month":"", "day":"", "message":""}]}';
        nullEvent = JSON.parse(_null);

        events = '{"events":[' +
        '{"id":0, "year":2019, "month":1, "day":19, "message":"Hello"},' +
        '{"id":1, "year":2019, "month":1, "day":21, "message":"Op"},' +
        '{"id":2, "year":2019, "month":1, "day":5, "message":"Eha"}]}';
        currentID = 2;
        eventDatabese = JSON.parse(events);
        console.log(eventDatabese.events[0].month);
    },

    "initDisplayEvents" : function()
    {
        displayedEvents = [];
    },

    "getCurrentEvents" : function(year, month)
    {
        currentDatabaseYear = year;
        currentDatabaseMonth = month;

        this.createNullEvent(year, month);
        
        for(var i = 0; i < eventDatabese.events.length; i++)
        {
            if(eventDatabese.events[i].year == year 
            && eventDatabese.events[i].month == month)
                displayedEvents.push(eventDatabese.events[i]);
        }
    },

    "getEvent" : function(day)
    {
        if(displayedEvents.length == 0)
            return nullEvent.events[0];
        
        for(var i = 0; i < displayedEvents.length; i++)
        {
            if(displayedEvents[i].day == day)
            {
                return displayedEvents[i];
            }
        }

        return nullEvent.events[0];
    },

    "getEventID" : function(day)
    {
        for(var i = 0; i < eventDatabese.events.length; i++)
        {
            if(eventDatabese.events[i].day == day)
            {
                return i;
            }
        }
    },

    "createNullEvent" : function(year, month)
    {
        _null = '{"events":[' 
        + '{"year":"' + year + '", "month":"' + month + '", "day":"", "message":""}]}';
        nullEvent = JSON.parse(_null);
    },

    "createElent" : function()
    {

    }
}

var EventViewer =
{
    "parent" : null,
    "day" : 0,
    "message"  : "",
    "messageInput" : null,
    "actionButton" : null,

    "createEventViewer" : function()
    {
        var parentID = "event-viewer";

        this.parent = DOM.createElementByTag("div", parentID, "div-calendar-holder");

        this.day = DOM.createElementToExistingElement("h1", "event-name", 
        parentID + "-info", parentID);

        this.message = DOM.createElementToExistingElement("h2", "event-message", 
        parentID + "-info", parentID);

        this.messageInput = DOM.createElementToExistingElement("input", "event-message", 
        parentID + "-input", parentID); 

        this.actionButton = DOM.createElementToExistingElement("button", "event-action", 
        parentID + "-info", parentID);

        //DOM.createInnerHTML(heading, "Caak");
        console.log("btn id: " + this.actionButton.id);

        this.actionButton.addEventListener('click', function(e)
        {
            Action(e.target.id);
        });

        return this.parent;
    },
    
    "setEventViewer" : function(cell)
    {
        console.log(cell.eventInfo);
        currentDatabaseDay = cell.day;

        if(cell.eventInfo.day == "")
        {
            DOM.createInnerHTML(this.day, cell.day);
            DOM.createInnerHTML(this.message, "");
            this.messageInput.value = "";

            this.actionButton.id = "button-event-action-create";
            DOM.createInnerHTML(this.actionButton, "Create Event");
        }
        else
        {
            DOM.createInnerHTML(this.day, cell.eventInfo.day);
            DOM.createInnerHTML(this.message, cell.eventInfo.message);
            this.messageInput.value = cell.eventInfo.message;

            this.actionButton.id = "button-event-action-save";
            DOM.createInnerHTML(this.actionButton, "Save Event");
        }
    }
}

function Action(id)
{
    if(id == "button-event-action-create")
    {
        currentID++;

        console.log(EventViewer.messageInput.value);

        var newEvent = EventBase(currentID, 
            currentDatabaseYear, currentDatabaseMonth, 
            currentDatabaseDay, EventViewer.messageInput.value);

        console.log(newEvent);
        
        eventDatabese['events'].push(newEvent);

        console.log(eventDatabese['events']);
    }
    else
    {
        eventID = EventDabase.getEventID(currentDatabaseDay);

        eventDatabese.events[eventID].message = EventViewer.messageInput.value;

    }

    SetMonthNameDynamic(currentDatabaseMonth);
}