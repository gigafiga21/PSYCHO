/**
 * Class manages tests switching
 * @constructor
 * @param {Element}       parent       - where to place app
 * @param {Array[Object]} tests        - array with description of tests
 * @param {String}        tests[].name - name of the test
 * @param {Function}      tests[].run  - function runs the test
 */
function State(parent, tests)
{
    /**
     * Generates start screen of the app
     */
    function generateStartScreen()
    {
        var menu = frame.add(0);
        menu.newChildElement("button",
            {
                classList: ["state__button", "state__start"],
                eventListeners: {"click": next.bind(this)}
            }, "Начать тестирование");
    }
    
    /**
     * Switches to the next test
     */
    function next()
    {
        current++;
        frame.free();
        DOM.current.innerHTML = "#" + tests[current].name;
        DOM.next.disabled = true;
        
        tests[current].run(frame, this);
    }
    
    /**
     * Freed ability (makes button active) to go to the next test.
     * Calls by function run stored in the tests array when test is done
     * @callback run
     */
    this.continue = function()
    {
        if (current == tests.length - 1)
        {
            DOM.next.innerHTML = "Ещё раз";
            current = -1;
        }
        
        DOM.next.disabled = false;
    }
    
    /**
     * DOM tree of the class
     * @type {Object}
     */
    var DOM =
        {
            container: null,
            current: null,
            next: null,
            frame: null
        };
    
    /**
     * @var {Number} current - current test index
     * @var {Test}   frame   - container class for test
     */
    var current = -1,
        frame = new Test(document.body);
    
    tests.splice(0, 0, {name: "0", run: generateStartScreen.bind(this)});
    
    DOM.container = parent.newChildElement("div", {classList: "state__container"});
    DOM.current = DOM.container.newChildElement("span", {classList: "state__name"}, "");
    DOM.next = DOM.container.newChildElement("button", {classList: "state__button", eventListeners: {"click": next.bind(this)}}, "Следующий >");
    next();
}
