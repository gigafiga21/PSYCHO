function Breaker(parent)
{
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
    
    this.setTime = function(time)
    {
        DOM.time.innerHTML = time + "s";
    }
    
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