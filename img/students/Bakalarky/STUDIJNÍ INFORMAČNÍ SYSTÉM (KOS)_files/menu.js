/*************************************************MENU CONSTRUCTOR******************************************/

function Menu(left, top, columnGap, toolbarHorGap, toolbarVerGap, arrowGap, arrowRightGap, arrowWidth, arrowHeight, timeIn, timeOut)
{
	//properties
	this.origWidth = (browser.name() == "Netscape") ? innerWidth : 0;
	this.origHeight = (browser.name() == "Netscape") ? innerHeight : 0;
	this.left = left;
	this.top = top;
	this.columnGap = columnGap;
	this.toolbarHorGap = toolbarHorGap;
	this.toolbarVerGap = toolbarVerGap;
	this.arrowGap = arrowGap;
	this.arrowRightGap = arrowRightGap;
	this.timeIn = timeIn;
	this.timeOut = timeOut;
	this.lastColumn;
	this.lastVisitedItem;
	this.lastVisitedMenu;
	this.lastIindex;
	this.blank = new Image(arrowWidth, arrowHeight);		//blank Image
	this.blank.src = "images/menu/blank.gif";
	this.arrow = new Image(arrowWidth, arrowHeight);		//arrow Image
	this.arrow.src = "images/menu/arrow.gif";
	this.stmo = -1;
	this.stmi = -1;
	this.iindex;
	this.cindex;
	this.iid;
	this.cid;
	this.toolbar = false;

	//collections
	this.columns = new Array();

	//methods
	this.add = fAdd;
	this.createMenu = fCreateMenu;
	this.writeMenu = fWriteMenu;
	this.joinMenu = fJoinMenu;
	this.sortMenu = fSortMenu;
	this.setStyle = fSetStyle;
	this.check = fCheck;
	this.hide = fHide;
	this.show = fShow;
	this.clearColumn = fClearColumn;
	this.clearItem = fClearItem;
	this.fillItem = fFillItem;
	this.hideAll = fHideAll;
	this.doMseOvr = fDoMseOvr;
	this.refresh = fRefresh;
}

/*********************************************COLUMN CONSTRUCTOR******************************************/

function Column(id)
{
	//properties
	this.id = id;
	this.parent;
	this.strightParent;
	this.left;
	this.top;
	this.width;
	this.visibility;

	//collections
	this.items = new Array();
}

/***********************************************ITEM CONSTRUCTOR*******************************************/

function Item(title, ref, itemType, selfId, normalBgColor, activeBgColor)
{
	//properties
	this.title = title;
	this.lowTitle;
	this.ref = ref;
	this.itemType = itemType;
	this.id = selfId;
	this.normalBgColor = normalBgColor;
	this.activeBgColor = activeBgColor;
	this.left;
	this.top;
	this.child;

	//methods
	this.mseOvr = fMseOvr;
	this.mseOut = fMseOut;
	this.mseMve = fMseMve;
	this.mseClick = fMseClick;
	this.replace = fReplace;
	this.setLowTitle = fSetLowTitle;

	this.setLowTitle();

	if(itemType == "img")
	{
		this.lowImage = new Image();
		this.lowImage.src = this.lowTitle;

		this.highImage = new Image();
		this.highImage.src = this.title;
	}
}

/*************************************************MENU.ADD*************************************************/

function fAdd(title, ref, itemType, selfId, parentId, normalBgColor, activeBgColor)
{
 	var i, tmp = 0;

	for(i=0; i<this.columns.length; i++)
		if(this.columns[i].id == parentId)	//do not create new column, column already exists
	  {
	  	this.columns[i].items[this.columns[i].items.length] = new Item(title, ref, itemType, selfId, normalBgColor, activeBgColor);
	 		tmp = 1;
			break;
		}

	if(tmp == 0)							//create new column, create new item
	{
		this.columns[this.columns.length] = new Column(parentId);
		this.columns[this.columns.length-1].items[this.columns[this.columns.length-1].items.length] = new Item(title, ref, itemType, selfId, normalBgColor, activeBgColor);
	}
}

/*************************************************MENU.CREATE*************************************************/

function fCreateMenu()
{
	if(this.columns.length > 0)
	{
		this.sortMenu();
		this.writeMenu();
	}
}

/*************************************************MENU.SORT*************************************************/

function fSortMenu()
{
	var sorted, i, j, buble;

	for(i=0; i<this.columns.length; i++)
	{
		sorted = 0;
		while(!sorted)
		{
			sorted = 1;
			for(j=0; j<this.columns[i].items.length-1; j++)
				if(this.columns[i].items[j].id > this.columns[i].items[j+1].id)
				{
					buble = this.columns[i].items[j];
					this.columns[i].items[j] = this.columns[i].items[j+1];
					this.columns[i].items[j+1] = buble;
					sorted=0;
				}
		}
	}
}

/*************************************************MENU.WRITE*************************************************/

