function isFunction(e){return e instanceof Function}function isArray(e){return e instanceof Array}function isObject(e){return e instanceof Object}function isElement(e){return e instanceof Element}function isText(e){return e instanceof Text}function isString(e){return"string"==typeof e}Element.prototype.setEventListeners=function(e){if(e&&isObject(e)){this.__events__=this.__events__||{};for(var t in e)isArray(e[t])||(e[t]=[e[t]]),this.__events__[t]=this.__events__[t]||[],e[t].forEach(function(e){if(isFunction(e)){if("resize"==t&&"IFRAME"!=this.tagName&&this.__events__.resize&&!this.__events__.resize.length)this.__resizer__=this.newChildElementBefore(this.children[0],"iframe",{style:"WIDTH:100%;HEIGHT:100%;POSITION:ABSOLUTE;OPACITY:0;Z-INDEX:-1000",name:"BASIS__RESIZER"}),this.__resizer__.contentWindow.onresize=function(){this.dispatchEvent(new Event("resize"))}.bind(this);else if("startloading"==t&&"IFRAME"==this.tagName&&this.__events__.startloading&&!this.__events__.startloading.length)var n=setInterval(function(){try{if("about:blank"==this.src){(e=new Event("startloading")).error="src",clearInterval(n),this.dispatchEvent(e)}else if("about:blank"!=this.contentWindow.location.href){var e=new Event("startloading");clearInterval(n),this.dispatchEvent(e)}}catch(t){(e=new Event("startloading")).error="origin",clearInterval(n),this.dispatchEvent(e)}}.bind(this),10);this.__events__[t].push(e),this.addEventListener(t,e)}else console.warn('ERROR: cannot set something except Function as an event listener to event, called "'+t+'". Skipping.')}.bind(this))}else console.warn("ERROR: argument passed to setEventListeners method is not an Object. Skipping.")},Element.prototype.removeEventListeners=function(e){if(e&&isObject(e)){this.__events__=this.__events__||{};for(var t in e)isArray(e[t])||(e[t]=[e[t]]),this.__events__[t]=this.__events__[t]||[],e[t].forEach(function(e){if(isFunction(e)){var n=this.__events__[t].indexOf(e);-1!=n&&(this.__events__[t].splice(n,1),"startloading"!=t||this.__events__[t].length||this.removeChildren(this.__resizer__)),this.removeEventListener(t,e)}else console.warn('ERROR: cannot remove something except Function as an event listener to event, called "'+t+'". Skipping.')}.bind(this))}else console.warn("ERROR: argument passed to setEventListeners method is not an Object. Skipping.")},Element.prototype.cloneElement=function(e){var t;return t=(e.deep,this.cloneNode(!0)),e.listeners&&(t.__events__=this.__events__,t.setEventListeners(t.__events__)),t},Element.prototype.removeCSS=function(){Array.from(arguments).forEach(function(e){isString(e)?this.classList.remove(e):isArray(e)?this.setCSS.apply(this,e):console.warn("ERROR: cannot remove something except String as an CSS-class. Skipping.")}.bind(this))},Element.prototype.setCSS=function(){Array.from(arguments).forEach(function(e){isString(e)?this.classList.add(e):isArray(e)?this.setCSS.apply(this,e):console.warn("ERROR: cannot set something except String as an CSS-class. Skipping.")}.bind(this))},Element.prototype.setAttributes=function(e){if(isObject(e))for(var t in e)e[t]?this.setAttribute(t,e[t]):this.removeAttribute(t);else console.warn("ERROR: argument passed to setAttributes method is not an Object. Skipping.")},Element.prototype.removeAttributes=function(){Array.from(arguments).forEach(function(e){isString(e)?this.removeAttribute(e):isArray(e)?this.removeAttributes.apply(this,e):console.warn("ERROR: cannot remove attribute because given id is not a String. Skipping.")}.bind(this))},Element.prototype.setProperties=function(e){isObject(e.eventListeners)?this.setEventListeners(e.eventListeners):e.eventListeners&&console.warn("ERROR: argument passed to setEventListeners method is not an Object. Skipping"),isArray(e.classList)||isString(e.classList)?this.setCSS(e.classList):e.classList&&console.warn("ERROR: cannot set something except String or Array as an CSS-class. Skipping."),delete e.eventListeners,delete e.classList,this.setAttributes(e)},Element.prototype.appendChildren=function(){Array.from(arguments).forEach(function(e){isElement(e)?this.appendChild(e):isText(e)||isString(e)?this.innerHTML+=e:isArray(e)&&!isString(e)?this.appendChildren.apply(this,e):(console.log(e),console.warn("ERROR: cannot append something except String, Text or Element as an DOMElement. Skipping."))}.bind(this))},Element.prototype.removeChildren=function(){Array.from(arguments).forEach(function(e){isElement(e)||isText(e)?this.removeChild(e):isArray(e)&&!isString(e)?this.removeChildren.apply(this,e):console.warn("ERROR: cannot remove something except Text or Element as an DOMElement. Skipping.")}.bind(this))},Document.prototype.newElement=function(){if("string"!=typeof(arguments=Array.from(arguments))[0])return console.warn("ERROR: first argument passed to newElement method is not an String. Skipping."),null;var e=document.createElement(arguments[0]);return!(arguments=arguments.slice(1))[0]||isArray(arguments[0])||isElement(arguments[0])||isString(arguments[0])||(e.setProperties(arguments[0]),arguments=arguments.slice(1)),arguments[0]&&(isArray(arguments[0])||isElement(arguments[0])||isString(arguments[0]))&&e.appendChildren.apply(e,arguments),e},Element.prototype.newChildElement=function(){var e=document.newElement.apply(null,arguments);return e&&this.appendChild(e),e},Element.prototype.newChildElementBefore=function(){var e=document.newElement.apply(null,Array.from(arguments).splice(1,arguments.length-1));return e&&(isElement(arguments[0])?this.insertBefore(e,arguments[0]):this.appendChild(e)),e};


	/*
		PolyK library
		url: http://polyk.ivank.net
		Released under MIT licence.
		
		Copyright (c) 2012 - 2014 Ivan Kuckir

		Permission is hereby granted, free of charge, to any person
		obtaining a copy of this software and associated documentation
		files (the "Software"), to deal in the Software without
		restriction, including without limitation the rights to use,
		copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the
		Software is furnished to do so, subject to the following
		conditions:

		The above copyright notice and this permission notice shall be
		included in all copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
		EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
		OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
		NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
		HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
		WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
		FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
		OTHER DEALINGS IN THE SOFTWARE.
		
		19. 5. 2014 - Problem with slicing fixed.
	*/

	var PolyK = {};
	
	/*
		Is Polygon self-intersecting?
		
		O(n^2)
	*/
	
	PolyK.IsSimple = function(p)
	{
		var n = p.length>>1;
		if(n<4) return true;
		var a1 = new PolyK._P(), a2 = new PolyK._P();
		var b1 = new PolyK._P(), b2 = new PolyK._P();
		var c = new PolyK._P();
		
		for(var i=0; i<n; i++)
		{
			a1.x = p[2*i  ];
			a1.y = p[2*i+1];
			if(i==n-1)	{ a2.x = p[0    ];  a2.y = p[1    ]; }
			else		{ a2.x = p[2*i+2];  a2.y = p[2*i+3]; }
			
			for(var j=0; j<n; j++)
			{
				if(Math.abs(i-j) < 2) continue;
				if(j==n-1 && i==0) continue;
				if(i==n-1 && j==0) continue;
				
				b1.x = p[2*j  ];
				b1.y = p[2*j+1];
				if(j==n-1)	{ b2.x = p[0    ];  b2.y = p[1    ]; }
				else		{ b2.x = p[2*j+2];  b2.y = p[2*j+3]; }
				
				if(PolyK._GetLineIntersection(a1,a2,b1,b2,c) != null) return false;
			}
		}
		return true;
	}
	
	PolyK.IsConvex = function(p)
	{
		if(p.length<6) return true;
		var l = p.length - 4;
		for(var i=0; i<l; i+=2)
			if(!PolyK._convex(p[i], p[i+1], p[i+2], p[i+3], p[i+4], p[i+5])) return false;
		if(!PolyK._convex(p[l  ], p[l+1], p[l+2], p[l+3], p[0], p[1])) return false;
		if(!PolyK._convex(p[l+2], p[l+3], p[0  ], p[1  ], p[2], p[3])) return false;
		return true;
	}
	
	PolyK.GetArea = function(p)
	{
		if(p.length <6) return 0;
		var l = p.length - 2;
		var sum = 0;
		for(var i=0; i<l; i+=2)
			sum += (p[i+2]-p[i]) * (p[i+1]+p[i+3]);
		sum += (p[0]-p[l]) * (p[l+1]+p[1]);
		return - sum * 0.5;
	}
	
	PolyK.GetAABB = function(p)
	{
		var minx = Infinity; 
		var miny = Infinity;
		var maxx = -minx;
		var maxy = -miny;
		for(var i=0; i<p.length; i+=2)
		{
			minx = Math.min(minx, p[i  ]);
			maxx = Math.max(maxx, p[i  ]);
			miny = Math.min(miny, p[i+1]);
			maxy = Math.max(maxy, p[i+1]);
		}
		return {x:minx, y:miny, width:maxx-minx, height:maxy-miny};
	}
	
	PolyK.Reverse = function(p)
	{
		var np = [];
		for(var j=p.length-2; j>=0; j-=2)  np.push(p[j], p[j+1])
		return np;
	}
	

	PolyK.Triangulate = function(p)
	{
		var n = p.length>>1;
		if(n<3) return [];
		var tgs = [];
		var avl = [];
		for(var i=0; i<n; i++) avl.push(i);
		
		var i = 0;
		var al = n;
		while(al > 3)
		{
			var i0 = avl[(i+0)%al];
			var i1 = avl[(i+1)%al];
			var i2 = avl[(i+2)%al];
			
			var ax = p[2*i0],  ay = p[2*i0+1];
			var bx = p[2*i1],  by = p[2*i1+1];
			var cx = p[2*i2],  cy = p[2*i2+1];
			
			var earFound = false;
			if(PolyK._convex(ax, ay, bx, by, cx, cy))
			{
				earFound = true;
				for(var j=0; j<al; j++)
				{
					var vi = avl[j];
					if(vi==i0 || vi==i1 || vi==i2) continue;
					if(PolyK._PointInTriangle(p[2*vi], p[2*vi+1], ax, ay, bx, by, cx, cy)) {earFound = false; break;}
				}
			}
			if(earFound)
			{
				tgs.push(i0, i1, i2);
				avl.splice((i+1)%al, 1);
				al--;
				i= 0;
			}
			else if(i++ > 3*al) break;		// no convex angles :(
		}
		tgs.push(avl[0], avl[1], avl[2]);
		return tgs;
	}
	
	PolyK.ContainsPoint = function(p, px, py)
	{
		var n = p.length>>1;
		var ax, ay = p[2*n-3]-py, bx = p[2*n-2]-px, by = p[2*n-1]-py;
		
		//var lup = by > ay;
		for(var i=0; i<n; i++)
		{
			ax = bx;  ay = by;
			bx = p[2*i  ] - px;
			by = p[2*i+1] - py;
			if(ay==by) continue;
			lup = by>ay;
		}
		
		var depth = 0;
		for(var i=0; i<n; i++)
		{
			ax = bx;  ay = by;
			bx = p[2*i  ] - px;
			by = p[2*i+1] - py;
			if(ay< 0 && by< 0) continue;	// both "up" or both "down"
			if(ay> 0 && by> 0) continue;	// both "up" or both "down"
			if(ax< 0 && bx< 0) continue; 	// both points on the left
			
			if(ay==by && Math.min(ax,bx)<=0) return true;
			if(ay==by) continue;
			
			var lx = ax + (bx-ax)*(-ay)/(by-ay);
			if(lx==0) return true;			// point on edge
			if(lx> 0) depth++;
			if(ay==0 &&  lup && by>ay) depth--;	// hit vertex, both up
			if(ay==0 && !lup && by<ay) depth--; // hit vertex, both down
			lup = by>ay;
		}
		//console.log(depth);
		return (depth & 1) == 1;
	}
	
	PolyK.Slice = function(p, ax, ay, bx, by)
	{
		if(PolyK.ContainsPoint(p, ax, ay) || PolyK.ContainsPoint(p, bx, by)) return [p.slice(0)];

		var a = new PolyK._P(ax, ay);
		var b = new PolyK._P(bx, by);
		var iscs = [];	// intersections
		var ps = [];	// points
		for(var i=0; i<p.length; i+=2) ps.push(new PolyK._P(p[i], p[i+1]));
		
		for(var i=0; i<ps.length; i++)
		{
			var isc = new PolyK._P(0,0);
			isc = PolyK._GetLineIntersection(a, b, ps[i], ps[(i+1)%ps.length], isc);
			var fisc = iscs[0];
			var lisc = iscs[iscs.length-1];
			if(isc && (fisc==null || PolyK._P.dist(isc,fisc)>1e-10) && (lisc==null || PolyK._P.dist(isc,lisc)>1e-10 ) )//&& (isc.x!=ps[i].x || isc.y!=ps[i].y) )
			{
				isc.flag = true;
				iscs.push(isc);
				ps.splice(i+1,0,isc);
				i++;
			}
		}
		
		if(iscs.length <2) return [p.slice(0)];
		var comp = function(u,v) { return PolyK._P.dist(a,u) - PolyK._P.dist(a,v); }
		iscs.sort(comp);
		
		//console.log("Intersections: "+iscs.length, JSON.stringify(iscs));
		
		var pgs = [];
		var dir = 0;
		while(iscs.length > 0)
		{
			var n = ps.length;
			var i0 = iscs[0];
			var i1 = iscs[1];
			//if(i0.x==i1.x && i0.y==i1.y) { iscs.splice(0,2); continue;}
			var ind0 = ps.indexOf(i0);
			var ind1 = ps.indexOf(i1);
			var solved = false;
			
			//console.log(i0, i1);
			
			if(PolyK._firstWithFlag(ps, ind0) == ind1) solved = true;
			else
			{
				i0 = iscs[1];
				i1 = iscs[0];
				ind0 = ps.indexOf(i0);
				ind1 = ps.indexOf(i1);
				if(PolyK._firstWithFlag(ps, ind0) == ind1) solved = true;
			}
			if(solved)
			{
				dir--;
				var pgn = PolyK._getPoints(ps, ind0, ind1);
				pgs.push(pgn);
				ps = PolyK._getPoints(ps, ind1, ind0);
				i0.flag = i1.flag = false;
				iscs.splice(0,2);
				if(iscs.length == 0) pgs.push(ps);
			}
			else { dir++; iscs.reverse(); }
			if(dir>1) break;
		}
		var result = [];
		for(var i=0; i<pgs.length; i++)
		{
			var pg = pgs[i];
			var npg = [];
			for(var j=0; j<pg.length; j++) npg.push(pg[j].x, pg[j].y);
			result.push(npg);
		}
		return result;
	}
	
	PolyK.Raycast = function(p, x, y, dx, dy, isc)
	{
		var l = p.length - 2;
		var tp = PolyK._tp;
		var a1 = tp[0], a2 = tp[1], 
		b1 = tp[2], b2 = tp[3], c = tp[4];
		a1.x = x; a1.y = y;
		a2.x = x+dx; a2.y = y+dy;
		
		if(isc==null) isc = {dist:0, edge:0, norm:{x:0, y:0}, refl:{x:0, y:0}};
		isc.dist = Infinity;
		
		for(var i=0; i<l; i+=2)
		{
			b1.x = p[i  ];  b1.y = p[i+1];
			b2.x = p[i+2];  b2.y = p[i+3];
			var nisc = PolyK._RayLineIntersection(a1, a2, b1, b2, c);
			if(nisc) PolyK._updateISC(dx, dy, a1, b1, b2, c, i/2, isc);
		}
		b1.x = b2.x;  b1.y = b2.y;
		b2.x = p[0];  b2.y = p[1];
		var nisc = PolyK._RayLineIntersection(a1, a2, b1, b2, c);
		if(nisc) PolyK._updateISC(dx, dy, a1, b1, b2, c, (p.length/2)-1, isc);
		
		return (isc.dist != Infinity) ? isc : null;
	}
	
	PolyK.ClosestEdge = function(p, x, y, isc)
	{
		var l = p.length - 2;
		var tp = PolyK._tp;
		var a1 = tp[0], 
		b1 = tp[2], b2 = tp[3], c = tp[4];
		a1.x = x; a1.y = y;
		
		if(isc==null) isc = {dist:0, edge:0, point:{x:0, y:0}, norm:{x:0, y:0}};
		isc.dist = Infinity;
		
		for(var i=0; i<l; i+=2)
		{
			b1.x = p[i  ];  b1.y = p[i+1];
			b2.x = p[i+2];  b2.y = p[i+3];
			PolyK._pointLineDist(a1, b1, b2, i>>1, isc);
		}
		b1.x = b2.x;  b1.y = b2.y;
		b2.x = p[0];  b2.y = p[1];
		PolyK._pointLineDist(a1, b1, b2, l>>1, isc);
		
		var idst = 1/isc.dist;
		isc.norm.x = (x-isc.point.x)*idst;
		isc.norm.y = (y-isc.point.y)*idst;
		return isc;
	}
    
    PolyK.Move = function(p, nx, ny)
    {
        var p1 = [],
            box = PolyK.GetAABB(p);

        for (var c = 0; c < p.length; c++)
        {
            if (c % 2 == 0)
                p1.push(Number(p[c]) + nx - box.x);
            else
                p1.push(Number(p[c]) + ny - box.y);
        }

        return p1;
    }
	
	PolyK._pointLineDist = function(p, a, b, edge, isc)
	{
		var x = p.x, y = p.y, x1 = a.x, y1 = a.y, x2 = b.x, y2 = b.y;
		
		var A = x - x1;
		var B = y - y1;
		var C = x2 - x1;
		var D = y2 - y1;

		var dot = A * C + B * D;
		var len_sq = C * C + D * D;
		var param = dot / len_sq;

		var xx, yy;

		if (param < 0 || (x1 == x2 && y1 == y2)) {
			xx = x1;
			yy = y1;
		}
		else if (param > 1) {
			xx = x2;
			yy = y2;
		}
		else {
			xx = x1 + param * C;
			yy = y1 + param * D;
		}

		var dx = x - xx;
		var dy = y - yy;
		var dst = Math.sqrt(dx * dx + dy * dy);
		if(dst<isc.dist)
		{
			isc.dist = dst;
			isc.edge = edge;
			isc.point.x = xx;
			isc.point.y = yy;
		}
	}
	
	PolyK._updateISC = function(dx, dy, a1, b1, b2, c, edge, isc)
	{
		var nrl = PolyK._P.dist(a1, c);
		if(nrl<isc.dist)
		{
			var ibl = 1/PolyK._P.dist(b1, b2);
			var nx = -(b2.y-b1.y)*ibl;
			var ny =  (b2.x-b1.x)*ibl;
			var ddot = 2*(dx*nx+dy*ny);
			isc.dist = nrl;
			isc.norm.x = nx;  
			isc.norm.y = ny; 
			isc.refl.x = -ddot*nx+dx;
			isc.refl.y = -ddot*ny+dy;
			isc.edge = edge;
		}
	}
	
	PolyK._getPoints = function(ps, ind0, ind1)
	{
		var n = ps.length;
		var nps = [];
		if(ind1<ind0) ind1 += n;
		for(var i=ind0; i<= ind1; i++) nps.push(ps[i%n]);
		return nps;
	}
	
	PolyK._firstWithFlag = function(ps, ind)
	{
		var n = ps.length;
		while(true)
		{
			ind = (ind+1)%n;
			if(ps[ind].flag) return ind;
		}
	}
	
	PolyK._PointInTriangle = function(px, py, ax, ay, bx, by, cx, cy)
	{
		var v0x = cx-ax;
		var v0y = cy-ay;
		var v1x = bx-ax;
		var v1y = by-ay;
		var v2x = px-ax;
		var v2y = py-ay;
		
		var dot00 = v0x*v0x+v0y*v0y;
		var dot01 = v0x*v1x+v0y*v1y;
		var dot02 = v0x*v2x+v0y*v2y;
		var dot11 = v1x*v1x+v1y*v1y;
		var dot12 = v1x*v2x+v1y*v2y;
		
		var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
		var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
		var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

		// Check if point is in triangle
		return (u >= 0) && (v >= 0) && (u + v < 1);
	}
	
	PolyK._RayLineIntersection = function(a1, a2, b1, b2, c)
	{
		var dax = (a1.x-a2.x), dbx = (b1.x-b2.x);
		var day = (a1.y-a2.y), dby = (b1.y-b2.y);

		var Den = dax*dby - day*dbx;
		if (Den == 0) return null;	// parallel
		
		var A = (a1.x * a2.y - a1.y * a2.x);
		var B = (b1.x * b2.y - b1.y * b2.x);
		
		var I = c;
		var iDen = 1/Den;
		I.x = ( A*dbx - dax*B ) * iDen;
		I.y = ( A*dby - day*B ) * iDen;
		
		if(!PolyK._InRect(I, b1, b2)) return null;
		if((day>0 && I.y>a1.y) || (day<0 && I.y<a1.y)) return null; 
		if((dax>0 && I.x>a1.x) || (dax<0 && I.x<a1.x)) return null; 
		return I;
	}
	
	PolyK._GetLineIntersection = function(a1, a2, b1, b2, c)
	{
		var dax = (a1.x-a2.x), dbx = (b1.x-b2.x);
		var day = (a1.y-a2.y), dby = (b1.y-b2.y);

		var Den = dax*dby - day*dbx;
		if (Den == 0) return null;	// parallel
		
		var A = (a1.x * a2.y - a1.y * a2.x);
		var B = (b1.x * b2.y - b1.y * b2.x);
		
		var I = c;
		I.x = ( A*dbx - dax*B ) / Den;
		I.y = ( A*dby - day*B ) / Den;
		
		if(PolyK._InRect(I, a1, a2) && PolyK._InRect(I, b1, b2)) return I;
		return null;
	}
	
	PolyK._InRect = function(a, b, c)	// a in rect (b,c)
	{
		var minx = Math.min(b.x,c.x), maxx = Math.max(b.x,c.x);
		var miny = Math.min(b.y,c.y), maxy = Math.max(b.y,c.y);
		
		if	(minx == maxx) return (miny<=a.y && a.y<=maxy);
		if	(miny == maxy) return (minx<=a.x && a.x<=maxx);
		
		//return (minx <= a.x && a.x <= maxx && miny <= a.y && a.y <= maxy)
		return (minx <= a.x+1e-10 && a.x-1e-10 <= maxx && miny <= a.y+1e-10 && a.y-1e-10 <= maxy) ;		
	}
	
	PolyK._convex = function(ax, ay, bx, by, cx, cy)
	{
		return (ay-by)*(cx-bx) + (bx-ax)*(cy-by) >= 0;
	}
		
	PolyK._P = function(x,y)
	{
		this.x = x;
		this.y = y;
		this.flag = false;
	}
	PolyK._P.prototype.toString = function()
	{
		return "Point ["+this.x+", "+this.y+"]";
	}
	PolyK._P.dist = function(a,b)
	{
		var dx = b.x-a.x;
		var dy = b.y-a.y;
		return Math.sqrt(dx*dx + dy*dy);
	}
	
	PolyK._tp = [];
	for(var i=0; i<10; i++) PolyK._tp.push(new PolyK._P(0,0));
