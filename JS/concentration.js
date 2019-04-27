function Concentration(parent, time)
{
    function drawPoint()
    {
        DOM.point = DOM.field.newChildElement("div", {classList: "concentration__point"});
        DOM.point.style.left = Math.floor(Math.random(5, 565)) + "px";
        DOM.point.style.top = Math.floor(Math.random(5, 260)) + "px";
    }
    
    function generatePoint()
    {
        if (!DOM.point && !first)
        {
            return;
        }
        else if (DOM.point)
        {
            DOM.field.removeChild(DOM.point);
            DOM.point = null;
        }
        else if (first)
        {
            first = false;
        }
            
        timer = setTimeout(
            function()
            {
                timer = null;
                drawPoint();
            }, Math.floor(Math.random(0, time / 4)));
    }
    
    this.free = function()
    {
        if (timer != null)
        {
            clearTimeout(timer);
            document.body.removeEventListener("keyup", getCode);
        }
    }
    
    var getCode = (function(event)
    {
        if (event.which == 13 || event.keyCode == 13)
        {
            DOM.button.dispatchEvent(new Event("click"));
        }
    }).bind(this);
    
    var timer = null,
        first = true,
        DOM =
        {
            container: null,
            button: null,
            field: null,
            point: null
        };
    
    DOM.container = parent.newChildElement("div", {classList: "concentration__container"});
    DOM.field = DOM.container.newChildElement("div", {classList: "concentration__field"});
    generatePoint();
    DOM.button = DOM.container.newChildElement("div", {classList: "concentration__button"});
    DOM.button.innerText = "<Enter>";
    DOM.button.addEventListener("click", generatePoint.bind(this));
    document.body.addEventListener("keyup", getCode);
}