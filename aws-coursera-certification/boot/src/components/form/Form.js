import React, {useState} from 'react'

const Form = props => {
    const [selectedDrink, setSelectedDrink] = useState('')

    /**
 * _askTheBot
 *
 * Proxy to the right bot
 *  
 * @param String city_str // austin
 * @param Function //parent_cb
 */
function _pickABot(city_str, cb){
	if(city_str === ""){
		response_str = "Please pick a city, thanks";
		return cb(response_str);
	}
	if(G_API_GATEWAY_URL_STR === null){
		_askTheFakeBot(city_str, cb);
	}else{
		_askTheAPIBot(city_str, cb);
	}
}
/**
 * whatShouldMyPetDo
 * 
 * @param Submit Event from form
 * @return undefined //UI change on output
 * 
 */
function whatShouldMyPetDo(se){
	var 
		city_str = "";
	se.preventDefault();
	if($button.prop("disabled") === true){
		return;
	}
	$output.attr("data-showing", "not_showing");
	$button.prop("disabled", "true");
	city_str = $select.val();//they are already uppercase
	_pickABot(city_str, function(response_str){
		$output.html(response_str);
		$output.attr("data-showing", "showing");
		$button.prop("disabled", false);
	});
}

//only start the app once we have all the cities
g_loadTheCitiesIntoDropDown($select, function(){
	$button.prop("disabled", false)
			.text("Ask Weather Bot");
});


//handlers
$(document).on("submit", whatShouldMyPetDo);


    const optionHandler = () => (
        <ul onSelect={selectHandler}>
            <li>Beer</li>
            <li>Vodka</li>
            <li>Wisky</li>
        </ul>
    )

    const selectHandler = drink => (
        setSelectedDrink(drink)
    )

    return(
        <div>
            <p className='p1'><span className='s1'></span></p>
            <h1><span className='s1'><b>You want a drink?</b></span></h1>
            <p className='p3'><span className='s2'>We want: </span><span className='s3'>Checking our bar. One sec.<span className='Apple-converted-space'> </span></span></p>
        </div>
    )
}

export default Form