var rand = Math.random;
Math.random = function(min, max)
{
    if (min == undefined || max == undefined)
    {
        return rand();
    }
    
    return min + rand() * (max + 1 - min);
}
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
            listeners.forEach(
                function(listener)
                {
                    listener(language);
                });
        }

        /**
         * Setts event listener
         * @param {String}   event    - name of event expected to be dispatched by the class
         * @param {Function} listener - listener for event
         */
        this.addEventListener = function(event, listener)
        {
            listeners.push(listener);
        }

        /**
         * Listeners for language changing event
         * @type {Array[Functions]}
         */
        var listeners = [];

        /**
         * Available languages
         * @type {Array[Strings]}
         */
        var languages = [];

        /**
         * Setter for languages property
         * Redraws DOM element with languages selection and setts first given as current
         * @type {Function}
         */
        Object.defineProperty(this, "languages", {set:
            (function(langs)
            {
                DOM.container.innerHTML = "";
                languages = langs;
                languages.forEach(
                    (function(name)
                    {
                        var button = DOM.container.newChildElement("button", {classList: "translations__button", name: name}, name);
                        button.addEventListener("click", change.bind(this, name));
                        DOM.buttons.push(button);
                    }).bind(this));
                change(languages[0]);
            }).bind(this)});

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
    })();

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