function fWriteMenu()
{
	var nname, aname, i, j;
///////////////////////////////////////////////////NETSCAPE//////////////////////////////////////////////
	if(browser.name() == "Netscape")
	{
//////////////////////////////////////////////////NETSCAPE 4.X//////////////////////////////////////////////
		if(browser.version() < 5)
		{
			for(i=0; i<this.columns.length; i++)
			{
////////////////////////////////////////////////////toolbar/////////////////////////////////////////////
				if(this.columns[i].id == -1)
				{
					for(j=0; j<this.columns[i].items.length; j++)
					{
						nname = "menu"+this.columns[i].id+"item"+this.columns[i].items[j].id+"normal";
						aname = "menu"+this.columns[i].id+"item"+this.columns[i].items[j].id+"active";

						if(this.columns[i].items[j].itemType == "img")
						{
							document.write("<span class=\"toolbarhigh\" id=\""+aname+"\"><span class=\"picture\" id=\""+aname+"text\"><img src=\""+this.columns[i].items[j].title+"\"></span></span>");
							document.write("<span class=\"toolbarlow\" id=\""+nname+"\"><span class=\"picture\" id=\""+nname+"text\"><img src=\""+this.columns[i].items[j].lowTitle+"\"></span></span>");
						}
						else
						{
							document.write("<span class=\"toolbarhigh\" id=\""+aname+"\"><span class=\"menuToolbarNew activeToolbar\" id=\""+aname+"text\">"+this.columns[i].items[j].title+"</span></span>");
							document.write("<span class=\"toolbarlow\" id=\""+nname+"\"><span class=\"menuToolbarNew normalToolbar\" id=\""+nname+"text\">"+this.columns[i].items[j].title+"</span></span>");
						}

						document.layers[aname].iid = this.columns[i].items[j].id;
						document.layers[aname].cid = this.columns[i].id;
						document.layers[aname].url = this.columns[i].items[j].ref;
						document.layers[aname].iindex = j;
						document.layers[aname].cindex = i;

						document.layers[aname].onmouseover = this.columns[i].items[j].mseOvr;
						document.layers[aname].onmouseout =  this.columns[i].items[j].mseOut;
						document.layers[aname].captureEvents(Event.MOUSEMOVE);
						document.layers[aname].onmousemove =  this.columns[i].items[j].mseMve;
						document.layers[aname].captureEvents(Event.MOUSEDOWN);
						document.layers[aname].onmousedown =  this.columns[i].items[j].mseClick;

						document.layers[nname].iid = this.columns[i].items[j].id;
						document.layers[nname].cid = this.columns[i].id;
						document.layers[nname].url = this.columns[i].items[j].ref;
						document.layers[nname].iindex = j;
						document.layers[nname].cindex = i;

						document.layers[nname].onmouseover = this.columns[i].items[j].mseOvr;
						document.layers[nname].onmouseout =  this.columns[i].items[j].mseOut;
						document.layers[nname].captureEvents(Event.MOUSEMOVE);
						document.layers[nname].onmousemove =  this.columns[i].items[j].mseMve;
						document.layers[nname].captureEvents(Event.MOUSEDOWN);
						document.layers[nname].onmousedown =  this.columns[i].items[j].mseClick;
					}
				}
////////////////////////////////////////////////////column/////////////////////////////////////////////
				else
				{
					for(j=0; j<this.columns[i].items.length; j++)
					{
						nname = "menu"+this.columns[i].id+"item"+this.columns[i].items[j].id+"normal";
						aname = "menu"+this.columns[i].id+"item"+this.columns[i].items[j].id+"active";

						if(this.columns[i].items[j].itemType == "img")
						{
							document.write("<span class=\"columnhigh\" id=\""+aname+"\"><span class=\"picture\" id=\""+aname+"text\"><img src=\""+this.columns[i].items[j].title+"\"></span><span class=\"arrow\" id=\""+aname+"picture\"><img name=\""+aname+"image\" width=\""+this.arrow.width+"\" height=\""+this.arrow.height+"\"></span></span>");
							document.write("<span class=\"columnlow\" id=\""+nname+"\"><span class=\"picture\" id=\""+nname+"text\"><img src=\""+this.columns[i].items[j].lowTitle+"\"></span><span class=\"arrow\" id=\""+nname+"picture\"><img name=\""+nname+"image\" width=\""+this.arrow.width+"\" height=\""+this.arrow.height+"\"></span></span>");
						}
						else
						{
							document.write("<span class=\"columnhigh\" id=\""+aname+"\"><span class=\"activeColumn\" id=\""+aname+"text\">"+this.columns[i].items[j].title+"</span><span class=\"arrow\" id=\""+aname+"picture\"><img name=\""+aname+"image\" width=\""+this.arrow.width+"\" height=\""+this.arrow.height+"\"></span></span>");
							document.write("<span class=\"columnlow\" id=\""+nname+"\"><span class=\"normalColumn\" id=\""+nname+"text\">"+this.columns[i].items[j].title+"</span><span class=\"arrow\" id=\""+nname+"picture\"><img name=\""+nname+"image\" width=\""+this.arrow.width+"\" height=\""+this.arrow.height+"\"></span></span>");
						}

						document.layers[aname].iid = this.columns[i].items[j].id;
						document.layers[aname].cid = this.columns[i].id;
						document.layers[aname].url = this.columns[i].items[j].ref;
						document.layers[aname].iindex = j;
						document.layers[aname].cindex = i;

						document.layers[aname].onmouseover = this.columns[i].items[j].mseOvr;
						document.layers[aname].onmouseout =  this.columns[i].items[j].mseOut;
						document.layers[aname].captureEvents(Event.MOUSEMOVE);
						document.layers[aname].onmousemove =  this.columns[i].items[j].mseMve;
						document.layers[aname].captureEvents(Event.MOUSEDOWN);
						document.layers[aname].onmousedown =  this.columns[i].items[j].mseClick;

						document.layers[nname].iid = this.columns[i].items[j].id;
						document.layers[nname].cid = this.columns[i].id;
						document.layers[nname].url = this.columns[i].items[j].ref;
						document.layers[nname].iindex = j;
						document.layers[nname].cindex = i;

						document.layers[nname].onmouseover = this.columns[i].items[j].mseOvr;
						document.layers[nname].onmouseout =  this.columns[i].items[j].mseOut;
						document.layers[nname].captureEvents(Event.MOUSEMOVE);
						document.layers[nname].onmousemove =  this.columns[i].items[j].mseMve;
						document.layers[nname].captureEvents(Event.MOUSEDOWN);
						document.layers[nname].onmousedown =  this.columns[i].items[j].mseClick;
					}
				}
			}
		}
///////////////////////////////////////////////NETSCAPE 6////////////////////////////////////////////////
		else
		{
			for(i=0; i<this.columns.length; i++)
			{
////////////////////////////////////////////////////toolbar/////////////////////////////////////////////
				if(this.columns[i].id == -1)
				{
					for(j=0; j<this.columns[i].items.length; j++)
					{
						nname = "menu"+this.columns[i].id+"item"+this.columns[i].items[j].id+"normal";

						if(this.columns[i].items[j].itemType == "img")
						{
							document.write("<span class=\"toolbarlow\" id=\""+nname+"\"><span class=\"picture\" id=\""+nname+"text\"><img name=\""+nname+"mainimage\" src=\""+this.columns[i].items[j].lowTitle+"\"></span></span>");
						}
						else
						{
							document.write("<span class=\"toolbarlow\" id=\""+nname+"\"><span class=\"menuToolbarNew normalToolbar\" id=\""+nname+"text\">"+this.columns[i].items[j].title+"</span></span>");
						}

						document.getElementById(nname).iid = this.columns[i].items[j].id;
						document.getElementById(nname).cid = this.columns[i].id;
						document.getElementById(nname).url = this.columns[i].items[j].ref;
						document.getElementById(nname).iindex = j;
						document.getElementById(nname).cindex = i;

						document.getElementById(nname).onmouseover = this.columns[i].items[j].mseOvr;
						document.getElementById(nname).onmouseout =  this.columns[i].items[j].mseOut;
						document.getElementById(nname).onmousemove =  this.columns[i].items[j].mseMve;
						document.getElementById(nname).onmousedown =  this.columns[i].items[j].mseClick;
					}
				}
////////////////////////////////////////////////////column/////////////////////////////////////////////
				else
				{
					for(j=0; j<this.columns[i].items.length; j++)
					{
						nname = "menu"+this.columns[i].id+"item"+this.columns[i].items[j].id+"normal";

						if(this.columns[i].items[j].itemType == "img")
						{
							document.write("<span class=\"columnlow\" id=\""+nname+"\"><span class=\"picture\" id=\""+nname+"text\"><img name=\""+nname+"mainimage\" src=\""+this.columns[i].items[j].lowTitle+"\"></span><span class=\"arrow\" id=\""+nname+"picture\"><img name=\""+nname+"image\" width=\""+this.arrow.width+"\" height=\""+this.arrow.height+"\"></span></span>");
						}
						else
						{
							document.write("<span class=\"columnlow\" id=\""+nname+"\"><span class=\"normalColumn\" id=\""+nname+"text\">"+this.columns[i].items[j].title+"</span><span class=\"arrow\" id=\""+nname+"picture\"><img name=\""+nname+"image\" width=\""+this.arrow.width+"\" height=\""+this.arrow.height+"\"></span></span>");
						}

						document.getElementById(nname).iid = this.columns[i].items[j].id;
						document.getElementById(nname).cid = this.columns[i].id;
						document.getElementById(nname).url = this.columns[i].items[j].ref;
						document.getElementById(nname).iindex = j;
						document.getElementById(nname).cindex = i;

						document.getElementById(nname).onmouseover = this.columns[i].items[j].mseOvr;
						document.getElementById(nname).onmouseout =  this.columns[i].items[j].mseOut;
						document.getElementById(nname).onmousemove =  this.columns[i].items[j].mseMve;
						document.getElementById(nname).onmousedown =  this.columns[i].items[j].mseClick;
					}
				}
			}
		}
	}
////////////////////////////////////////////////EXPLORER////////////////////////////////////////////////
	else
	{
		for(i=0; i<this.columns.length; i++)
		{
////////////////////////////////////////////////////toolbar/////////////////////////////////////////////
			if(this.columns[i].id == -1)
			{
				for(j=0; j<this.columns[i].items.length; j++)
				{
					nname = "menu"+this.columns[i].id+"item"+this.columns[i].items[j].id+"normal";

					if(this.columns[i].items[j].itemType == "img")
					{
						document.write("<span class=\"toolbarlow\" id=\""+nname+"\"><span class=\"picture\" id=\""+nname+"text\"><img name=\""+nname+"mainimage\" src=\""+this.columns[i].items[j].lowTitle+"\"></span></span>");
					}
					else
					{
						if(browser.version() < 5)
							this.columns[i].items[j].replace();

						document.write("<span class=\"toolbarlow\" id=\""+nname+"\"><span class=\"menuToolbarNew normalToolbar\" id=\""+nname+"text\">"+this.columns[i].items[j].title+"</span></span>");
					}

					document.all[nname].iid = this.columns[i].items[j].id;
					document.all[nname].cid = this.columns[i].id;
					document.all[nname].url = this.columns[i].items[j].ref;
					document.all[nname].iindex = j;
					document.all[nname].cindex = i;

					document.all[nname].onmouseover = this.columns[i].items[j].mseOvr;
					document.all[nname].onmouseout =  this.columns[i].items[j].mseOut;
					document.all[nname].onmousemove =  this.columns[i].items[j].mseMve;
					document.all[nname].onmousedown =  this.columns[i].items[j].mseClick;
				}
			}
////////////////////////////////////////////////////column/////////////////////////////////////////////
			else
			{
				for(j=0; j<this.columns[i].items.length; j++)
				{
					nname = "menu"+this.columns[i].id+"item"+this.columns[i].items[j].id+"normal";

					if(this.columns[i].items[j].itemType == "img")
					{
						document.write("<span class=\"columnlow\" id=\""+nname+"\"><span class=\"picture\" id=\""+nname+"text\"><img name=\""+nname+"mainimage\" src=\""+this.columns[i].items[j].lowTitle+"\"></span><span class=\"arrow\" id=\""+nname+"picture\"><img name=\""+nname+"image\" width=\""+this.arrow.width+"\" height=\""+this.arrow.height+"\"></span></span>");
					}
					else
					{
						if(browser.version() < 5)
							this.columns[i].items[j].replace();

						document.write("<span class=\"columnlow\" id=\""+nname+"\"><span class=\"normalColumn\" id=\""+nname+"text\">"+this.columns[i].items[j].title+"</span><span class=\"arrow\" id=\""+nname+"picture\"><img name=\""+nname+"image\" width=\""+this.arrow.width+"\" height=\""+this.arrow.height+"\"></span></span>");
					}

					document.all[nname].iid = this.columns[i].items[j].id;
					document.all[nname].cid = this.columns[i].id;
					document.all[nname].url = this.columns[i].items[j].ref;
					document.all[nname].iindex = j;
					document.all[nname].cindex = i;

					document.all[nname].onmouseover = this.columns[i].items[j].mseOvr;
					document.all[nname].onmouseout =  this.columns[i].items[j].mseOut;
					document.all[nname].onmousemove =  this.columns[i].items[j].mseMve;
 					document.all[nname].onmousedown =  this.columns[i].items[j].mseClick;
				}
			}
		}
	}
}

