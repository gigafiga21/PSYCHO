/**
 * Singleton keeps all strings used for translation
 * @type {Object}
 */
var translations = new
    (function()
    {
        /**
         * DOM tree of the class
         * @type {Object}
         */
        var DOM =
            {
                container: null,
                buttons: []
            };

        DOM.container = document.body.newChildElement("div", {classList: "translations__container"});
        ["RU", "EN"].forEach(
            (function(name)
            {
                DOM.buttons.push(DOM.container.newChildElement("button", {classList: "translations__button"}, name));
            }).bind(this));
    })();
