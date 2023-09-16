//*******************
//KEY-PRESS FUNCTIONS

		document.onkeyup = KeyCheck;

		var keyCodes = new Array();
		var keyFunctions = new Array();

		function initKeybEvents(keybCodes, keybFunctions){
			for (ii in keybCodes){
				keyCodes.push(keybCodes[ii]);
			}
			for (ii in keybFunctions){
				keyFunctions.push(keybFunctions[ii]);
			}
		}

		function KeyCheck(e){
			var KeyID = (window.event) ? event.keyCode : e.keyCode;
//			alert("Key id code: " + KeyID);//debug vypis kodu klavesy
//			for (ii=0; ii< keyCodes.length; ii++){
			for (ii in keyCodes){
				if (KeyID==keyCodes[ii]){
					eval(keyFunctions[ii]);
					break;
				}
			}
		}


		
//KEY-PRESS FUNCTIONS
//*******************
//*******************
//PAMATOVANIE SI POSLEDNEHO AKTIVNEHO PRVKU
	
	function UpdateLF(nameOfElement){
		var last_focus = document.getElementById('lastFocus');
		last_focus.value = nameOfElement;
	}
	
	function SetFocus(nameOfElement){
		if(nameOfElement!=""&&nameOfElement!="null"){
			var x = document.getElementsByName(nameOfElement);
			x[0].focus();
		}
	}

//PAMATOVANIE SI POSLEDNEHO AKTIVNEHO PRVKU
//*******************



//*******************
//ZMENA CSS CLASS V NADRIADENOM TR ELEMENTE

var last_tr_focused = null;
var last_class_used = null;

	function getFirstParentElementOfType(leaf, wantedType){
		var parentik = leaf.parentNode;
		while(parentik.tagName != wantedType){
			parentik = parentik.parentNode;
		}
		return parentik;
	}
	
	function toogleCssClassInTable(leaf, newClass){
		if(last_tr_focused != null){
			last_tr_focused.className = last_class_used;
		}
		last_tr_focused = getFirstParentElementOfType(leaf, 'TR');
		last_class_used = last_tr_focused.className;
		last_tr_focused.className = newClass;
	}
	
	function getClassBack(leaf){
		last_tr_focused.className = last_class_used;
	}

//ZMENA CSS CLASS V NADRIADENOM TR ELEMENTE
//*******************


