
var country = new Array("Spain", "England", "France", "Italy");

const aboutLimit = 240;


var userValidated = false;
var passValidated = false;
var nameValidated = false;
var countryValidated = false;
var zipCodeValidated = false;
var emailValidated = false;
var sexValidated = false;
var langValidated = false;
var aboutValidated = true;

window.onload = function(){	
	inicializeList();
	inicialize();
}

function inicializeList(){
	let select = document.getElementById("country");

	select.innerHTML = "";

	let opt = document.createElement('option');
	opt.value = 0;
	opt.innerHTML = "(Choose your country)";
	select.appendChild(opt);

	for(let i = 0; i < country.length; i++){
		let opt = document.createElement('option');
	    opt.value = i+1;
	    opt.innerHTML = country[i];
	    select.appendChild(opt);
	}
}

function inicialize(){
	document.getElementById("user").addEventListener("blur", userValidation);
	document.getElementById("pass").addEventListener("blur", passValidation);
	document.getElementById("name").addEventListener("blur", nameValidation);
	document.getElementById("country").addEventListener("blur", countryValidation);
	document.getElementById("zipCode").addEventListener("blur", zipCodeValidation);
	document.getElementById("email").addEventListener("blur", emailValidation);
	document.getElementById("about").addEventListener("keyup", aboutValidation);
	addChangeEvent(document.getElementsByName("language"), langValidation);
	document.getElementById("submitBtn").disabled = true;
	document.getElementById("about");
}

function addChangeEvent(elements, execute){
	for(let i = 0; i < elements.length; i++){
		elements[i].addEventListener("change", execute);
	}
}

function userValidation(){

	let element = event.target;
	let box = document.getElementById("user_info");
	let valid = true;
	let error_message = "";
	let exp =  /^(?=.{5,12}$)/;

	if(element.className.split(" ").includes("required")){
		if(!Boolean(element.value)){
			valid = false;
			error_message = "Username can't be empty";
		}else{
			valid=true;
		}
	}

	if(! textValidation(element.value, exp) && Boolean(element.value)){
		valid = false;
		error_message = "Username must be between 5 and 12 characters";
	}else{
		valid=true;
	}
	if(! valid){
		changeToUnallowed(element, box, error_message);
	}else{
		changeToAllowed(element, box);
	}

	userValidated = valid; 
	checkValidations(); 
}


function passValidation(){

	let element = event.target;
	let box = document.getElementById("pass_info");
	let valid = true;
	let error_message = "";
	let exp =  /^(?=.{7,12}$)/;

	if(element.className.split(" ").includes("required")){
		if(!Boolean(element.value)){
			valid = false;
			error_message = "Password can't be empty";
		}
	}

	if(! textValidation(element.value, exp) && Boolean(element.value)){
		valid = false;
		error_message = "Password must be between 7 y 12 characters";
	}

	if(! valid){
		changeToUnallowed(element, box, error_message);
	}else{
		changeToAllowed(element, box);
	}

	passValidated = valid;
	checkValidations();

}

function nameValidation(){

	let element = event.target;
	let box = document.getElementById("name_info");
	let valid = true;
	let error_message = "";
	let exp =  /[A-Za-z]+/g;

	if(element.className.split(" ").includes("required")){
		if(!Boolean(element.value)){
			valid = false;
			error_message = "Name can't be empty";
		}
	}

	if(! textValidation(element.value, exp) && Boolean(element.value)){
		valid = false;
		error_message = "Only alphabet characters allowed";
	}

	if(! valid){
		changeToUnallowed(element, box, error_message);
	}else{
		changeToAllowed(element, box);
	}

	nameValidated = valid;
	checkValidations();
}

function countryValidation(){

	let select = event.target;
	let option_selected;
	box = document.getElementById("country_info");
	valid = true;
	error_message = "";

	for(let i = 0; i < select.options.length; i++){
		if(select.options[i].selected){
			option_selected = select.options[i];
			break;
		}
	}

	if(!Boolean(option_selected) || option_selected.value == 0){
		valid = false;
		error_message = "You must choose a country";
	}


	if(valid)
		changeToAllowed(select, box);
	else
		changeToUnallowed(select, box, error_message);

	countryValidated = valid;
	checkValidations();

}

