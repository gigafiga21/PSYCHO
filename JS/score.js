function Score(parent, score)
{
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