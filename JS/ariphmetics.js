/**
 * Game based on the simple equatation solving
 * @constructor
 * @param {Element} parent - where to place DOM of the class
 */
function Ariphmetics(parent)
{
    /**
     * Generates equatation and calculates right solution for it
     * @return {Equatation}
     */
    function generateEquotation()
    {
        /**
         * @typedef {Object} Equatation
         * @prop    {Number} a         - first operand
         * @prop    {Number} b         - second operand
         * @prop    {String} operation - operation applied to the operands
         * @prop    {Number} result    - solution
         */
        var equotation =
            {
                a: null,
                operation: ["+", "-", "/", "*"][Math.floor(Math.random(0, 3))],
                b: null,
                result: null
            };
        
        switch (equotation.operation)
        {
            case "+":
                equotation.result = Math.floor(Math.random(1, 99));
                equotation.a = Math.floor(Math.random(1, equotation.result));
                equotation.b = equotation.result - equotation.a;
                break;
            case "-":
                equotation.result = Math.floor(Math.random(1, 70));
                equotation.a = Math.floor(Math.random(equotation.result, 99));
                equotation.b = equotation.a - equotation.result;
                break;
            case "*":
                equotation.a = Math.floor(Math.random(2, 49));
                equotation.b = Math.floor(Math.random(2, 100 / equotation.a));
                equotation.result = equotation.a * equotation.b;
                break;
            case "/":
                equotation.result = Math.floor(Math.random(2, 49));
                equotation.b = Math.floor(Math.random(2, 100 / equotation.result));
                equotation.a = equotation.result * equotation.b;
        }
        
        return equotation;
    }
    
    /**
     * Randomly generates wrong solutions for given equatation
     * @param {Number} seed - right solution of the equatation
     */
    function generateAnswers(seed)
    {
        var answers = [];
        
        for (var counter = 1; counter < 99; counter++)
        {
            if (counter != seed)
            {
                answers.push(counter);
            }
        }
        
        answers.sort(function()
            {
                return Math.random() - 0.5;
            });
        
        return answers.slice(0, 2);
    }
    
    /**
     * Fills DOM of the class instance with generated equatation and solutions
     */
    function generateTask()
    {
        var equotation = generateEquotation(),
            answers = generateAnswers(equotation.result),
            right = Math.floor(Math.random(0, answers.length));
        
        answers.splice(right, 0, equotation.result);
        DOM.equotation.innerHTML = equotation.a + " " + equotation.operation + " " + equotation.b + " =";
        
        for (var counter = 0; counter < answers.length; counter++)
        {
            var answer = DOM.answers.newChildElement("button", {classList: "ariphmetics__checkbox"});
            answer.addEventListener("click", checkAnswer.bind(this));
            DOM.answers.newChildElement("span", {}, "" + answers[counter]);
            DOM.answers.newChildElement("br");
            
            if (answers[counter] == equotation.result)
            {
                answer.setAttribute("NAME", "RIGHT");
            }
        }
    }
    
    function checkAnswer(event)
    {
        if (event.target.getAttribute("NAME") == "RIGHT")
        {
            score++;
        }

        DOM.answers.innerHTML = "";
        DOM.equotation.innerHTML = "";
        generateTask();
    }
    
    /**
     * Returns amount of equatations solved right
     * @return {Number}
     */
    this.getScore = function()
    {
        return score;
    }
    
    /**
     * DOM tree of the class
     * @type {Object}
     */
    var DOM =
        {
            container: null,
            equotation: null,
            answers: null
        };
    
    /**
     * Amount of given right solutions
     * @type {Number}
     */
    var score = 0;
    
    DOM.container = parent.newChildElement("div", {classList: "ariphmetics__container"});
    DOM.equotation = DOM.container.newChildElement("div", {classList: "ariphmetics__equotation"});
    DOM.answers = DOM.container.newChildElement("div");
    
    generateTask();
}
