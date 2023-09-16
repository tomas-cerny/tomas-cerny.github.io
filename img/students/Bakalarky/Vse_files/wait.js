var Geometry = {};

function getPosition() {
	
	if (window.screenLeft) { // IE and others
	//alert("window.screenLeft ");
	    Geometry.getWindowX = function( ) { return window.screenLeft; };
	    Geometry.getWindowY = function( ) { return window.screenTop; };
	} 
	
	else if (window.screenX) { // Firefox and others
	//alert("window.screenX " );
	    Geometry.getWindowX = function( ) { return window.screenX; };
	    Geometry.getWindowY = function( ) { return window.screenY; };
	}
	
	if (window.innerWidth) { // All browsers but IE
	//alert("window.innerWidth ");
	    Geometry.getViewportWidth = function( ) { return window.innerWidth; };
	    Geometry.getViewportHeight = function( ) { return window.innerHeight; };
	    Geometry.getHorizontalScroll = function( ) { return window.pageXOffset; };
	    Geometry.getVerticalScroll = function( ) { return window.pageYOffset; };
	} 
	else if (document.documentElement && document.documentElement.clientWidth) {
	//alert("document.documentElement && document.documentElement.clientWidth ");
	    // These functions are for IE 6 when there is a DOCTYPE
	    Geometry.getViewportWidth =
	        function( ) { return document.documentElement.clientWidth; };
	    Geometry.getViewportHeight =
	        function( ) { return document.documentElement.clientHeight; };
	    Geometry.getHorizontalScroll =
	        function( ) { return document.documentElement.scrollLeft; };
	    Geometry.getVerticalScroll =
	        function( ) { return document.documentElement.scrollTop; };
	}
	else if (document.body.clientWidth) {
	//alert("document.body.clientWidth ");
    // These are for IE4, IE5, and IE6 without a DOCTYPE
    Geometry.getViewportWidth =
        function( ) { return document.body.clientWidth; };
    Geometry.getViewportHeight =
        function( ) { return document.body.clientHeight; };
    Geometry.getHorizontalScroll =
        function( ) { return document.body.scrollLeft; };
    Geometry.getVerticalScroll =
        function( ) { return document.body.scrollTop; };
	}
}

function showWait(offset)
{
	/*
	old solution 
	
 	if (document.all) 
	{ 
	   xx = document.body.clientWidth;
	   //yy = document.body.clientHeight;
	}
	else 
	{ 
	   xx = innerWidth;
	   //yy = innerHeight;
	}
	xx = Math.round(xx/2) - 100;
	yy = 250; //Math.round(yy/2) - 50;
	*/
	if (offset == null) offset = 0;
	
	getPosition();
	
	xx = /*Geometry.getWindowX()*/ + Geometry.getHorizontalScroll() + (Geometry.getViewportWidth() / 2 - 100);
	yy = /*Geometry.getWindowY()*/ +  Geometry.getVerticalScroll() + (Geometry.getViewportHeight() / 2 - 100 + offset);
	//alert("xx " + xx);
	//alert("yy " + yy);
 	document.getElementById('wait').style.display = 'none';
 	document.getElementById('wait').style.left = xx;
	document.getElementById('wait').style.top = yy;
 	document.getElementById('wait').style.display = '';
	//document.getElementById('wait').style.visibility='visible';
}

function hideWait()
{
 	document.getElementById('wait').style.left = -200;
	document.getElementById('wait').style.top = -100;
}

function viewAutor(author, date)
{
	alert(author+", "+date);
}
function viewUserName(userName)
{
	alert(userName);
}