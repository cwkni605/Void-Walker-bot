//this function sees if the check box is true or false then selects all of the options to match the check box
function selectAll() {
    if (document.getElementById("serverAll").checked) {
        for(var i = 0; i < document.querySelectorAll(".server").length; i++)
        {
            const temp = document.querySelectorAll(".server")[i];
            temp.checked = true;
        }
    }
    if (document.getElementById("serverAll").checked === false) {
        for(var i = 0; i < document.querySelectorAll(".server").length; i++)
        {
            const temp = document.querySelectorAll(".server")[i];
            temp.checked = false;
        }
    }
}

/* run selectAll() function when thebutton is pushed */
if (document.getElementById("serverAll").addEventListener)
{
    document.getElementById("serverAll").addEventListener("click", selectAll, false);
}
else if (document.getElementById("serverAll").attachEvent)
{
    document.getElementById("serverAll").attachEvent("onclick", selectAll);
}