/*************************************************MENU.JOIN*************************************************/

function fJoinMenu(columnId)
{
	var emptyCol = true;
	var i, j, index, br = 0;
	var nname, aname;

	for(i=0; i<this.columns.length; i++)								//find specified column
		if(this.columns[i].id == columnId)								//founded
		{
			this.columns[i].parent = this.lastColumn;					//set parent
			this.columns[i].strightParent = this.lastItem;				//set strightParent
			index = i;
			break;
		}

	this.setStyle(columnId, index);

///////////////////////////////////////////////////NETSCAPE/////////////////////////////////////////////////////
	if(browser.name() == "Netscape")
	{
//////////////////////////////////////////////////NETSCAPE 4.X/////////////////////////////////////////////////////
		if(browser.version() < 5)
		{
			for(i=0; i<this.columns[index].items.length; i++)					//for each item in actual column
			{
				for(j=0; j<this.columns.length; j++)							//try to find child-column
				{
					if(this.columns[index].items[i].id == this.columns[j].id)		//founded
					{
						emptyCol = false;
						if(this.columns[index].id != -1)
						{
							//set arrow image
							nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";
							aname = "menu"+columnId+"item"+this.columns[index].items[i].id+"active";
							document.layers[nname].document.layers[nname+"picture"].document.images[nname+"image"].src = this.arrow.src;
							document.layers[aname].document.layers[aname+"picture"].document.images[aname+"image"].src = this.arrow.src;
						}

						this.lastColumn = this.columns[index];
						this.lastItem = this.columns[index].items[i];			//set strightChild
						this.columns[index].items[i].child = this.columns[j];		//set child
						this.joinMenu(this.columns[j].id);							//rekurze
						br = 1;
						break;
					}
				}
				if(br == 0 && this.columns[index].id != -1)
				{
					//set blank image
					nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";
					aname = "menu"+columnId+"item"+this.columns[index].items[i].id+"active";
					document.layers[nname].document.layers[nname+"picture"].document.images[nname+"image"].src = this.blank.src;
					document.layers[aname].document.layers[aname+"picture"].document.images[aname+"image"].src = this.blank.src;

				}
				br = 0;
			}
			if(emptyCol == true)
			{
				for(i=0; i<this.columns[index].items.length; i++)
				{
					nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";
					aname = "menu"+columnId+"item"+this.columns[index].items[i].id+"active";
					document.layers[nname].clip.width = this.columns[index].width - menu.arrowGap - menu.arrow.width - menu.arrowRightGap;
					document.layers[aname].clip.width = this.columns[index].width - menu.arrowGap - menu.arrow.width - menu.arrowRightGap;
				}
			}
		}
////////////////////////////////////////////////////NETSCAPE 6/////////////////////////////////////////////////////
		else
		{
			for(i=0; i<this.columns[index].items.length; i++)					//for each item in actual column
			{
				for(j=0; j<this.columns.length; j++)							//try to find child-column
				{
					if(this.columns[index].items[i].id == this.columns[j].id)		//founded
					{
						emptyCol = false;
						if(this.columns[index].id != -1)
						{
							//set arrow image
							nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";
							document.images[nname+"image"].src = this.arrow.src;
						}

						this.lastColumn = this.columns[index];
						this.lastItem = this.columns[index].items[i];			//set strightChild
						this.columns[index].items[i].child = this.columns[j];		//set child
						this.joinMenu(this.columns[j].id);							//rekurze
						br = 1;
						break;
					}
				}
				if(br == 0 && this.columns[index].id != -1)
				{
					//set blank image
					nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";
					document.images[nname+"image"].src = this.blank.src;
				}
				br = 0;
			}
			if(emptyCol == true)
			{
				for(i=0; i<this.columns[index].items.length; i++)
				{
					nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";
					document.getElementById(nname).style.width = this.columns[index].width - menu.arrowGap - menu.arrow.width - menu.arrowRightGap;
				}
			}
		}
	}
//////////////////////////////////////////////////////EXPLORER//////////////////////////////////////////////////////
	else
	{
		for(i=0; i<this.columns[index].items.length; i++)					//for each item in actual column
		{
			for(j=0; j<this.columns.length; j++)							//try to find child-column
			{
				if(this.columns[index].items[i].id == this.columns[j].id)		//founded
				{
					emptyCol = false;
					if(this.columns[index].id != -1)
					{
						//set arrow image
						nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";
						document.images[nname+"image"].src = this.arrow.src;
					}

					this.lastColumn = this.columns[index];
					this.lastItem = this.columns[index].items[i];			//set strightChild
					this.columns[index].items[i].child = this.columns[j];		//set child
					this.joinMenu(this.columns[j].id);							//rekurze
					br = 1;
					break;
				}
			}
			if(br == 0 && this.columns[index].id != -1)
			{
				//set blank image
				nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";
				document.images[nname+"image"].src = this.blank.src;
			}
			br = 0;
		}
		if(emptyCol == true)
		{
			for(i=0; i<this.columns[index].items.length; i++)
			{
				nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";
				document.all[nname].style.width = this.columns[index].width - menu.arrowGap - menu.arrow.width - menu.arrowRightGap;
			}
		}
	}
}

