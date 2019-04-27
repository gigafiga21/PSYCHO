/**
 * Container class for the test managing animation and switching games screens
 * @constructor
 * @param {Element} parent - wherde to place DOM of the class
 */
function Test(parent)
{
    /**
     * Center the current active screen
     * @type {Function}
     */
    var center = (function()
    {
        if (!isResizable)
        {
            return;
        }
        
        var element = DOM.container.rows[0].cells[active],
            cellCentered = (document.body.clientWidth - element.clientWidth) / 2,
            containerDelta = DOM.container.getBoundingClientRect().left - element.getBoundingClientRect().left;
        
        DOM.container.style.left = cellCentered - element.offsetLeft + "px";
    }).bind(this);
    
    /**
     * Covers inactive screen with transparent block to prevent activating inner screen elements
     * @param {*} index - index of screen to cover
     */
    this.deactivate = function(index)
    {
        index = Number(index);
        DOM.container.rows[0].cells[index].appendChild(DOM.inactive.cloneNode(true));
        DOM.container.rows[0].cells[index].setCSS("test__inactive");
    }
    
    /**
     * Removes coverage and makesw screen active
     * @param {*} index - index of screen to make active
     */
    this.activate = function(index)
    {
        active = Number(index);
        index = Number(index);
        center();
        DOM.container.rows[0].cells[index].removeCSS("test__inactive");
        
        var cover = DOM.container.rows[0].cells[index].getElementsByClassName("test__inactive_cover")[0];
        if (cover)
        {
            DOM.container.rows[0].cells[index].removeChild(cover);
        }
    }
    
    /**
     * Adds screen to the container
     * @param  {*}      index         - index of the screen
     * @param  {Bool}   isUnresizable - if false, it will be possible to resize screen while animation
     * @return {Element}              - container to place game/smth else
     */
    this.add = function(index, isUnresizable)
    {
        var cell = DOM.container.rows[0].insertCell(index);
        cell.setAttribute("index", index);
        cell.setCSS("test__cell");
        
        if (isUnresizable)
        {
            isResizable = false;
        }
        
        return cell;
    }
    
    /**
     * Removes all inserted screens
     */
    this.free = function()
    {
        active = 0;
        isResizable = true;
        DOM.container.style.left = null;
        DOM.container.rows[0].innerHTML = "";
    }
    
    /**
     * @var {Bool}   isResizable - is current screen resizable
     * @var {*}      active      - index of an active screen
     * @var {Object} DOM         - DOM tree of the class
     */
    var isResizable = true,
        active = 0,
        DOM =
        {
            container: null,
            inactive: null
        };
    
    DOM.container = parent.newChildElement("table", {classList: "test__container"}, document.newElement("tr"));
    DOM.container.setEventListeners({"resize": center});
    DOM.inactive = document.newElement("div", {classList: "test__inactive_cover"});
}