/**
 * Game based on pressing button after the dot appears on the screen
 * @constructor
 * @param {Element} parent - where to place DOM of the class
 * @param {Number}  time   - maximum amount of seconds between pressing button and displaying the dot again
 */
function Concentration(parent, time)
{
    /**
     * Draws dot on the random coords at the game field
     */
    function drawPoint()
    {
        DOM.point = DOM.field.newChildElement("div", {classList: "concentration__point"});
        DOM.point.style.left = Math.floor(Math.random(5, 565)) + "px";
        DOM.point.style.top = Math.floor(Math.random(5, 260)) + "px";
    }
    
    /**
     * Removes previously drawed dot and setts timeout for drawing next one randomly
     */
    function generatePoint()
    {
        if (!DOM.point && !first)
        {
            return;
        }
        else if (DOM.point)
        {
            DOM.field.removeChild(DOM.point);
            DOM.point = null;
        }
        else if (first)
        {
            first = false;
        }
            
        timer = setTimeout(
            function()
            {
                timer = null;
                drawPoint();
            }, Math.floor(Math.random(0, time / 4)));
    }
    
    /**
     * Removes processing timeout for dot drawing
     * Calls when class instance was destroyed by removing game from screen
     */
    this.free = function()
    {
        if (timer != null)
        {
            clearTimeout(timer);
            document.body.removeEventListener("keyup", getCode);
        }
    }
    
    /**
     * Processes button click when 'Enter' is pressed
     * @type {Function}
     */
    var getCode = (function(event)
    {
        if (event.which == 13 || event.keyCode == 13)
        {
            DOM.button.dispatchEvent(new Event("click"));
        }
    }).bind(this);
    
    /**
     * @var {Number} timer - id of the processing dot drawing timer
     * @var {Bool}   first - flag for avoiding removing unexisting dot when regenerating it first time
     * @var {Object} DOM   - DOM tree of the class
     */
    var timer = null,
        first = true,
        DOM =
        {
            container: null,
            button: null,
            field: null,
            point: null
        };
    
    DOM.container = parent.newChildElement("div", {classList: "concentration__container"});
    DOM.field = DOM.container.newChildElement("div", {classList: "concentration__field"});
    generatePoint();
    DOM.button = DOM.container.newChildElement("div", {classList: "concentration__button"});
    DOM.button.innerText = "<Enter>";
    DOM.button.addEventListener("click", generatePoint.bind(this));
    document.body.addEventListener("keyup", getCode);
}