//*******************
//TEXTOVE POLICKA & ENCODING

	
		function existTextWin1250(element){
			var bchar = '';
			for(var i=0; i < element.value.length; i++){
				bchar = isISO88592( element.value.charAt(i));
				if (bchar!=null && bchar!=convertCharWin1250ToISO88592(bchar)){
					return i;
				} 
			}
			return null;
		}
		
		function convertTextWin1250ToISO88592(element){
			var bchar = '';
			for(var i=0; i < element.value.length; i++){
				bchar = isISO88592( element.value.charAt(i));
				if (bchar!=null){
					element.value = element.value.substring(0, i) + convertCharWin1250ToISO88592(element.value.charAt(i)) + element.value.substring(i+1, element.value.length);
				} 
			}
		}
    
		
	
		function getNoISO88592charFirstBlockPosition(element){
			var bchar = '';
			for(var i=0; i < element.value.length; i++){
				bchar = isISO88592( element.value.charAt(i));
				if (bchar!=null){
					return i;
				}
			}
			return null;
		}

		function getNoISO88592charEndBlockPosition(element, actualPosition){
			var bchar = '';
			for(var i=actualPosition+1; i < element.value.length; i++){
				bchar = isISO88592( element.value.charAt(i));
				if (bchar==null) return i;
			}
			return i;
		}
		
		function getNoISO88592chars(element){
			var bchar = '';
			var badChars = {};
			for(var i=0; i < element.value.length; i++){
				bchar = isISO88592( element.value.charAt(i));
				if (bchar!=null) badChars[bchar] = bchar;
			}

			var allBadChars = '';
			for (bchar in badChars){
				allBadChars=allBadChars + badChars[bchar];
			}
          	return allBadChars;
		}

		function isISO88592(character){
        	var unicode = character.charCodeAt(0);
//        	if(character=='<'||character=='>') return character;//pre zabranenie CROSS-SCRIPT XSS-injection
        	if(unicode==10 || unicode==13 || unicode >= 32 && unicode<=126){
          		return null;
	        }else{
				//tabula unicode hodnot pro znaky ceske abecedy
				var codes = {
	                0x0A0:true,0x104:true,0x2D8:true,0x141:true,0x0A4:true,0x13D:true,0x15A:true,
	                0x0A7:true,0x0A8:true,0x160:true,0x15E:true,0x164:true,0x179:true,0x0AD:true,
	                0x17D:true,0x17B:true,0x0B0:true,0x105:true,0x2DB:true,0x142:true,0x0B4:true,
	                0x13E:true,0x15B:true,0x2C7:true,0x0B8:true,0x161:true,0x15F:true,0x165:true,
	                0x17A:true,0x2DD:true,0x17E:true,0x17C:true,0x154:true,0x0C1:true,0x0C2:true,
	                0x102:true,0x0C4:true,0x139:true,0x106:true,0x0C7:true,0x10C:true,0x0C9:true,
	                0x118:true,0x0CB:true,0x11A:true,0x0CD:true,0x0CE:true,0x10E:true,0x110:true,
	                0x143:true,0x147:true,0x0D3:true,0x0D4:true,0x150:true,0x0D6:true,0x0D7:true,
	                0x158:true,0x16E:true,0x0DA:true,0x170:true,0x0DC:true,0x0DD:true,0x162:true,
	                0x0DF:true,0x155:true,0x0E1:true,0x0E2:true,0x103:true,0x0E4:true,0x13A:true,
	                0x107:true,0x0E7:true,0x10D:true,0x0E9:true,0x119:true,0x0EB:true,0x11B:true,
	                0x0ED:true,0x0EE:true,0x10F:true,0x111:true,0x144:true,0x148:true,0x0F3:true,
	                0x0F4:true,0x151:true,0x0F6:true,0x0F7:true,0x159:true,0x16F:true,0x0FA:true,
	                0x171:true,0x0FC:true,0x0FD:true,0x163:true,0x2D9:true
				};
	          	if(codes[unicode]){
	            	return null;
	          	}
          	return character;
			}
		}
		
	    function convertCharWin1250ToISO88592(character){
//	        var codes1 = {//pre zabranenie CROSS-SCRIPT XSS-injection
//		              '<' : '&lt;',
//		              '>' : '&gt;' //>>              
//		        }
//		    if(codes1[character]) return codes1[character];
//zatial sa neda koli text limiteru ktory je na niektorych textareach, treba doriesit

	var unicode = character.charCodeAt(0);
	var codes2 = {
			//control characters
			0x0000 : "",
			0x0001 : "",
			0x0002 : "",
			0x0003 : "",
			0x0004 : "",
			0x0005 : "",
			0x0006 : "",
			0x0007 : "",
			0x0008 : "", 
			0x0009 : "      ", 
			0x000B : "",
			0x000C : "", 
			0x000E : "",
			0x000F : "",
			0x0010 : "",
			0x0011 : "",
			0x0012 : "",
			0x0013 : "",
			0x0014 : "",
			0x0015 : "",
			0x0016 : "",
			0x0017 : "",
			0x0018 : "",
			0x0019 : "",
			0x001A : "",
			0x001B : "",
			0x001C : "",
			0x001D : "",
			0x001E : "",
			0x001F : "",
			0x003F : "",
			0x20AC : 'e',
			0x201A : ',',
			0x201E : '"',
			0x2026 : '.',
			0x2020 : '+',
			0x2021 : '+',
			0x2039 : '<',
			0x2018 : "'",
			0x2019 : "'",
			0x201C : '"',
			0x201D : '"',
			0x2022 : '.',
			0x2013 : '-',
			0x2014 : '-',
			0x203A : '>',
			0x00A6 : '|',
			0x00A9 : 'C',
			0x00AB : '<',
			0x00AE : 'R',
			0x00B7 : '.',
			0x00BB : '>'		
		}
		if(codes2[unicode]){
			return codes2[unicode];
		} else {
			if(unicode>255){
				return "";
			}else{
				return character;
			}
			
		}
	}

		function limitText(limitField, limitNum) {
			if (limitField.value.length > limitNum) {
				limitField.value = limitField.value.substring(0, limitNum);
				limitField.scrollTop = limitField.scrollHeight;
			}
		}

//*******************
//TEXTOVE POLICKA & ENCODING

		