/***********************************************MENU.SET STYLE*************************************************/

function fSetStyle(columnId, index)
{
	var i, aname, nname, maxLen = 0, tempWidth = 0;

////////////////////////////////////////////////NETSCAPE//////////////////////////////////////////////////
	if(browser.name() == "Netscape")
	{
///////////////////////////////////////////////NETSCAPE 4.X////////////////////////////////////////////
		if(browser.version() < 5)
		{
/////////////////////////////////////////////////toolbar////////////////////////////////////////////
			if(columnId == -1)
			{
				//column left, top setting
				this.columns[index].left = this.left;
				this.columns[index].top = this.top;

				//width, height, left, top setting
				for(i=0; i<this.columns[index].items.length; i++)
				{
					aname = "menu"+columnId+"item"+this.columns[index].items[i].id+"active";
					nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";

					this.columns[index].items[i].left = this.left + tempWidth;
					this.columns[index].items[i].top =  this.top;
					this.columns[index].width = document.layers[aname].document.layers[aname+"text"].left + document.layers[aname].document.layers[aname+"text"].clip.width + document.layers[aname].document.layers[aname+"text"].left;

					document.layers[aname].clip.width = this.columns[index].width;
					document.layers[aname].left = this.columns[index].items[i].left;
					document.layers[aname].top = this.columns[index].items[i].top;
					document.layers[aname].bgColor = this.columns[index].items[i].activeBgColor;
					document.layers[aname].document.layers[aname+"text"].top = (document.layers[aname].clip.height - document.layers[aname].document.layers[aname+"text"].clip.height) / 2;

					document.layers[nname].clip.width = this.columns[index].width;
					document.layers[nname].left = this.columns[index].items[i].left;
					document.layers[nname].top = this.columns[index].items[i].top;
					document.layers[nname].bgColor = this.columns[index].items[i].normalBgColor;
					document.layers[nname].document.layers[nname+"text"].top = (document.layers[nname].clip.height - document.layers[nname].document.layers[nname+"text"].clip.height) / 2;

					tempWidth = tempWidth + this.columns[index].width;
				}
			}
/////////////////////////////////////////////////collumn////////////////////////////////////////////
			else
			{
				//width preparing
				for(i=0; i<this.columns[index].items.length; i++)
				{
					aname = "menu"+columnId+"item"+this.columns[index].items[i].id+"active";
					if(document.layers[aname].document.layers[aname+"text"].clip.width > maxLen)
						maxLen = document.layers[aname].document.layers[aname+"text"].clip.width;
				}
				this.columns[index].width = document.layers[aname].document.layers[aname+"text"].left + maxLen + document.layers[aname].document.layers[aname+"text"].left + this.arrowGap + this.arrow.width + this.arrowRightGap;

				//column left, top setting
				if(this.columns[index].parent.id == -1)
				{
					this.columns[index].left = this.columns[index].strightParent.left + this.toolbarVerGap;
					this.columns[index].top = this.columns[index].parent.top + document.layers["menu-1item"+this.columns[index].strightParent.id+"active"].clip.height + this.toolbarHorGap;
				}
				else
				{
					this.columns[index].left = this.columns[index].parent.left + this.columns[index].parent.width + this.columnGap;
					this.columns[index].top = this.columns[index].strightParent.top;
				}

				//width, height, left, top setting
				for(i=0; i<this.columns[index].items.length; i++)
				{
					aname = "menu"+columnId+"item"+this.columns[index].items[i].id+"active";
					nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";

					this.columns[index].items[i].left = this.columns[index].left;
					this.columns[index].items[i].top =  this.columns[index].top + i *  document.layers[aname].clip.height;

					document.layers[aname].clip.width = this.columns[index].width;
					document.layers[aname].left = this.columns[index].items[i].left;
					document.layers[aname].top = this.columns[index].items[i].top;
					document.layers[aname].bgColor = this.columns[index].items[i].activeBgColor;
					document.layers[aname].document.layers[aname+"picture"].left = this.columns[index].width - this.arrow.width - this.arrowRightGap;
					document.layers[aname].document.layers[aname+"picture"].top = (document.layers[aname].clip.height - this.arrow.height) /2;
					document.layers[aname].document.layers[aname+"text"].top = (document.layers[aname].clip.height - document.layers[aname].document.layers[aname+"text"].clip.height) /2;

					document.layers[nname].clip.width = this.columns[index].width;
					document.layers[nname].left = this.columns[index].items[i].left;
					document.layers[nname].top = this.columns[index].items[i].top;
					document.layers[nname].bgColor = this.columns[index].items[i].normalBgColor;
					document.layers[nname].document.layers[nname+"picture"].left = this.columns[index].width - this.arrow.width - this.arrowRightGap;
					document.layers[nname].document.layers[nname+"picture"].top = (document.layers[nname].clip.height - this.arrow.height) /2;
					document.layers[nname].document.layers[nname+"text"].top = (document.layers[nname].clip.height - document.layers[nname].document.layers[nname+"text"].clip.height) /2;
				}
			}
		}
///////////////////////////////////////////////NETSCAPE 6//////////////////////////////////////////////////
		else
		{
/////////////////////////////////////////////////toolbar////////////////////////////////////////////
			if(columnId == -1)
			{
				//column left, top setting
				this.columns[index].left = this.left;
				this.columns[index].top = this.top;

				//width, height, left, top setting
				for(i=0; i<this.columns[index].items.length; i++)
				{
					nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";

					this.columns[index].items[i].left = this.left + tempWidth;
					this.columns[index].items[i].top =  this.top;
					this.columns[index].width = document.getElementById(nname+"text").offsetLeft + document.getElementById(nname+"text").offsetWidth + document.getElementById(nname+"text").offsetLeft;

					document.getElementById(nname).style.width = this.columns[index].width;
					document.getElementById(nname).style.left = this.columns[index].items[i].left;
					document.getElementById(nname).style.top = this.columns[index].items[i].top;
					document.getElementById(nname).style.backgroundColor = this.columns[index].items[i].normalBgColor;
					document.getElementById(nname+"text").style.top = (document.getElementById(nname).offsetHeight - document.getElementById(nname+"text").offsetHeight) / 2;

					tempWidth = tempWidth + this.columns[index].width;
				}
			}
/////////////////////////////////////////////////column////////////////////////////////////////////
			else
			{
				//width preparing
				for(i=0; i<this.columns[index].items.length; i++)
				{
					nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";

					if(document.getElementById(nname+"text").offsetWidth > maxLen)
						maxLen = document.getElementById(nname+"text").offsetWidth;
				}
				this.columns[index].width = document.getElementById(nname+"text").offsetLeft + maxLen + document.getElementById(nname+"text").offsetLeft + this.arrowGap + this.arrow.width + this.arrowRightGap;

				//column left, top setting
				if(this.columns[index].parent.id == -1)
				{
					this.columns[index].left = this.columns[index].strightParent.left + this.toolbarVerGap;
					this.columns[index].top = this.columns[index].parent.top +  document.getElementById("menu-1item"+this.columns[index].strightParent.id+"normal").offsetHeight + this.toolbarHorGap;
				}
				else
				{
					this.columns[index].left = this.columns[index].parent.left + this.columns[index].parent.width + this.columnGap;
					this.columns[index].top = this.columns[index].strightParent.top;
				}

				//width, height, left, top setting
				for(i=0; i<this.columns[index].items.length; i++)
				{
					nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";

					this.columns[index].items[i].left = this.columns[index].left;
					this.columns[index].items[i].top =  this.columns[index].top + i * document.getElementById(nname).offsetHeight;

					document.getElementById(nname).style.width = this.columns[index].width;
					document.getElementById(nname).style.left = this.columns[index].items[i].left;
					document.getElementById(nname).style.top = this.columns[index].items[i].top;
					document.getElementById(nname).style.backgroundColor = this.columns[index].items[i].normalBgColor;
					document.getElementById(nname+"picture").style.left = this.columns[index].width - this.arrow.width - this.arrowRightGap;
					document.getElementById(nname+"picture").style.top = (document.getElementById(nname).offsetHeight - this.arrow.height) /2;
					document.getElementById(nname+"text").style.top = (document.getElementById(nname).offsetHeight - document.getElementById(nname+"text").offsetHeight) /2;
				}
			}

		}
	}
////////////////////////////////////////////////EXPLORER//////////////////////////////////////////////////
	else
	{
/////////////////////////////////////////////////toolbar////////////////////////////////////////////
		if(columnId == -1)
		{
			//column left, top setting
			this.columns[index].left = this.left;
			this.columns[index].top = this.top;

			//width, height, left, top setting
	 		for(i=0; i<this.columns[index].items.length; i++)
			{
				nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";

				this.columns[index].items[i].left = this.left + tempWidth;
				this.columns[index].items[i].top =  this.top;
				this.columns[index].width = document.all[nname+"text"].offsetLeft + document.all[nname+"text"].offsetWidth + document.all[nname+"text"].offsetLeft;

				document.all[nname].style.width = this.columns[index].width;
				document.all[nname].style.left = this.columns[index].items[i].left;
				document.all[nname].style.top = this.columns[index].items[i].top;
				document.all[nname].style.backgroundColor = this.columns[index].items[i].normalBgColor;
				document.all[nname+"text"].style.top = (document.all[nname].offsetHeight - document.all[nname+"text"].offsetHeight) / 2;

				tempWidth = tempWidth + this.columns[index].width;
			}
		}
/////////////////////////////////////////////////column////////////////////////////////////////////
		else
		{
			//width preparing
	 		for(i=0; i<this.columns[index].items.length; i++)
			{
				nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";

				if(document.all[nname+"text"].offsetWidth > maxLen)
					maxLen = document.all[nname+"text"].offsetWidth;
			}
			this.columns[index].width = document.all[nname+"text"].offsetLeft + maxLen + document.all[nname+"text"].offsetLeft + this.arrowGap + this.arrow.width + this.arrowRightGap;

			//column left, top setting
			if(this.columns[index].parent.id == -1)
			{
				this.columns[index].left = this.columns[index].strightParent.left + this.toolbarVerGap;
				this.columns[index].top = this.columns[index].parent.top +  document.all["menu-1item"+this.columns[index].strightParent.id+"normal"].offsetHeight + this.toolbarHorGap;
			}
			else
			{
				this.columns[index].left = this.columns[index].parent.left + this.columns[index].parent.width + this.columnGap;
				this.columns[index].top = this.columns[index].strightParent.top;
			}

			//width, height, left, top setting
	 		for(i=0; i<this.columns[index].items.length; i++)
			{
				nname = "menu"+columnId+"item"+this.columns[index].items[i].id+"normal";

				this.columns[index].items[i].left = this.columns[index].left;
				this.columns[index].items[i].top =  this.columns[index].top + i * document.all[nname].offsetHeight;

				document.all[nname].style.width = this.columns[index].width;
				document.all[nname].style.left = this.columns[index].items[i].left;
				document.all[nname].style.top = this.columns[index].items[i].top;
				document.all[nname].style.backgroundColor = this.columns[index].items[i].normalBgColor;
				document.all[nname+"picture"].style.left = this.columns[index].width - this.arrow.width - this.arrowRightGap;
				document.all[nname+"picture"].style.top = (document.all[nname].offsetHeight - this.arrow.height) /2;
				document.all[nname+"text"].style.top = (document.all[nname].offsetHeight - document.all[nname+"text"].offsetHeight) /2;
			}
		}
	}
}