/**
 * Manages breaks between games
 * @constructor
 * @param {Element} parent - where to place DOM of the class
 */
function Breaker(parent)
{
    /**
     * Hides/unhides breaker container
     */
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
    
    /**
     * Setts time for the break
     * @param {Number} time - amount of time for the break
     */
    this.setTime = function(time)
    {
        DOM.time.innerHTML = time + "s";
    }
    
    /**
     * @var {Object} DOM    - DOM tree of the class
     * @var {Bool}   hidden - flag for indicating visibility
     */
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

/**
 * Container class for the test managing animation and switching games screens
 * @constructor
 * @param {Element} parent - wherde to place DOM of the class
 */
function Test(parent)
{
    /**
     * Center the current active screen
     * @type {Function}
     */
    var center = (function()
    {
        if (!isResizable)
        {
            return;
        }
        
        var element = DOM.container.rows[0].cells[active],
            cellCentered = (document.body.clientWidth - element.clientWidth) / 2,
            containerDelta = DOM.container.getBoundingClientRect().left - element.getBoundingClientRect().left;
        
        DOM.container.style.left = cellCentered - element.offsetLeft + "px";
    }).bind(this);
    
    /**
     * Covers inactive screen with transparent block to prevent activating inner screen elements
     * @param {*} index - index of screen to cover
     */
    this.deactivate = function(index)
    {
        index = Number(index);
        DOM.container.rows[0].cells[index].appendChild(DOM.inactive.cloneNode(true));
        DOM.container.rows[0].cells[index].setCSS("test__inactive");
    }
    
    /**
     * Removes coverage and makesw screen active
     * @param {*} index - index of screen to make active
     */
    this.activate = function(index)
    {
        active = Number(index);
        index = Number(index);
        center();
        DOM.container.rows[0].cells[index].removeCSS("test__inactive");
        
        var cover = DOM.container.rows[0].cells[index].getElementsByClassName("test__inactive_cover")[0];
        if (cover)
        {
            DOM.container.rows[0].cells[index].removeChild(cover);
        }
    }
    
    /**
     * Adds screen to the container
     * @param  {*}      index         - index of the screen
     * @param  {Bool}   isUnresizable - if false, it will be possible to resize screen while animation
     * @return {Element}              - container to place game/smth else
     */
    this.add = function(index, isUnresizable)
    {
        var cell = DOM.container.rows[0].insertCell(index);
        cell.setAttribute("index", index);
        cell.setCSS("test__cell");
        
        if (isUnresizable)
        {
            isResizable = false;
        }
        
        return cell;
    }
    
    /**
     * Removes all inserted screens
     */
    this.free = function()
    {
        active = 0;
        isResizable = true;
        DOM.container.style.left = null;
        DOM.container.rows[0].innerHTML = "";
    }
    
    /**
     * @var {Bool}   isResizable - is current screen resizable
     * @var {*}      active      - index of an active screen
     * @var {Object} DOM         - DOM tree of the class
     */
    var isResizable = true,
        active = 0,
        DOM =
        {
            container: null,
            inactive: null
        };
    
    DOM.container = parent.newChildElement("table", {classList: "test__container"}, document.newElement("tr"));
    DOM.container.setEventListeners({"resize": center});
    DOM.inactive = document.newElement("div", {classList: "test__inactive_cover"});
}

/**
 * Function managing tests similar to 3B one
 * @param {Number} seconds - amount of seconds for the rest
 * @param {String} audio   - audiotrack playing while rest
 * @param {Bool}   lasting - if true then audiotrack will be played through all rest time
 * @param {Test}   frame   - container for the screens
 * @param {State}  state   - container for the tests
 */
function B3(seconds, audio, lasting, frame, state)
{
    var switchGame = (function()
    {
        frame.activate(active);
        setTimeout(rest, 10000);
    }).bind(this);

    var rest = (function()
    {
        puzzle.free();
        
        iterations++;
        if (iterations >= 6)
        {
            if (audio)
            {
                document.body.removeChild(track);
            }
            frame.free();
            new Score(frame.add(0, true), ariphmetics.getScore());
            new Score(frame.add(1, true), puzzle.getScore());
            state.continue();
            return;
        }

        frame.deactivate(active);
        active = active == 0 ? 2 : 0;
        frame.activate(1);
        breaker.toggle();
        breaker.setTime(seconds);
        
        if (audio)
        {
            track.play();
        }

        var currentSeconds = seconds,
            timer = setInterval((function()
            {
                currentSeconds--;
                if (currentSeconds <= 0)
                {
                    if (audio != null && !lasting)
                    {
                        track.play();
                    }
                    
                    clearInterval(timer);
                    breaker.toggle();
                    frame.deactivate(1);
                    switchGame();
                    return;
                }
                if (audio && lasting)
                {
                    track.pause();
                    track.currentTime = 0.0;
                    track.play();
                }
                breaker.setTime(currentSeconds);
            }).bind(this), 1000);
    }).bind(this);

    var ariphmetics = new Ariphmetics(frame.add(0)),
        breaker = new Breaker(frame.add(1)),
        puzzle = new Puzzle(frame.add(2)),
        active = 0,
        iterations = 0,
        track = null;

    if (audio)
    {
        track = document.body.newChildElement("audio", {"SRC": audio});
    }
    
    frame.activate(0);
    frame.deactivate(1);
    frame.deactivate(2);
    setTimeout(rest, 10000);
}

/**
 * All tests
 * @type {Array}
 */
var tests =
    [
        {
            name: "1",
            run: function(frame, state)
                {
                    var ariphmetics = new Ariphmetics(frame.add(0, true));
                    setTimeout(
                        (function()
                        {
                            frame.free();
                            new Score(frame.add(0, true), ariphmetics.getScore());
                            state.continue();
                        }).bind(this), 30000);
                }
        },
        {
            name: "2",
            run: function(frame, state)
                {
                    var puzzle = new Puzzle(frame.add(0, true));
                    setTimeout(
                        (function()
                        {
                            frame.free();
                            new Score(frame.add(0, true), puzzle.getScore());
                            state.continue();
                        }).bind(this), 30000);
                }
        },
        {
            name: "3А",
            run: function(frame, state)
                {
                    var switchGame = (function()
                    {
                        iterations++;
                        if (iterations >= 6)
                        {
                            frame.free();
                            new Score(frame.add(0, true), ariphmetics.getScore());
                            new Score(frame.add(1, true), puzzle.getScore());
                            state.continue();
                            return;
                        }
                        
                        puzzle.free();
                        frame.deactivate(active);
                        frame.activate(!active);
                        active = !active;
                        setTimeout(switchGame, 10000);
                    }).bind(this);
                    
                    var ariphmetics = new Ariphmetics(frame.add(0)),
                        puzzle = new Puzzle(frame.add(1)),
                        active = 0,
                        iterations = 0;
                    
                    frame.activate(active);
                    frame.deactivate(!active);
                    setTimeout(switchGame, 10000);
                }
        },
        {
            name: "3Б",
            run: B3.bind(null, 3, null, false)
        },
        {
            name: "3B",
            run: B3.bind(null, 6, null, false)
        },
        {
            name: "3Г",
            run: B3.bind(null, 10, null, false)
        },
        {
            name: "4",
            run: function(frame, state)
                {
                    var concentration = new Concentration(frame.add(0, true), 15000);
                    
                    setTimeout(
                        (function()
                        {
                            concentration.free();
                            frame.free();
                            B3(3, null, false, frame, state);
                        }).bind(this), 15000);
                }
        },
        {
            name: "5А",
            run: B3.bind(null, 3, "WAV/siren.wav", true)
        },
        {
            name: "5Б",
            run: B3.bind(null, 3, "WAV/clap.wav", false)
        },
        {
            name: "5В",
            run: function(frame, state)
                {
                    var time = 75,
                        track = document.body.newChildElement("audio", {eventListeners: {"loadeddata":
                            (function()
                            {
                                var timer = setInterval(
                                    function()
                                    {
                                        if (time <= 0)
                                        {
                                            clearInterval(timer);
                                            document.body.removeChild(track);
                                            return;
                                        }
                                        
                                        time--;
                                        track.pause(); 
                                        track.currentTime = 0.0;
                                        track.play();
                                    }, 1000);

                                B3(3, null, false, frame, state);
                            }).bind(this)}});
                    
                    track.setAttribute("SRC", "WAV/clap.wav");
                }
        },
        {
            name: "6",
            run: B3.bind(null, 3, null, false)
        }
    ];

translations.languages = ["EN", "RU"];
var state = new State(document.body, tests);

