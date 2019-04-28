/**
 * Singleton keeps all strings used for translation
 * @type {Object}
 */
var translations = new
    (function()
    {
        /**
         * Changes current language and dispatches event of it
         * @param {String} language - choosed language name
         */
        function change(language)
        {
            var next = DOM.container.querySelector("[name='" + language + "']");
            if (!next)
            {
                return;
            }

            var active = DOM.container.querySelector(".translations__button--active");
            if (active)
            {
                active.classList.remove("translations__button--active");
            }

            next.classList.add("translations__button--active");
        }

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
        ["EN", "RU"].forEach(
            (function(name)
            {
                var button = DOM.container.newChildElement("button", {classList: "translations__button", name: name}, name);
                button.addEventListener("click", change.bind(this, name));
                DOM.buttons.push(button);
            }).bind(this));

        change("EN");
    })();
