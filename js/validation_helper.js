/**
 * ************************
 * Author : C J
 * Created on : 03-JUL-2013
 * ************************	
 	Form Validation plug-in: validation_helper.js
	
	------------
	Description:
	------------ 
	
	This file provides ValidationHelper object to support the validateForm() plug-in by defining different kind of validations and error messages for those validations. 
	 
	Validation and error message methods of ValidationHelper are internally used by $.validateForm() plug-in to perform validation and get error message if validation fails.
	
	All the methods for performing validations and returning error messages are properties of ValidationHelper object to avoid the naming conflict in JavaScript.
	
	############################################
	
	---------------------------------------------
	HOW TO ADD A NEW VALIDATION FOR PHONE NUMBER:
	---------------------------------------------
	
	Step 1) : Create a validation method as below.
			
			ValidationHelper.type.validatePhoneNumber = function(inputElement){
				// Create Regex and perform validation
				// Return true if validation is successful
				// Else return false.
			}
			
	Step 2) : Create a method to return the error message if phone number validation fails.
	
			ValidationHelper.msg.validatePhoneNumberMessage = function(){
				// Return the appropriate error message.
			}
			
	###############################################
	
	--------------------------
	DETAILS of ValidationHelper:
	--------------------------
	
	ValidationHelper object has 3 main properties as below.
	
	• util : This has utility methods like getElementType, isEmpty, getElementData etc, which can be used from other validation methods. 
			 More utility methods can be added by using the below syntax.
	  
	  ValidationHelper.util.exampleMethod = function(param1, param2....){
	  	// DO YOUR STUFF.
	  }
	  
	• type : This property has all the validation methods. 
				IMPORTANT POINTS ABOUT VALIDATION METHODS.
				$) Validation method always starts with validate.. e.g. validateRequired, validateXYZ
				$) Validation method always have access to the input element on which validation is used from parameter list of method.
				$) Validation method returns true if there is no validation error, else false if there is any validation error.
				$) Utility methods can be used inside validation method using following syntax.
					ValidationHelper.util.getElementType(inputElement);
				$) While writing validations in input elements "NEVER USE" validate prefix of validation method and start the name with small letter. e.g.
					ValidationHelper.type.validateExampleMethod = function(inputElement){
					 // ............
					}
					<input type='text' name='firstName' validation='exampleMethod' inputLabel='First Name' />
				$) When you add a new validation method, "ALWAYS REMEMBER" to add an error message for the validation method. e.g.
					
					// Validation method
					
					ValidationHelper.type.validateExampleMethod = function(inputElement){
					 // ............
					}
					
					// Error message method for validateExampleMethod.
					
					ValidationHelper.msg.validateExampleMethodMessage = function(inputElement){
					 // .............
					}
				
	 • msg : This property has all the error message methods.
	 			IMPORTANT POINTS ABOUT ERROR MESSAGE METHODS.
	 			$) Error message method always starts with corresponding validation message name followed by 'Message' suffix. e.g.
	 				// Validation method
	 				ValidationHelper.type.validateExampleMethod = function(){}
	 				// Error Message method 
	 				ValidationHelper.msg.validateExampleMethodMessage = function(){}
	 				
	 			$) Error message method just returns the error message, it doesn't do any kind of validation.
	

 */


var ValidationHelper = {
		util : {},
		type : {},
		msg : {}
};

/**
 * --------------------------------
 * Utility methods starts from here
 * --------------------------------
 */

ValidationHelper.util.getElementType = function(inputElement){
	if($(inputElement).is("input")){
		return $(inputElement).attr("type");
	}else{
		return $(inputElement).get(0).tagName;
	}
};

ValidationHelper.util.isEmpty = function(inputElement){
	dataToBeValidated = ValidationHelper.util.getElementData(inputElement);
	return dataToBeValidated.replace(/ /g,"").replace(/\n/,"") == "";
};

ValidationHelper.util.getElementData = function(inputElement){
	inputElementType = ValidationHelper.util.getElementType(inputElement);
	if(inputElementType == "radio" || inputElementType == "checkbox"){
		return $(inputElement).is(":checked") ? $(inputElement).attr("value") : null; 
	}else{
		return $(inputElement).val();
	}
	
};

/**
 * --------------------------------
 * Utility methods ends here
 * --------------------------------
 */


/**
 * --------------------------------
 * Required field validation and error message.
 * --------------------------------
 */

ValidationHelper.type.validateRequired = function(inputElement){
	dataToBeValidated = ValidationHelper.util.getElementData(inputElement);
	inputElementType = ValidationHelper.util.getElementType(inputElement);
	if(inputElementType == "radio" || inputElementType == "checkbox"){
		elementName = $(inputElement).attr("name");
		elements = $("input[name='"+elementName+"']:checked");
		return elements.length > 0 ? true : false; 		
	}else if (dataToBeValidated!= null && dataToBeValidated.replace(/ /g,"").replace(/\n/,"")==""){
		return false;
	}
	return true;
};

ValidationHelper.msg.validateRequiredMessage = function(){
	return "is required field. Please enter/select a value.";
};

/**
 * --------------------------------
 * Alphabet validation and error message.
 * --------------------------------
 */

ValidationHelper.type.validateAlphabet = function(inputElement){
	dataToBeValidated = ValidationHelper.util.getElementData(inputElement);
	if (dataToBeValidated.match(/[^a-zA-Z -]/g)) {                 
		return false;
	}
	return true;
};

ValidationHelper.msg.validateAlphabetMessage = function(){
	return "Please enter Alphabets only.";
};

/**
 * --------------------------------
 * Name validation and error message.
 * --------------------------------
 */

ValidationHelper.type.validateName = function(inputElement){
	var namepattern = new RegExp("^[a-zA-Z\\s\'\\-\*\\\\@\.]+$");
	dataToBeValidated = ValidationHelper.util.getElementData(inputElement);
	if(dataToBeValidated != "" && !namepattern.test(dataToBeValidated)){
		return false;
	}
	return true;
};

ValidationHelper.msg.validateNameMessage = function(){
	return "is an invalid name. <br>You can use the letters A-Z, spaces and the characters hyphen (-), asterisk (*), backslash (\\), at (@), apostrophe (') and decimal (.)  to type the name.";
};



