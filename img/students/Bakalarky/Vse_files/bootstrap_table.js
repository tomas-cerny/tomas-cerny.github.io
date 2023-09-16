

function setFilter(nameFilter){
	var json_str = $.cookie(nameFilter);
	var filterRtzp = JSON.parse(json_str);
	//alert(filterRtzp);
	if(filterRtzp!=null){
		$('.filterable .btn-filter').click();
		for(var i=0;i<filterRtzp.length;i++){
     		var value2 = filterRtzp[i];
     		$('.table').find('.filters th').eq(i).find('input').val(value2);
    }
	}
	$('.filterable .filters input').keyup();
	
}

function applyFilter(nameFilter, numberOfCol, rememberFilter){
	
	if(bowser.name=="Internet Explorer"){
		if(bowser.version<10){
			document.getElementById("hlava_ie").style.display="inline";
			document.getElementById("hlava_all").style.display="none";
		}
	}
	
    $('.filterable .btn-filter').click(function(){		    	
        var $panel = $(this).parents('.filterable'),
        $filters = $panel.find('.filters input'),
        $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
        	$('.filterable .btn-filter').html('<span class="glyphicon glyphicon-filter"></span> Zrušit filtr');
        	if(bowser.name=="Internet Explorer"){
				if(bowser.version<10){
					document.getElementById("hlava_all").style.display="inline";
				}
			}
        	$filters.prop('disabled', false);
            $filters.first().focus();
        } else {
        	if(bowser.name=="Internet Explorer"){
				if(bowser.version<10){
					document.getElementById("hlava_all").style.display="none";
				}
			}
        	$filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
            $.removeCookie('tzpFilter');
            $('.filterable .btn-filter').html('<span class="glyphicon glyphicon-filter"></span> Zobrazit filtr');
        }
        
    });
    
    $('.filterable .filters input').keyup(function(e){
        /* Ignore tab key */
        var code = e.keyCode || e.which;
        if (code == '9') return;
        /* Useful DOM data and selectors */
        var filterRtzp = new Array(numberOfCol);
        var $input = $(this),
        inputContent = $input.val().toLowerCase(),
        $panel = $input.parents('.filterable'),
        column = $panel.find('.filters th').index($input.parents('th')),
        $table = $panel.find('.table'),
        $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        var $filteredRows = $rows.filter(function(){
        	var value;
        	var ret = false;
        	for(var i=0;i<numberOfCol;i++){
        		value = $(this).find('td').eq(i).text().toLowerCase();
        		var value2 = $('.table').find('.filters th').eq(i).find('input').val().toLowerCase();
        		if(i==2){
        			if(value2!=""){
        				document.getElementById('noaccept').checked = false;
        				document.getElementById('nofree').checked = false;
        			}
        		}
        		filterRtzp[i]=value2;
        		if(value2=="nic"){
        			value2 = "";
        			if(value!=value2){
	        			ret = true;
	        			break;
	        		}
        		}else if(value.indexOf(value2) == -1){
        			ret = true;
        			break;
        		}
        	}
        	if(rememberFilter){
        		var json_str = JSON.stringify(filterRtzp);
        		$.cookie(nameFilter, json_str);
        	}
            return ret;
        });
        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();
        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
        $rows.show();
        $filteredRows.hide();
    });
    if(rememberFilter){
    	setFilter();
    }    
};