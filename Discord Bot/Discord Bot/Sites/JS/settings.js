//this function sees if the check box is true or false then enables or disables the shutdown button accordingly
function enableSHUT()
{
    if (document.getElementById("confirmSHUT").checked)
    {
        document.getElementById("TheSHUT").disabled = false;
    }
    if (document.getElementById("confirmSHUT").checked === false)
    {
        document.getElementById("TheSHUT").disabled = true;
    }
}

//this function sees if the check box is true or false then selects all of the options to match the check box
function tempSelectAll()
{
    if (document.getElementById("tempSelectAll").checked)
    {
        for(var i = 0; i < document.querySelectorAll("#tempOption").length; i++)
        {
            const temp = document.querySelectorAll("#tempOption")[i];
            temp.checked = true;
        }
    }
    if (document.getElementById("tempSelectAll").checked === false)
    {
        for(var i = 0; i < document.querySelectorAll("#tempOption").length; i++)
        {
            const temp = document.querySelectorAll("#tempOption")[i];
            temp.checked = false;
        }
    }
}

//this function sees if the check box is true or false then selects all of the options to match the check box
function banSelectAll()
{
    if (document.getElementById("banSelectAll").checked)
    {
        for(var i = 0; i < document.querySelectorAll("#banOption").length; i++)
        {
            const temp = document.querySelectorAll("#banOption")[i];
            temp.checked = true;
        }
    }
    if (document.getElementById("banSelectAll").checked === false)
    {
        for(var i = 0; i < document.querySelectorAll("#banOption").length; i++)
        {
            const temp = document.querySelectorAll("#banOption")[i];
            temp.checked = false;
        }
    }
}

//this function sees if the check box is true or false then selects all of the options to match the check box
function serverSelectAll()
{
    if (document.getElementById("serverSelectAll").checked)
    {
        for(var i = 0; i < document.querySelectorAll("#serverOption").length; i++)
        {
            const temp = document.querySelectorAll("#serverOption")[i];
            temp.checked = true;
        }
    }
    if (document.getElementById("serverSelectAll").checked === false)
    {
        for(var i = 0; i < document.querySelectorAll("#serverOption").length; i++)
        {
            const temp = document.querySelectorAll("#serverOption")[i];
            temp.checked = false;
        }
    }
}

//this function sees if the check box is true or false then selects all of the options to match the check box
function logSelectAll()
{
    if (document.getElementById("logSelectAll").checked)
    {
        for(var i = 0; i < document.querySelectorAll("#logOption").length; i++)
        {
            const temp = document.querySelectorAll("#logOption")[i];
            temp.checked = true;
        }
    }
    if (document.getElementById("logSelectAll").checked === false)
    {
        for(var i = 0; i < document.querySelectorAll("#logOption").length; i++)
        {
            const temp = document.querySelectorAll("#logOption")[i];
            temp.checked = false;
        }
    }
}

/* run enableSHUT() function when the corrisponding button is pressed */
if (document.getElementById("confirmSHUT").addEventListener)
{
    document.getElementById("confirmSHUT").addEventListener("click", enableSHUT, false);
}
else if (document.getElementById("confirmSHUT").attachEvent)
{
    document.getElementById("confirmSHUT").attachEvent("onclick", enableSHUT);
}

/* run tempSelectAll() function when the corrisponding button is pressed */
if (document.getElementById("tempSelectAll").addEventListener)
{
    document.getElementById("tempSelectAll").addEventListener("click", tempSelectAll, false);
}
else if (document.getElementById("tempSelectAll").attachEvent)
{
    document.getElementById("tempSelectAll").attachEvent("onclick", tempSelectAll);
}

/* run banSelectAll() function when the corrisponding button is pressed */
if (document.getElementById("banSelectAll").addEventListener)
{
    document.getElementById("banSelectAll").addEventListener("click", banSelectAll, false);
}
else if (document.getElementById("banSelectAll").attachEvent)
{
    document.getElementById("banSelectAll").attachEvent("onclick", banSelectAll);
}

/* run serverSelectAll() function when the corrisponding button is pressed */
if (document.getElementById("serverSelectAll").addEventListener)
{
    document.getElementById("serverSelectAll").addEventListener("click", serverSelectAll, false);
}
else if (document.getElementById("serverSelectAll").attachEvent)
{
    document.getElementById("serverSelectAll").attachEvent("onclick", serverSelectAll);
}

/* run logSelectAll() function when the corrisponding button is pressed */
if (document.getElementById("logSelectAll").addEventListener)
{
    document.getElementById("logSelectAll").addEventListener("click", logSelectAll, false);
}
else if (document.getElementById("logSelectAll").attachEvent)
{
    document.getElementById("logSelectAll").attachEvent("onclick", logSelectAll);
}