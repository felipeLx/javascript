var 
	//We will change this in stage 2

	// https://mgi77ltecc.execute-api.us-east-1.amazonaws.com/test",
	//cores enabled sample post
	$country = $("#country"), // united states
	$city = $("#city"),  // austin
	$output = $("#response"), //TBD
	$button = $("#ask_bot"),
	g_synth = null,
	g_chosen_voice = {};

/* start speech */
var recognition = new webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;


var $listen_to_me_btn = $("#listen_to_me_btn");
$listen_to_me_btn.on("click", handleListen);

function handleListen(event){
	event.preventDefault();//no submit
  	recognition.start();
  	$listen_to_me_btn.text("Listening...");
  	$listen_to_me_btn.prop("disabled", true);
}

recognition.onresult = function(event) {
  var message_str = event.results[0][0].transcript;
  $listen_to_me_btn.text("Push to talk");
  // $("h1").css({
  // 	"background-color": color
  // });
  newBubble("meatsack", message_str);
  sendToDrinkBot(message_str);
}
var user_id_str = Math.random().toString();

function sendToDrinkBot(message_str){
	var
		params = {
    		"message_str": message_str,
    		"user_id_str": user_id_str
    	};
    $listen_to_me_btn.text("Awaiting drink bot for you...");
	g_ajaxer(G_API_GATEWAY_URL_STR, params, ok_cb, fail_cb);
}

function fail_cb(error){
	console.error(error);
	newBubble("gorgeous_drinkbot", "In the middle of the party...please, try again");
	$listen_to_me_btn
			.text("Push to talk")
			.prop("disabled", false);
}


(function initChatty(){
	// debugger;
	try{

		g_synth = window.speechSynthesis;
		g_chosen_voice = g_synth.getVoices()[2];//mei jia


		// voices_length_int = voices.length;
		// for(i_int = 0; i_int < voices_length_int; i_int += 1){
		// 	console.log(voices[i_int]);
		// 	break;
		// }
	}catch(e){
		console.log("no chatty drink for this browser");
	}
})();

function ok_cb(response){
	// debugger;
	//could be an error response that returns a 200
	//catch [LATER]
	var 
		message_str = "",
		//JSON.parse(response.body).message,
		opinion_str = "let them out anyway.";

// console.info(JSON.parse(response.body).dialogState, report_str);


	if(response.dialogState === "Fulfilled"){ // "ReadyForFulfillment"){

		var 
			city_str = response.sessionAttributes.city_str,
			temp_int = Number(response.sessionAttributes.temp_str);



		message_str = "Ok, so you want to know drink today " 
				+ drink_str
				+ ". Let me check the tubes...one sec";

		newBubble("gorgeous_drinkbot", message_str);
		setTimeout(function(){
			newBubble("gorgeous_drinkbot", g_customizeResponse(city_str, temp_int));
			$listen_to_me_btn
				.text("Refresh page to try again")
				.prop("disabled", true);
		}, 8*1000); //time to read it out
		//stay disabled
	}else{
		//eliciting slots
		//response.slotToElicit
		// 			+ response.city_str 
		// 			+ " " 
		// 			+ response.county_str; //SHOULD BE COUNTRY .missing R
		newBubble("gorgeous_drinkbot", response.message);
		$listen_to_me_btn
				.text("Push to talk")
				.prop("disabled", false);
	}
}

function newBubble(device_type_str, message_str){
	var
		$chat_area = $("[data-role='chat_area']"),
		html_str = '';
	html_str += '<output data-device_type="' + device_type_str + '">';
	html_str += 	message_str;
	html_str += '</output>';

	$chat_area
		.append(html_str)
		.animate({ scrollTop: $chat_area.outerHeight()}, 300);
		// element.scrollTop = element.scrollHeight;
	if(device_type_str === "gorgeous_drinkbot" && g_synth !== null){
		chattyCatWillNotShutUp(message_str);
	}
}
function chattyCatWillNotShutUp(message_str){
	message_str = message_str.replace("<br /><br />", "");
	var 

		utter_this = new SpeechSynthesisUtterance(message_str);
	utter_this.voice = g_chosen_voice;
	// utter_this.lang = "zh-TW";
	// utter_this.pitch = 1.8;
	// utter_this.rate = 0.9;
	g_synth.speak(utter_this);
}

