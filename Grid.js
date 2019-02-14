var table;
var eventViewer;

var gridElements = [];
var monthElements = [];
var weekElements = [];
var selectedMonth = null;
var selectedCell = null;
var weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var months =  ["January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];

var gridCounter = 0;

var currentYear = 2019;
var currentMonth = 1;

var previousYear;
var nextYear;

var previousMonth;// = document.getElementById("button-prev");
var nextMonth;// = document.getElementById("button-next");

var year;
var month;// = document.getElementById("span-month-name");

//-2: Today in Not in This Month and Year
//-1: Today is in This Month and Year
//>0: Today's Index for The gridElements has been SET
var todaysIndex = -2;
var todaysClassHolder = "";

function GetElementsFromHTML()
{
    previousYear = document.getElementById("button-prev-year");
    nextYear = document.getElementById("button-next-year");

    previousMonth = document.getElementById("button-prev-month");
    nextMonth = document.getElementById("button-next-month");

    year = document.getElementById("span-year");
    month = document.getElementById("span-month");

    previousYear.addEventListener('click', function()
    {
        currentYear--;
        
        SetMonthNameDynamic(currentMonth);
    });

    nextYear.addEventListener('click', function()
    {
        currentYear++;
        
        SetMonthNameDynamic(currentMonth);
    });

    previousMonth.addEventListener('click', function()
    {
        currentMonth--;

        if(currentMonth < 0)
        {
            currentMonth = 11;
            currentYear--;
        }
        
        SetMonthNameDynamic(currentMonth);
    });

    nextMonth.addEventListener('click', function()
    {
        currentMonth++;

        if(currentMonth > 11)
        {
            currentMonth = 0;
            currentYear++;
        }
        
        SetMonthNameDynamic(currentMonth);
    });
}

function SetLinkMonthEvent(div, element)
{
    div.addEventListener('click', function()
    {
        SetMonth(element);

        SetMonthNameDynamic(currentMonth);
    });
}

function SetMonth(element)
{
    if(selectedMonth)
        selectedMonth.className = selectedMonth.className.replace("-selected","");
    //monthElements[currentMonth].className = monthElements[currentMonth].className.replace("-selected","");

    //currentMonth = e.target.value
    currentMonth = element.value

    selectedMonth = element;
    selectedMonth.className = selectedMonth.className + "-selected";
}

function SetSelectedDayEvent(background, cell)
{
    background.addEventListener('click', function()
    {
        SelectDay(cell);
        EventViewer.setEventViewer(cell);
    });
}

function SelectDay(cell)
{
    if(selectedCell)
    {
        //selectedCell.element.className = selectedCell.defaultClass;
        selectedCell.element.className = selectedCell.element.className.replace("selected-","");
    }

    if(cell != selectedCell)
    {
        SwitchTableClass(true);

        selectedCell = cell;

        selectedCell.element.className = "selected-" + selectedCell.element.className;
    }
    else
    {
        selectedCell = null;
        SwitchTableClass(false);
    }
}

function GetFirstWeekDay()
{
    var date = new Date(currentYear, currentMonth, 1);
    return date.getDay();
}

function GetToday()
{
    var today = new Date();
    return today;
}

function IsLeapYear(year)
{
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function SetMonthNameDynamic(month)
{
    //When We Change Month/Year We remove the Selected Day
    //If we have Set it Before That
    if(selectedCell)
        SelectDay(selectedCell);

    SetMonth(monthElements[month]);
    
    year.innerHTML = currentYear;
    month.innerHTML = months[month];

    EventDabase.initDisplayEvents();
    EventDabase.getCurrentEvents(currentYear, month);

    SetDaysInCells(month);
}

function GetNextCounter()
{
    return ++gridCounter;
}

function GetWeekNumber(row)
{
    return row;
}

function GetWeekDays(index)
{
    return weekDays[index];
}

function GetMonth()
{
    return "jan";
}

function SetWeekRowName()
{
    
}

function GridHeader()
{
    var calendarHeader = "calendar-header";
    var calenderHeaderDate = "calender-header-date";
    var calendarHeaderMonth = "calender-header-month";
    var calendarHeaderButton = "calender-header-button";

    //Date DIV
    DOM.createElementToExistingElement("div", calenderHeaderDate, 
    "div-calender-header", calendarHeader);

    var year = DOM.createElementToExistingElement("span", "year",
    "div-date", "div-" + calenderHeaderDate);
    DOM.createInnerHTML(year, "0000");

    var month = DOM.createElementToExistingElement("span", "month", 
    "div-date", "div-" + calenderHeaderDate);
    DOM.createInnerHTML(month, "---");

    //Button DIV
    DOM.createElementToExistingElement("div", calendarHeaderButton, 
    "div-calender-header", calendarHeader);

    //Year BUTTON DIV
    DOM.createElementToExistingElement("div", "buttons-year", 
    "div-buttons", "div-" + calendarHeaderButton);

    var prevBTN = DOM.createElementToExistingElement("button", "prev-year", 
    "button", "div-buttons-year");
    DOM.createInnerHTML(prevBTN, "Previous Year");

    var nextBTN = DOM.createElementToExistingElement("button", "next-year",
    "button", "div-buttons-year");
    DOM.createInnerHTML(nextBTN, "Next Year");

    //Month BUTTON DIV
    DOM.createElementToExistingElement("div", "buttons-month", 
    "div-buttons", "div-" + calendarHeaderButton);

    var prevBTN = DOM.createElementToExistingElement("button", "prev-month", 
    "button", "div-buttons-month");
    DOM.createInnerHTML(prevBTN, "Previous Month");

    var nextBTN = DOM.createElementToExistingElement("button", "next-month",
    "button", "div-buttons-month");
    DOM.createInnerHTML(nextBTN, "Next Month");

    GetElementsFromHTML();
}

function GetMonthList()
{
    var calendarList = "calendar-list";
    var calenderMonthList = "calender-month-list";

    //List DIV
    DOM.createElementToExistingElement("div", calenderMonthList, 
    "div-calendar-list", calendarList);

    for(var i = 0; i < months.length; i++)
    {
        var element = DOM.createElementToExistingElement("div", "month-" + months[i], 
        "div-month", "div-" + calenderMonthList);
        
        var monthLink = DOM.createElementToExistingElement("a", "month-" + months[i],
        "month-link", "div-month-" + months[i]);
        //monthLink.href = '#'
        monthLink.value = i;

        DOM.createInnerHTML(monthLink, months[i]);

        monthElements.push(monthLink);

        SetLinkMonthEvent(element, monthLink);
    }

    /* var monthLink = DOM.createElementToExistingElement("a", "month-jan",
    "month-list", "div-" + calenderMonthList);
    monthLink.href = '#';
    DOM.createInnerHTML(monthLink, "jan"); */
}

function Grid(rows, columns)
{
    table = DOM.createElementByTag("table", "calendar-table", "div-calendar-holder"); // <table id="calendar-table" width="100%"></table>

    GridHeader();
    GetMonthList();

    DOM.createElementToExistingElement("tr", "weeks", 
    "weeks", "calendar-table");
    var weekRowID = "tr-weeks";

    for(var i = 0; i < 7; i++)
    {
        var element = DOM.createElementToExistingElement("td", GetWeekDays(i), "week", weekRowID);

        weekElements.push(new Cell(i, -1, element, GetWeekDays(i)));
    }

    PopulateGridHeader();

    for(var y = 0; y < columns; y++)
    {
        DOM.createElementToExistingElement("tr", GetWeekNumber(y), 
        "week", "calendar-table");

        for(var x = 0; x < rows; x++)
        {
            var conter = GetNextCounter();
            var dayClassName = "weekday";

            if(x > 4)
                dayClassName = "weekend";
            
            // var element = DOM.createElementToExistingElement("td", GetNextCounter(), 
            // dayClassName, "tr-" + y);

            var tableData = DOM.createElementToExistingElement("td", conter, 
            dayClassName + "-background", "tr-" + y);

            //tableData.style.zIndex = y + 1;

            var element = DOM.createElementToExistingElement("div", conter, 
            dayClassName, tableData.id);
            
            element.style.zIndex = y;

            var eventElement = new EventElement();
            eventElement.parentDiv = CrateParentDiv(element, conter)
            eventElement.dayHeading = CreateDayElements(eventElement.parentDiv, conter);
            eventElement.messageDiv = CreateMessageElements(eventElement.parentDiv, conter);

            gridElements.push(new Cell(x, y, element, dayClassName, eventElement));
            SetSelectedDayEvent(tableData, gridElements[gridElements.length - 1]);

            console.log(gridCounter);
        }
    }

    EventDabase.initEventDatave();
    eventViewer = EventViewer.createEventViewer();

    SetMonthNameDynamic(currentMonth);
}

function SetDaysInCells(month)
{
    if(month == 1)
    {
        PopulateGridWithDates(28);
        return;
    }

    if(month > 6)
        month++;
    
    if(month % 2 == 0)
    {
        PopulateGridWithDates(31);
    }
    else if(month % 2 == 1)
    {
        PopulateGridWithDates(30);
    }
}

function PopulateGridWithDates(days)
{
    //First Day of the Week is Sunday
    var date = new Date(currentYear, currentMonth, 1);
    var firstWeekDay = date.getDay();
    firstWeekDay--;

    if(days == 28 && IsLeapYear(date.getFullYear()))
        days++;

    var todayDate = GetToday();
    var checkForToday = false;
    //Check if today is visible
    var today = 0;
    if(todayDate.getFullYear() == currentYear && todayDate.getMonth() == currentMonth)
    {
        //Today is in This Month And Year
        checkForToday = true;
        todaysIndex = -1;
        today = todayDate.getDate();
    }

    console.log(checkForToday);

    for(var i = 0; i < gridElements.length; i++)
    {
        //Set Day Class
        //gridElements[i].element.style.display = 'block';
        gridElements[i].element.className = gridElements[i].defaultClass;

        if(checkForToday)
        {
            if(todaysIndex == -1)
            {
                if(today == ((i + 1) - firstWeekDay))
                {
                    todaysIndex = i;
                    //gridElements[i].element.style.backgroundColor = "#4183cc";
                    todaysClassHolder = gridElements[i].element.className;

                    if(gridElements[i].element.className == "weekday")
                        gridElements[i].element.className = "today-weekday";
                    else
                        gridElements[i].element.className = "today-weekend";
                }
            }
        }

        if(!checkForToday && todaysIndex == i)
        {
            console.log(todaysClassHolder);
            //gridElements[todaysIndex].element.style.backgroundColor = "#7ea3cc";
            gridElements[i].element.className = todaysClassHolder;
            todaysIndex = -2;
        }

        //Set Days in Event Element
        if(days + firstWeekDay > gridElements.length + i)
        {
            //gridElements[i].element.innerHTML = days - i;
            //gridElements[i].event.element.dayHeader.innerHTML = days - i;

            //Set Day
            gridElements[i].day = days - i;
            DOM.createInnerHTML(gridElements[i].eventElement.dayHeading, days - i);

            //St Message
            gridElements[i].eventInfo = EventDabase.getEvent(days - i);
            DOM.createMessage(gridElements[i].eventElement.messageDiv, gridElements[i].eventInfo.message);

            continue;
        }

        if(i >= firstWeekDay && i < days + firstWeekDay)
        {
            //gridElements[i].element.innerHTML =  (i + 1) - firstWeekDay;
            //gridElements[i].event.element.dayHeader.innerHTML = (i + 1) - firstWeekDay;
            console.log("element" + gridElements[i].eventElement);
            //Set Day
            gridElements[i].day = (i + 1) - firstWeekDay;
            DOM.createInnerHTML(gridElements[i].eventElement.dayHeading, (i + 1) - firstWeekDay);
            
            //Set Message
            gridElements[i].eventInfo = EventDabase.getEvent((i + 1) - firstWeekDay);
            DOM.createMessage(gridElements[i].eventElement.messageDiv, gridElements[i].eventInfo.message);

            continue;
        }
        
        if(firstWeekDay == -1 && i == gridElements.length - 1)
        {
            //gridElements[gridElements.length - 1].element.innerHTML = 1;
            //gridElements[i].event.element.dayHeader.innerHTML = 1;

            //Set DAy
            gridElements[i].day = 1;
            DOM.createInnerHTML(gridElements[i].eventElement.dayHeading, 1);

            gridElements[i].eventInfo = EventDabase.getEvent(1);
            DOM.createMessage(gridElements[i].eventElement.messageDiv, gridElements[i].eventInfo.message);

            continue;
        }

        gridElements[i].day = "";

        //gridElements[i].element.innerHTML = "";
        //gridElements[i].element.style.display = 'none';
        gridElements[i].element.className = "empty";
    }
}

function PopulateGridHeader()
{
    for(var i = 0; i < 7; i++)
    {
        weekElements[i].element.innerHTML = weekDays[i];
    }
}

function Cell(x, y, element, defaultClass, eventElement = null)
{
    this.x = x;
    this.y = y;

    this.element = element;

    this.defaultClass = defaultClass;
    this.eventElement = eventElement;
    this.eventInfo;

    this.day = "";
}

Cell.prototype.SetValue = function(value)
{
    this.day = value;
}

function SwitchTableClass(isSelected)
{
    console.log(isSelected);
    if(isSelected)
    {
        table.id = "calendar-table-selected";
        eventViewer.id = "event-viewer-selected";
    }
    else
    {
        table.id = "calendar-table";
        eventViewer.id = "event-viewer";
    }
}