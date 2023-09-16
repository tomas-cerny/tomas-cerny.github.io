/**********************************************NAME***********************************************/

function fName()
{
	return navigator.appName;
}

/**********************************************VERSION***********************************************/

function fVersion()
{
	if(navigator.appName == "Netscape")
	{
		return parseFloat(navigator.appVersion.substring(0, navigator.appVersion.indexOf(" ")));
	}

	if(navigator.appName == "Microsoft Internet Explorer")
	{
		return parseFloat(navigator.appVersion.substring(navigator.appVersion.indexOf("MSIE ")+5, navigator.appVersion.length).substring(0, navigator.appVersion.substring(navigator.appVersion.indexOf("MSIE ")+5, navigator.appVersion.length).indexOf(";")));
	}

	return "I can't recognize your browser version";
}

/**********************************************PLATFORM***********************************************/

function fPlatform()
{
	if(navigator.appName == "Netscape")
	{
		if(navigator.appVersion.indexOf("] (") == -1)
			return navigator.appVersion.substring(navigator.appVersion.indexOf("(")+1, navigator.appVersion.indexOf(";"));
		else
			return navigator.appVersion.substring(navigator.appVersion.indexOf("] (")+3, navigator.appVersion.indexOf(";"));
	}

	return "I can't recognize your platform";
}

/*********************************************CONSTRUCTOR********************************************/

function Browser()
{
	this.name = fName;
	this.version = fVersion;
	this.platform = fPlatform;
}

var browser = new Browser();


function openNewWindow(windowName) {
	if(document.all) hSize = document.body.clientHeight + 120;
	else hSize = innerHeight + 115;
	descript = "menubar=no,personalbar=no,location=no,titlebar=no,scrollbars=yes,toolbar=no,status=no,width=780,height=" + hSize + ",resizable=yes,left=0,top=0";
	window.open("", windowName, descript);
}
/*********************************************RESIZE********************************************/
function resize(skola)
{
	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
	if(skola=="AMU"){
		y = y-185;
	}else{
		y = y-175;	
	}
    y = y+'px';
	document.getElementById("mainbody").style.height=y;

}