function zipCodeValidation(){

	let element = event.target;
	let box = document.getElementById("zipCode_info");
	let valid = true;
	let error_message = "";
	let exp =  /^\d{5}$/;

	if(element.className.split(" ").includes("required")){
		if(!Boolean(element.value)){
			valid = false;
			error_message = "ZIP Code can't be empty";
		}
	}

	if(! textValidation(element.value, exp) && Boolean(element.value)){
		valid = false;
		error_message = "ZIP Code must be 5 numbers";
	}

	if(! valid){
		changeToUnallowed(element, box, error_message);
	}else{
		changeToAllowed(element, box);
	}

	zipCodeValidated = valid;
	checkValidations();

}

function emailValidation(){

	let element = event.target;
	let box = document.getElementById("email_info");
	let valid = true;
	let error_message = "";
	let exp =  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

	if(element.className.split(" ").includes("required")){
		if(!Boolean(element.value)){
			valid = false;
			error_message = "E-mail can't be empty";
		}
	}

	if(! textValidation(element.value, exp) && Boolean(element.value)){
		valid = false;
		error_message = "Must be a valid e-mail";
	}

	if(! valid){
		changeToUnallowed(element, box, error_message);
	}else{
		changeToAllowed(element, box);
	}

	emailValidated = valid;
	checkValidations();

}

function aboutValidation(){

	let element = event.target;
	let characters = element.value.length;
	let characterBox = document.getElementById("about");
	let error_message = "";
	let box = document.getElementById("about_info");

	if(characters > aboutLimit){
		characterBox.classList.add("text-danger");
		error_message = "Can't exceed " + aboutLimit + " characters";
		message = characters + "/" +aboutLimit;
		changeToUnallowedAbout(element, box, message, error_message);
		aboutValidated = false;
	}else{
		message = characters + "/" +aboutLimit;
		changeToAllowedAbout(element, box, message);
		characterBox.classList.remove("text-danger");
		aboutValidated = true;
	}

	checkValidations();
}

function langValidation(){

	let elements = document.getElementsByName(event.target.name);
	let valid = false;
	let box = document.getElementById("language_info");
	let error_message = "";

	for(let i = 0; i < elements.length; i++){
		if(elements[i].checked){
			valid = true;
			break;
		}
	}

	if(valid){
		changeToAllowed(elements, box);
	}else{
		error_message = "You must pick at least a language";
		changeToUnallowed(elements, box, error_message);
	}

	langValidated = valid;
	checkValidations();

}

function textValidation(text, expression){
	return expression.exec(text);
}


function changeToUnallowed(element, box, error_message){

	if(element.length != undefined && element.tagName != "SELECT"){
		for(let i = 0; i < element.length; i++){
			element[i].classList.add("is-invalid");
		}
	}else{
			element.classList.add("is-invalid"); 
	}

	box.classList.add("invalid-feedback");
	box.innerHTML = error_message;
}


function changeToAllowed(element, box){

	if(element.length != undefined && element.tagName != "SELECT"){
		for(let i = 0; i < element.length; i++){
			element[i].classList.remove("is-invalid");
			element[i].classList.add("is-valid");
		}
	}else{
			element.classList.remove("is-invalid"); 
			element.classList.add("is-valid"); 
	}
	
	box.className = "";
	box.innerHTML = "";
}

function changeToUnallowedAbout(element, box, message, error_message){

	if(element.length != undefined && element.tagName != "SELECT"){
		for(let i = 0; i < element.length; i++){
			element[i].classList.add("is-invalid");
		}
	}else{
			element.classList.add("is-invalid"); 
	}

	box.classList.add("invalid-feedback");
	box.innerHTML = message + " "+ error_message;
}

function changeToAllowedAbout(element, box, message){

	if(element.length != undefined && element.tagName != "SELECT"){
		for(let i = 0; i < element.length; i++){
			element[i].classList.remove("is-invalid");
			element[i].classList.add("is-valid");
		}
	}else{
			element.classList.remove("is-invalid"); 
			element.classList.add("is-valid");
	}

	box.className = "";
	box.innerHTML = message;
}

function checkValidations(){

	if(userValidated == true && passValidated == true && nameValidated == true && countryValidated == true
	&& zipCodeValidated == true && emailValidated == true && langValidated == true && aboutValidated == true){
		document.getElementById("submitBtn").disabled = false;
	}else{
		document.getElementById("submitBtn").disabled = true;	
	}
}
