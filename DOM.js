var tags = ["div", "span", "table"];

var DOM = 
{
    "getElementByID" : function(id)
    {
        return document.getElementById(id);
    },

    "getAllElements" : function()
    {
        var allElements = [];
        
        //Get All Elements by TAG
        for(var i = 0; i < tags.length; i++)
        {
            //Get Collection with all Elements with this TAG
            var elements = document.getElementsByTagName(tags[i]);

            if(elements != null && elements.length != 0)
            {
                //Loop Through the Collection of Elements with the Same TAG
                for(var j = 0; j < elements.length; j++)
                {
                    //Add each element separately
                    allElements.push(elements[j]);
                }
            } 
        }

        return allElements;
    },

    "createElementByTag": function(tag, id)
    {
        var element = document.createElement(tag);
        element.id = id;

        var parentElement = document.getElementById("calendar-holder");
        parentElement.appendChild(element);

        return element;
    },

    // setType = true - id / false - Class
    "createElementToExistingElement" : function(tag, id, className, parentID = null)
    {
        var allElements = this.getAllElements();

        //Get Element ID from User
        var elementID = 0;
        //var tag = "div";
        console.log(parentID);
        console.log("id - " + id);

        var newElement = this.createElementByTag(tag);
        console.log(newElement);

        if(parentID != null)
        {
            if(id != null)
                newElement.id = tag + "-" + id;
            //else
                newElement.className = className;
            
            console.log(newElement.id);

            /* if(tag == "td")
            {
                var text = document.createTextNode(idCallback);
                newElement.appendChild(text);
            } */
        }

        //var selectedElement = allElements[elementID];
        var parentElement = document.getElementById(parentID);
        console.log(parentElement);
        parentElement.appendChild(newElement);

        return newElement;
    },

    "createInnerHTML" : function(element, text)
    {
        element.innerHTML = text;
    },

    //TODO
    "updateElementByID" : function()
    {
        var allElements = this.getAllElements();

        var elementID = 1;
        var element = allElements[elementID];

        this.updateGenericAttributes(element);


    },

    //TODO
    "updateGenericAttributes" : function(element)
    {
        //TODO Data

        var elementID = prompt("ID");
        var elementClass = prompt("Class");
        //var elementData = prompt("Data");
        var elementName = prompt("Name");

        element.id = elementID;
        element.class = elementClass;
        //element.data = elementData;
        element.name = elementName;
    },

    "deleteElementByID" : function()
    {
        var allElements = this.getAllElements();

        var elementID = 1;
        var element = allElements[elementID];

        element.parentNode.removeChild(element);
    }
}