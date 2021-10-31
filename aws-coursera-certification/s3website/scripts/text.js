/*
	Requires G_API_GATEWAY_URL_STR in the window object, 
	see readme and exercise guide
*/
var 
	$button = $("button"),
	$outputDrink = $("#outputDrink").attr("id"),
	$outputQty = $("#outputQty").attr("id"),
	$drinkValue = $("#drinks").attr("id"),
	$qtyValue = $("#quantity").attr("id"),

/**
 * _askTheMockAPIBot
 *
 * This is a API chatbot
 * It DOES hit an API
 * If you have just wired up the api gateway mock
 * 
 * 
 * If you have just wired up the api gateway LAMBDA mock
 * 
 * If you have just wired up the api gateway LAMBDA to
 * DynamoDB
 * then it will return a different temp per city.
 * and the message may change per city.
 * @param String drink_str // austin
 * @return To Callback Via Custom Reponse Helper
 * 		//response_str
 */
function _askTheAPIBot(drink_str, qty_int, cb){
	console.log("We are hitting the API: " + G_API_GATEWAY_URL_STR);
	var 
		params = {
			"drink_str": drink_str, 
			"qty_int": qty_int
		};
	g_ajaxer(G_API_GATEWAY_URL_STR, params, function(response){
		handleGatewayResponse(response, drink_str, qty_int, cb);
	}, function(error){
		handleGatewayError(error, cb);
	});
}

function handleGatewayResponse(response, drink_str, cb){
	var 
		message = response.message;
		console.log(message)
	cb(g_customizeResponse(drink_str, message));
}

function handleGatewayError(error, cb){
	cb("This failed:" + error.statusText);
}
/**
 * _askTheBot
 *
 * Proxy to the right bot
 *  
 * @param String drink_str // austin
 * @param Function //parent_cb
 */
function _pickABot(drink_str, qty_int, cb){
	if(drink_str === ""){
		response_str = "Please pick a drink, thanks";
		return cb(response_str);
	} else{
		_askTheAPIBot(drink_str, qty_int, cb);
	}
}
/**
 * whatShouldIOrder
 * 
 * @param Submit Event from form
 * @return undefined //UI change on output
 * 
 */
function whatShouldIOrder(se){
	var 
		drink_str = "",
		qty_int = "";
	se.preventDefault();
	if($button.prop("disabled") === true){
		return;
	}
	$outputDrink.attr("data-showing", "not_showing");
	$button.prop("disabled", "true");
	drink_str = $drinkValue.val();//they are already uppercase
	
	$outputQty.attr("data-showing", "not_showing");
	$button.prop("disabled", "true");
	qty_int = $qtyValue.val();//they are already uppercase

	_pickABot(drink_str, qty_int, function(response_str, response_int){
		$outputDrink.html(response_str);
		$outputDrink.attr("data-showing", "showing");
		$button.prop("disabled", false);
		$outputQty.html(response_int);
		$outputQty.attr("data-showing", "showing");
		$button.prop("disabled", false);
	});
}

//only start the app once we have all the drinks
g_loadTheDrinksIntoDropDown($selectDrink, function(){
	$button.prop("disabled", false)
			.text("Ask Drink Bot");
});

//only start the app once we have all the drinks
g_loadTheQuantityIntoDropDown($selectQty, function(){
	$button.prop("disabled", false)
			.text("How many?");
});


//handlers
$(document).on("submit", whatShouldIOrder);
