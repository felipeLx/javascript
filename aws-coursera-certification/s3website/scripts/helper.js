/*
	Helper functions
*/


/*
	Ensuring data type is set up for CORS
*/
function g_ajaxer(url_str, params, ok_cb, fail_cb){
	$.ajax({
		url: url_str,
		type: "POST",
		data: JSON.stringify(params),
		crossDomain: true,
		contentType: "application/json",
		dataType: "json",
		success: ok_cb,
		error: fail_cb,
		timeout: 6000
	});
}
/**
 * g_loadTheDrinksIntoDropDown(
 * 
 * Just populates a list of qty_ints
 *
 * @param JqueryObject $parent_drop_down_e
 * @param Function parent_cb
 * 
 * return via parent_cb //always true || fail hard
*/
function g_loadTheDrinksIntoDropDown($parent_drop_drink_down_el, parent_cb){
	$.get("drinks.md", function(drink_str){
		var
			html_str = '',
			drink_str_arr = [],
			drink_str_temp_arr = drink_str.split("\n");

		drink_str_arr = drink_str_temp_arr.map(function(item){
		  return item.split(',')[0];
		});
		html_str += '<option value="">' + 'Choose A Drink' + '</option>';
		for(var i_int = 0; i_int < drink_str_arr.length; i_int += 1){
			html_str += '<option value="' + drink_str_arr[i_int] + '">' + drink_str_arr[i_int].toLowerCase() + '</option>';
		}

		$parent_drop_drink_down_el.html(html_str);
		parent_cb(true);//done
		//and if this fails, fail hard here instead
	});
}
/**
 * g_loadTheQuantityIntoDropDown(
 * 
 * Just populates a list of quantity
 *
 * @param JqueryObject $parent_drop_down_e
 * @param Function parent_cb
 * 
 * return via parent_cb //always true || fail hard
*/
function g_loadTheQuantityIntoDropDown($parent_drop_qty_down_el, parent_cb){
	$.get("quantity.md", function(qty_int){
		var
			html_str = '',
			qty_int_arr = [],
			qty_int_temp_arr = qty_int.split("\n");

			qty_int_arr = qty_int_temp_arr.map(function(item){
		  return item[0];
		});
		html_str += '<option value="">' + 'Choose the Quantity' + '</option>';
		for(var i_int = 0; i_int < qty_int_arr.length; i_int++){
			html_str += '<option value="' + qty_int_arr[i_int] + '">' + qty_int_arr[i_int].toLowerCase() + '</option>';
		}

		$parent_drop_qty_down_el.html(html_str);
		parent_cb(true);//done
		//and if this fails, fail hard here instead
	});
}
/**
 * g_loadTheDrinksIntoDropDown(
 * 
 * Takes a city and temperature and replies with text
 * It decides if it is too hot or too cold
 * Range of temps is currently set between
 * 20 and 79
 *
 * @param String qty_int
 * @param Number temp_int
 * 
 * @return String  //The temperature is 20 degree, 
 * 
 */
function g_customizeResponse(drink_str, total){
	var 
		message_str = "Your Drink is " + drink_str.toLowerCase() + " the total is " + total.toString() + ".";
		// message_str += "<br /><br />";

	if(total > 50){
		message_str += " I think this is too much just for one.";
	}else if(total <= 49 && total > 20){
		message_str += " I think this is probably just right for you.";
	}else if(total <= 19 && total >= 10){
		message_str += " I think that maybe you will need more later.";
	}else{
		message_str += " You are alone? Take more, you never now.";
	}
	return message_str;
}