/********************************************ITEM.SETLOWTITLE***************************************************/

function fSetLowTitle()
{
	var slashPos, underscorePos, pointPos;

	slashPos = this.title.lastIndexOf("/");
	underscorePos = this.title.indexOf("_", slashPos);
	pointPos = this.title.indexOf(".", underscorePos);

	this.lowTitle = this.title.substring(0, underscorePos) + this.title.substring(pointPos, this.title.length);
}

/********************************************ITEM.MOUSEOVER*******************************************/

function fMseOvr()
{
	menu.toolbar = true;
	menu.iindex = this.iindex;
	menu.cindex = this.cindex;
	menu.iid = this.iid;
	menu.cid = this.cid;

	if(menu.lastVisitedMenu == null)
		menu.stmi = setTimeout("menu.doMseOvr();", menu.timeIn);
	else menu.doMseOvr();
}

/**********************************************MENU.DOMSEOVR******************************************/

function fDoMseOvr()
{
	var i;
/////////////////////////////////////////////////delete/////////////////////////////////////////////////

	if(this.lastVisitedMenu != null)			//not first case
	{
		if(this.iid == this.lastVisitedItem.id)
			return;

		if(this.cid != this.lastVisitedMenu.id)		//menu change, hide all children
		{
			this.clearColumn(this.cindex);
			this.check(this.cindex);
		}
		else									//the same menu
		{
			if(this.lastVisitedItem.child != null)
				for(i=0; i<this.columns.length; i++)
					if(this.columns[i].id == this.lastVisitedItem.child.id)
					{
						this.hide(i);
						break;
					}

			this.clearItem(this.cindex, this.lastIindex);
		}
	}

/////////////////////////////////////////////////create/////////////////////////////////////////////////

	this.fillItem(this.cindex, this.iindex);

	if(this.columns[this.cindex].items[this.iindex].child != null)
	{
		for(i=0; i<this.columns.length; i++)
			if(this.columns[i].id == this.columns[this.cindex].items[this.iindex].child.id)
			{
				this.show(i);
				break;
			}
	}

//////////////////////////////////////////////////backup////////////////////////////////////////////////

	this.lastVisitedItem = this.columns[this.cindex].items[this.iindex];
	this.lastVisitedMenu = this.columns[this.cindex];
	this.lastIindex = this.iindex;
}

