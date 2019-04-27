/**
 * Game based on pressing button after the dot appears on the screen
 * @constructor
 * @param {Element} parent - where to place DOM of the class
 * @param {Number}  time   - maximum amount of seconds between pressing button and displaying the dot again
 */
function Concentration(parent, time)
{
    /**
     * Draws dot on the random coords at the game field
     */
    function drawPoint()
    {
        DOM.point = DOM.field.newChildElement("div", {classList: "concentration__point"});
        DOM.point.style.left = Math.floor(Math.random(5, 565)) + "px";
        DOM.point.style.top = Math.floor(Math.random(5, 260)) + "px";
    }
    
    /**
     * Removes previously drawed dot and setts timeout for drawing next one randomly
     */
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
    
    /**
     * Removes processing timeout for dot drawing
     * Calls when class instance was destroyed by removing game from screen
     */
    this.free = function()
    {
        if (timer != null)
        {
            clearTimeout(timer);
            document.body.removeEventListener("keyup", getCode);
        }
    }
    
    /**
     * Processes button click when 'Enter' is pressed
     * @type {Function}
     */
    var getCode = (function(event)
    {
        if (event.which == 13 || event.keyCode == 13)
        {
            DOM.button.dispatchEvent(new Event("click"));
        }
    }).bind(this);
    
    /**
     * @var {Number} timer - id of the processing dot drawing timer
     * @var {Bool}   first - flag for avoiding removing unexisting dot when regenerating it first time
     * @var {Object} DOM   - DOM tree of the class
     */
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
