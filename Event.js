/* function Event(day, month, year, event)
{
    this.day = day;
    this.month = month;
    this.year = year;

    this.event = event;
} */

function EventElement()
{
    this.parentDiv;
    this.dayHeading;
    this.messageDiv;

    this.event;
}

function EventBase(id, year, month, day, message)
{
    /* var json = {'id:"' + id + '", ' + 
    'year: "' + year + '", ' + 
    'month: "' + month + '", ' + 
    'day: "' + day + '", ' + 
    'message: "' + message + '"}; */

    var json = {"id":id,
                "year":year,
                "month":month,
                "day":day,
                "message":message};

    /* var json = {"teamId":"4","status":"pending"}; */

    console.log(json);

    return json;
}

/* function EventMessage(message)
{
    this.message = message;

    return this;
} */

function CrateParentDiv(divParent, id)
{
    id = "event-parent-" + id;

    return DOM.createElementToExistingElement("div", id, 
    "event-parent", divParent.id);
}

function CreateDayElements(divParent, id)
{
    id = "event-" + id;

    return DOM.createElementToExistingElement("h1", id, 
    "event-name", divParent.id);
}

function CreateMessageElements(divParent, id)
{
    id = "message-" + id;

    return DOM.createElementToExistingElement("div", id, 
    "event-message", divParent.id);
}

Event.prototype.SetElementValues = function()
{

}