/********************************************ITEM.MOUSEOUT*********************************************/

function fMseOut()
{
	if(menu.stmi != -1)
	{
		clearTimeout(menu.stmi);
		menu.stmi = -1;
	}
	menu.toolbar = false;
	menu.stmo = setTimeout("menu.hideAll()",menu.timeOut);
}

/********************************************ITEM.MOUSEMOVE*******************************************/

function fMseMve()
{
	if(menu.stmo != -1)
	{
		clearTimeout(menu.stmo);
		menu.stmo = -1;
	}
	return false;
}

/********************************************ITEM.MOUSECLICK*******************************************/

function fMseClick()
{
	if(this.url == "")
	{
		menu.toolbar = true;
		if(this.cid == -1)
		{
			menu.cid = this.cid;
			menu.iid = this.iid;
			menu.iindex = this.iindex;
			menu.cindex = this.cindex;

			menu.doMseOvr();
		}
	}
	else
	{
		var js = "javascript:";
		var sUrl = this.url;
		if(sUrl.length > js.length && sUrl.substring(0, js.length) == js)
		{
			sUrl = sUrl.substring(js.length);
			eval(sUrl);
		}
		else
		{
			window.location.href = this.url;
		}
	}

	return false;
}

/**********************************************MENU.CHECK*******************************************/

