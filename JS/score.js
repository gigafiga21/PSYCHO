/**
 * Shows given score on screen
 * @constructor
 * @param {Element} parent - where to place DOM of the class
 * @param {Number}  score  - score to display
 */
function Score(parent, score)
{
    /**
     * Translates all strings in the class to given language
     * @param {String} language - language to change strings
     */
    function translate(language)
    {
        DOM.header.innerHTML = strings[translations.current].score;
    }

    /**
     * Translated strings
     * @type {Array}
     */
    var strings =
        {
            "EN": {score: "Score:"},
            "RU": {score: "Результат:"}
        };

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
    DOM.header = DOM.container.newChildElement("span", {classList: "score__header"}, strings[translations.current].score);
    DOM.score = DOM.container.newChildElement("span", {classList: "score__result"}, "" + score);
    translations.addEventListener(translate.bind(this));
}
