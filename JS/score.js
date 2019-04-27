/**
 * Shows given score on screen
 * @constructor
 * @param {Element} parent - where to place DOM of the class
 * @param {Number}  score  - score to display
 */
function Score(parent, score)
{
    /**
     * DOM tree of the class
     * @type {Object}
     */
    var DOM =
        {
            container: null,
            header: null,
            score: null
        };
    
    DOM.container = parent.newChildElement("div", {classList: "score__container"});
    DOM.header = DOM.container.newChildElement("span", {classList: "score__header"}, "Результат:");
    DOM.score = DOM.container.newChildElement("span", {classList: "score__result"}, "" + score);
}
