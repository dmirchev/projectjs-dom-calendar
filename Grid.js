var gridElements = [];
var weekElements = [];
var weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var months =  ["January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];

var gridCounter = 0;

var currentYear = 2019;
var currentMonth = 1;

var previousMonth = document.getElementById("prev-btn");
var nextMonth = document.getElementById("next-btn");

var monthName = document.getElementById("month-name");

function GetFirstWeekDay()
{
    var date = new Date(currentYear, currentMonth, 1);
    return date.getDay();
}

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

function SetMonthNameDynamic(index)
{
    monthName.innerHTML = months[index] + " / " + currentYear;

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

function Grid(rows, columns)
{
    DOM.createElementByTag("table", "calendar-table"); // <table id="calendar-table" width="100%"></table>
    DOM.createElementToExistingElement("tr", GetMonth, "calendar-table");
    var weekRowID = "tr-" + GetMonth();

    for(var i = 0; i < 7; i++)
    {
        var element = DOM.createElementToExistingElement("td", function(){
            return GetWeekDays(i);
        }, weekRowID);

        weekElements.push(new Element(i, -1, element));
    }

    PopulateGridHeader();

    for(var y = 0; y < columns; y++)
    {
        DOM.createElementToExistingElement("tr", function(){
            return GetWeekNumber(y);
        }, "calendar-table");

        for(var x = 0; x < rows; x++)
        {
            var element = DOM.createElementToExistingElement("td", GetNextCounter, "tr-" + y);
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
    var firstWeekDay = GetFirstWeekDay();
    firstWeekDay--;
    console.log(weekDays[firstWeekDay]);
    console.log(days + firstWeekDay);

    for(var i = 0; i < gridElements.length; i++)
    {
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