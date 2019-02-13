var gridElements = [];
var weekElements = [];
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

function SetLinkEvent(element)
{
    element.addEventListener('click', function(e)
    {
        currentMonth = e.target.value
        SetMonthNameDynamic(currentMonth);
    });
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

function SetMonthNameDynamic(index)
{
    year.innerHTML = currentYear;
    month.innerHTML = months[index];

    SetDates(index);
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
        var monthLink = DOM.createElementToExistingElement("a", "month-" + months[i],
        "month-list", "div-" + calenderMonthList);
        monthLink.href = '#'
        monthLink.value = i;
        DOM.createInnerHTML(monthLink, months[i]);

        SetLinkEvent(monthLink);
    }

    /* var monthLink = DOM.createElementToExistingElement("a", "month-jan",
    "month-list", "div-" + calenderMonthList);
    monthLink.href = '#';
    DOM.createInnerHTML(monthLink, "jan"); */
}

function Grid(rows, columns)
{
    DOM.createElementByTag("table", "calendar-table"); // <table id="calendar-table" width="100%"></table>

    GridHeader();
    GetMonthList();

    DOM.createElementToExistingElement("tr", "weeks", 
    "weeks", "calendar-table");
    var weekRowID = "tr-weeks";

    for(var i = 0; i < 7; i++)
    {
        var element = DOM.createElementToExistingElement("td", GetWeekDays(i), "week", weekRowID);

        weekElements.push(new Element(i, -1, element));
    }

    PopulateGridHeader();

    for(var y = 0; y < columns; y++)
    {
        DOM.createElementToExistingElement("tr", GetWeekNumber(y), 
        "week", "calendar-table");

        for(var x = 0; x < rows; x++)
        {
            var dayClassName = "weekday";

            if(x > 4)
                dayClassName = "weekend";
            
            var element = DOM.createElementToExistingElement("td", GetNextCounter(), 
            dayClassName, "tr-" + y);

            gridElements.push(new Element(x, y, element));

            console.log(gridCounter);
        }
    }

    SetMonthNameDynamic(currentMonth);
}

function SetDates(month)
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
        if(checkForToday)
        {
            if(todaysIndex == -1)
            {
                if(today == ((i + 1) - firstWeekDay))
                {
                    todaysIndex = i;
                    gridElements[i].element.style.backgroundColor = "#4183cc";
                }
            }
        }

        if(!checkForToday && todaysIndex > -1)
        {
            gridElements[todaysIndex].element.style.backgroundColor = "#7ea3cc";
            todaysIndex = -2;
        }

        if(days + firstWeekDay > gridElements.length + i)
        {
            gridElements[i].element.innerHTML = days - i;
            continue;
        }

        if(i >= firstWeekDay && i < days + firstWeekDay)
        {
            gridElements[i].element.innerHTML =  (i + 1) - firstWeekDay;
            continue;
        }
        
        if(firstWeekDay == -1 && i == gridElements.length - 1)
        {
            gridElements[gridElements.length - 1].element.innerHTML = 1;
            continue;
        }



        gridElements[i].element.innerHTML = "";
    }
}

function PopulateGridHeader()
{
    for(var i = 0; i < 7; i++)
    {
        weekElements[i].element.innerHTML = weekDays[i];
    }
}

function Element(x, y, element)
{
    this.x = x;
    this.y = y;

    this.element = element;

    this.value = "";
}

Element.prototype.SetValue = function(value)
{
    this.value = value;
}