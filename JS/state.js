function State(parent, tests)
{
    function generateStartScreen()
    {
        var menu = frame.add(0);
        menu.newChildElement("button",
            {
                classList: ["state__button", "state__start"],
                eventListeners: {"click": next.bind(this)}
            }, "Начать тестирование");
    }
    
    var next = (function()
    {
        current++;
        frame.free();
        DOM.current.innerHTML = "#" + tests[current].name;
        DOM.next.disabled = true;
        
        tests[current].run(frame, this);
    }).bind(this);
    
    this.continue = function()
    {
        if (current == tests.length - 1)
        {
            DOM.next.innerHTML = "Ещё раз";
            current = -1;
        }
        
        DOM.next.disabled = false
    }
    
    var DOM =
        {
            container: null,
            current: null,
            next: null,
            frame: null
        };
    
    var current = -1,
        frame = new Test(document.body);
    
    tests.splice(0, 0, {name: "0", run: generateStartScreen.bind(this)});
    
    DOM.container = parent.newChildElement("div", {classList: "state__container"});
    DOM.current = DOM.container.newChildElement("span", {classList: "state__name"}, "");
    DOM.next = DOM.container.newChildElement("button", {classList: "state__button", eventListeners: {"click": next.bind(this)}}, "Следующий >");
    next();
}