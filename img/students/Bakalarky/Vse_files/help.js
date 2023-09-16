/**** otvorenie noveho okna ***/

function okno(cesta) {
	if (document.all) { rozmer_h = document.body.clientHeight; }
	else { rozmer_h = innerHeight; }
	descript = "menubar=no,personalbar=no,location=no,titlebar=no,scrollbars=yes,toolbar=no,status=no,width=780,height="+rozmer_h+",resizable=yes,left=10,top=10";
	window.open(cesta, 'kos', descript);
}

function okno1(cesta) {
	if (document.all) { rozmer_h = document.body.clientHeight; }
	else { rozmer_h = innerHeight; }
	descript = "menubar=no,personalbar=no,location=no,titlebar=no,scrollbars=yes,toolbar=no,status=no,width=900,height="+rozmer_h+",resizable=yes,left=10,top=10";
	window.open(cesta, 'kos', descript);
}