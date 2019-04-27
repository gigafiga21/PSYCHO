/**
 * Puzzle game
 * @constructor
 * @param {Element} parent - where to place DOM of the class
 */
function Puzzle(parent)
{
    /**
     * Generates path of the random polygon with 3-6 angles
     * This polygon will be sliced to the puzzles after
     * @return {Array} - flat array with coords of vertices
     */
    function generateMainFigure()
    {
        var angles = Math.random(3, 6),
            path = [],
            fullAngle = 0;
        
        for (var counter = 0; counter < angles; counter++)
        {
            var angle = Math.floor(Math.random(270 / angles, 360 / angles));
            
            fullAngle += angle;
            path.push(125 + 75 * Math.round(Math.cos(fullAngle * Math.PI / 180)));
            path.push(150 + 75 * Math.round(Math.sin(fullAngle * Math.PI / 180)));
        }
        
        return path;
    }
    
    /**
     * Splitts main polygon into the puzzles
     * @param  {Array} polygon - flat array with coords of polygon
     * @return {Array}         - contains arrays with coords of each piece of the sliced main polygon
     */
    function splitMainFigure(polygon)
    {
        var slices = [];
        
        for (var counter = 0; counter < 3; counter++)
        {
            var box = PolyK.GetAABB(polygon),
                center = {x: box.x + box.width / 2, y: box.y + box.height / 2},
                angle, a = {}, b = {};
            
            if (counter % 2 == 0)
            {
                angle = Math.floor(Math.random(0, Math.PI / 9 * 4));
            }
            else
            {
                angle = Math.floor(Math.random(Math.PI / 9 * 5, Math.PI / 18 * 17));
            }
            
            a = {x: box.x + box.width + 10, y: Math.tan(angle) * (box.x + 10 + box.width - center.x) + center.y};
            b = {x: box.x - 10, y: Math.tan(angle) * (box.x - 10 - center.x) + center.y};
            
            var sliced = PolyK.Slice(polygon, a.x, a.y, b.x, b.y);
            if (sliced.length == 2)
            {
                slices.push(sliced[0]);
                polygon = sliced[1];
            }
        }
        
        slices.push(polygon);
        return slices;
    }
    
    /**
     * Draggs puzzle piece while the mouse is down on it
     * @type {Function}
     */
    var drag = (function(event)
    {
        var points = dragging.getAttribute("points").split(","),
            box = PolyK.GetAABB(points),
            canvasCoords = DOM.canvas.getBoundingClientRect(),
            point = {x: event.pageX - canvasCoords.left, y: event.pageY - canvasCoords.top},
            index = Number(dragging.getAttribute("index")),
            w = DOM.canvas.clientWidth;
        
        if (!PolyK.ContainsPoint([0, 0, w, 0, w, 300, 0, 300], box.x, box.y) ||
            !PolyK.ContainsPoint([0, 0, w, 0, w, 300, 0, 300], box.x + box.width, box.y + box.height))
        {
            document.body.dispatchEvent(new Event("mouseup"));
            return;
        }
        
        points = PolyK.Move(points, point.x - puzzles[index].cursorX, point.y - puzzles[index].cursorY);
        dragging.setAttribute("points", points);
    }).bind(this);
    
    /**
     * Releases dragging of the puzzle piece
     * If piece was release at right place - will be fixed, else - returned to where it was before dragging
     * @type {Function}
     */
    var drop = (function(event)
    {
        var index = Number(dragging.getAttribute("index")),
            points = dragging.getAttribute("points").split(","),
            box = PolyK.GetAABB(points);
        
        if (Math.abs(puzzles[index].x0 - box.x) < 11 && Math.abs(puzzles[index].y0 - box.y) < 11)
        {
            dragging.setAttribute("points", PolyK.Move(points, puzzles[index].x0, puzzles[index].y0));
            dragging.removeEventListener("mousedown", grab);
            steps--;
            
            if (steps == 0)
            {
                DOM.canvas.innerHTML = "";
                puzzles = [];
                score++;
                drawPuzzle();
            }
        }
        else
        {
            dragging.setAttribute("points", PolyK.Move(dragging.getAttribute("points").split(","), puzzles[index].x, puzzles[index].y));
        }
        
        document.body.removeEventListener("mousemove", drag);
        document.body.removeEventListener("mouseup", drop);
        dragging = null;
    }).bind(this);
    
    /**
     * Enables dragging of the puzzle piece after mouse is down on it
     * @type {Function}
     */
    var grab = (function(event)
    {
        dragging = event.target.cloneNode(true);
        dragging.addEventListener("mousedown", grab);
        DOM.canvas.removeChild(event.target);
        DOM.canvas.appendChild(dragging);
        
        var box = PolyK.GetAABB(dragging.getAttribute("points").split(",")),
            canvasCoords = DOM.canvas.getBoundingClientRect(),
            index = Number(dragging.getAttribute("index"));
        
        document.body.addEventListener("mousemove", drag);
        document.body.addEventListener("mouseup", drop);
        
        puzzles[index].cursorX = (event.pageX - canvasCoords.left) - box.x;
        puzzles[index].cursorY = (event.pageY - canvasCoords.top) - box.y
    }).bind(this);
    
    /**
     * Generates SVG canvas and draws puzzle on it
     */
    function drawPuzzle()
    {
        var polygon = generateMainFigure();
        
        var polygonElement = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygonElement.classList.add("puzzle__frame");
        polygonElement.setAttribute("points", polygon);
        DOM.canvas.appendChild(polygonElement);
        
        var slices = splitMainFigure(polygon).sort(
            function()
            {
                return Math.random() - 0.5;
            }),
            edge = {x: 205, y: 75, xMax: 0};
        
        steps = slices.length;
        
        for (var counter = 0; counter < slices.length; counter++)
        {
            var box = PolyK.GetAABB(slices[counter]),
                info = {x0: box.x, y0: box.y, id: counter};
            
            if (box.height < 230 - edge.y)
            {
                slices[counter] = PolyK.Move(slices[counter], edge.x, edge.y);
                info.x = edge.x;
                info.y = edge.y;
                edge.y = edge.y + box.height + 5;
                
                if (box.width + edge.x > edge.xMax)
                {
                    edge.xMax = box.width + edge.x;
                }
            }
            else
            {
                edge.y = 80 + box.height;
                edge.x = edge.xMax + 5;
                edge.xMax = edge.x + box.width;
                slices[counter] = PolyK.Move(slices[counter], edge.x, 75);
                info.x = edge.x;
                info.y = 75;
            }
            
            puzzles.push(info);
            
            var puzzle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            puzzle.classList.add("puzzle__puzzle");
            puzzle.setAttribute("points", slices[counter]);
            puzzle.setAttribute("index", counter);
            puzzle.addEventListener("mousedown", grab);
            DOM.canvas.appendChild(puzzle);
        }
        
        DOM.canvas.style.width = edge.xMax + 50 + "px";
    }
    
    /**
     * Releases grabbed puzzle piece
     */
    this.free = function()
    {
        document.body.dispatchEvent(new Event("mouseup"));
    }
    
    /**
     * Returns amount of solved puzzles
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
            canvas: null
        };

    /**
     * @var {Array}        puzzles  - array of SVG elements presented by the puzzle pieces
     * @var {Number}       steps    - amount of pieces which was not placed yet at the puzzle at the right way
     * @var {Element|Null} dragging - current dragging puzzle piece
     * @var {Number}       score    - amount of solved puzzles
     */
    var puzzles = [],
        steps = 0,
        dragging = null,
        score = 0;
    
    DOM.canvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    DOM.canvas.classList.add("puzzle__canvas");
    parent.appendChild(DOM.canvas);
    drawPuzzle();
}
