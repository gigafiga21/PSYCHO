/**
 * Manages breaks between games
 * @constructor
 * @param {Element} parent - where to place DOM of the class
 */
function Breaker(parent)
{
    /**
     * Hides/unhides breaker container
     */
    this.toggle = function()
    {
        if (hidden)
        {
            DOM.container.removeCSS("breaker__container--hidden");
        }
        else
        {
            DOM.container.setCSS("breaker__container--hidden");
        }
        
        hidden = !hidden;
    }
    
    /**
     * Setts time for the break
     * @param {Number} time - amount of time for the break
     */
    this.setTime = function(time)
    {
        DOM.time.innerHTML = time + "s";
    }
    
    /**
     * @var {Object} DOM    - DOM tree of the class
     * @var {Bool}   hidden - flag for indicating visibility
     */
    var DOM =
        {
            container: null,
            text: null,
            time: null
        },
        hidden = true;
    
    DOM.container = parent.newChildElement("div", {classList: ["breaker__container", "breaker__container--hidden"]});
    DOM.text = DOM.container.newChildElement("span", {classList: "breaker__text"}, "Отдыхайте:");
    DOM.time = DOM.container.newChildElement("span", {classList: "breaker__time"});
}