function fCheck(cindex)
{
	var i, j, index;

	for(i=0; i<this.columns[cindex].items.length; i++)		//for all items in specified column
	{
		if(this.columns[cindex].items[i].child != null && this.columns[cindex].items[i].child.visibility == true)	//founded
		{
			for(j=0; j<this.columns.length; j++)
				if(this.columns[j].id == this.columns[cindex].items[i].child.id)
				{
					this.hide(j);
					this.clearColumn(j);
					this.check(j);
					break;
				}
			break;
		}
	}
}

/***********************************************MENU.HIDE**********************************************/

function fHide(cindex)
{
	var i;

	if(browser.name() =="Netscape")		//Netscape
	{
		if(browser.version() < 5)		//Netscape 4.X
		{
			for(i=0; i<this.columns[cindex].items.length; i++)
				document.layers["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[i].id+"normal"].visibility="hide";
		}
		else		//Netscape 6
		{
			for(i=0; i<this.columns[cindex].items.length; i++)
				document.getElementById("menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[i].id+"normal").style.visibility="hidden";
		}
	}
	else	//Explorer
	{
		for(i=0; i<this.columns[cindex].items.length; i++)
			document.all["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[i].id+"normal"].style.visibility="hidden";
	}

	this.columns[cindex].visibility = false;
}

/***********************************************MENU.SHOW**********************************************/

function fShow(cindex)
{
	var i;

	if(browser.name() =="Netscape")		//Netscape
	{
		if(browser.version() < 5)		//Netscape 4.X
		{
			for(i=0; i<this.columns[cindex].items.length; i++)
				document.layers["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[i].id+"normal"].visibility="show";
		}
		else		//Netscape 6
		{
			for(i=0; i<this.columns[cindex].items.length; i++)
				document.getElementById("menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[i].id+"normal").style.visibility="visible";
		}
	}
	else	//Explorer
	{
		for(i=0; i<this.columns[cindex].items.length; i++)
			document.all["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[i].id+"normal"].style.visibility="visible";
	}

	this.columns[cindex].visibility = true;
}

/**********************************************MENU.HIDEALL*********************************************/

function fHideAll()
{
	if(menu.toolbar == false)
	{
		for(i=0; i<menu.columns.length; i++)
		{
			this.clearColumn(i);
			if(this.columns[i].id != -1)
				this.hide(i);
		}
		this.lastVisitedMenu = null;
	}
	else
		menu.toolbar = false;
}

/**********************************************MENU.REFRESH*********************************************/

function fRefresh()
{
	if(browser.name() == "Netscape" && browser.version() < 5)
	{
		if (innerWidth != menu.origWidth || innerHeight != menu.origHeight)
		{
           menu.origWidth = innerWidth;
           menu.origHeight = innerHeight;
		   window.location.reload();
		}
	}
}

/********************************************MENU.CLEARCOLUMN*******************************************/

function fClearColumn(cindex)
{
	var i;

	for(i=0; i<this.columns[cindex].items.length; i++)
		this.clearItem(cindex, i);

}

/**********************************************MENU.CLEARITEM*******************************************/

function fClearItem(cindex, iindex)
{
	if(browser.name() == "Netscape")		//Netscape
	{
		if(browser.version() < 5)		//Netscape 4.X
		{
			document.layers["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"active"].visibility = "hide";
		}
		else			//Netscape 6
		{
			//alert("Not yet implemented");
			if(this.columns[cindex].id == -1)	//toolbar
			{
				if(this.columns[cindex].items[iindex].itemType == "img")
					document.images["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normalmainimage"].src = this.columns[cindex].items[iindex].lowImage.src;
				else
					document.getElementById("menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normaltext").className = "menuToolbarNew normalToolbar";

				document.getElementById("menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normal").style.backgroundColor = this.columns[cindex].items[iindex].normalBgColor;
			}
			else	//column
			{
				if(this.columns[cindex].items[iindex].itemType == "img")
					document.images["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normalmainimage"].src = this.columns[cindex].items[iindex].lowImage.src;
				else
					document.getElementById("menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normaltext").className = "normalColumn";

				document.getElementById("menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normal").style.backgroundColor = this.columns[cindex].items[iindex].normalBgColor;
			}
		}
	}
	else	//Explorer
	{
		if(this.columns[cindex].id == -1)	//toolbar
		{
			if(this.columns[cindex].items[iindex].itemType == "img")
				document.images["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normalmainimage"].src = this.columns[cindex].items[iindex].lowImage.src;
			else
				document.all["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normaltext"].className = "menuToolbarNew normalToolbar";

			document.all["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normal"].style.backgroundColor = this.columns[cindex].items[iindex].normalBgColor;
		}
		else	//column
		{
			if(this.columns[cindex].items[iindex].itemType == "img")
				document.images["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normalmainimage"].src = this.columns[cindex].items[iindex].lowImage.src;
			else
				document.all["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normaltext"].className = "normalColumn";

			document.all["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normal"].style.backgroundColor = this.columns[cindex].items[iindex].normalBgColor;
		}
	}
}

/*********************************************MENU.FILLITEM*******************************************/

function fFillItem(cindex, iindex)
{
	if(browser.name() =="Netscape")		//Netscape
	{
		if(browser.version() < 5)			//Netscape 4.X
		{
			document.layers["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"active"].visibility = "show";
		}
		else			//Netscape 6
		{
			//alert("Not yet implemented");
			if(this.columns[cindex].id == -1)	//toolbar
			{
				if(this.columns[cindex].items[iindex].itemType == "img")
					document.images["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normalmainimage"].src = this.columns[cindex].items[iindex].highImage.src;
				else
					document.getElementById("menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normaltext").className = "activeToolbar";

				document.getElementById("menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normal").style.backgroundColor = this.columns[cindex].items[iindex].activeBgColor;
			}
			else	//column
			{
				if(this.columns[cindex].items[iindex].itemType == "img")
					document.images["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normalmainimage"].src = this.columns[cindex].items[iindex].highImage.src;
				else
					document.getElementById("menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normaltext").className = "activeColumn";

				document.getElementById("menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normal").style.backgroundColor = this.columns[cindex].items[iindex].activeBgColor;
			}
		}
	}
	else	//Explorer
	{
		if(this.columns[cindex].id == -1)	//toolbar
		{
			if(this.columns[cindex].items[iindex].itemType == "img")
				document.images["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normalmainimage"].src = this.columns[cindex].items[iindex].highImage.src;
			else
				document.all["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normaltext"].className = "activeToolbar";

			document.all["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normal"].style.backgroundColor = this.columns[cindex].items[iindex].activeBgColor;
		}
		else	//column
		{
			if(this.columns[cindex].items[iindex].itemType == "img")
				document.images["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normalmainimage"].src = this.columns[cindex].items[iindex].highImage.src;
			else
				document.all["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normaltext"].className = "activeColumn";

			document.all["menu"+this.columns[cindex].id+"item"+this.columns[cindex].items[iindex].id+"normal"].style.backgroundColor = this.columns[cindex].items[iindex].activeBgColor;
		}
	}
}

/*********************************************ITEM.REPLACE*******************************************/

function fReplace()
{
  var tmp;

     tmp = this.title.split(" ");				//space
     this.title = tmp.join("&nbsp;");

     tmp = this.title.split("-");				//pomlcka
     this.title = tmp.join("&nbsp;");

     tmp = this.title.split("(");				//brackets
     this.title = tmp.join("/");

     tmp = this.title.split("<");
     this.title = tmp.join("&lt;");

     tmp = this.title.split(">");
     this.title = tmp.join("&gt;");

     tmp = this.title.split(")");
     this.title = tmp.join("/");

     tmp = this.title.split("{");
     this.title = tmp.join("/");

     tmp = this.title.split("}");
     this.title = tmp.join("/");

     tmp = this.title.split("[");
     this.title = tmp.join("/");

     tmp = this.title.split("]");
     this.title = tmp.join("/");

     tmp = this.title.split("%");
     this.title = tmp.join("/");
}