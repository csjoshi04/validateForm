/**
 * ************************
 * Author : C J
 * Created on : 03-JUL-2013
 * ************************	
 	Form Validation plug-in: validation.js
	
	------------
	Description:
	------------ 
	
	This plug-in can be used to validate an HTML form or all the input elements inside any HTML element e.g div, table, span, p.
	
	--------------------------------------------------------------------
	NEW ATTRIBUTES ADDED IN HTML INPUT ELEMENTS FOR USING THIS PLUG-IN :
	--------------------------------------------------------------------
	
	Following 2 attributes needs to be added in the input elements for using this plug-in.
	
	• validation : comma separated list of all the validations to be used in that input element. e.g. required, name. 
					all these validation need to be defined in validation_helper.js. Some of the most common validations are present there. Any new validation needs to be added there.
					Check the documentation of validation_helper.js for details.
					
	• inputLabel : Label for that input element, this can used in displaying errors.
	
	##############################################################################
	-------------------------
	HOW TO USE PLUG-IN:
 	-------------------------
	• Include validation.js in your HTML.
	• Include validation_helper.js in your HTML.
	
	--------------------
	example.html
	--------------------
	<div id="example">
		<input type="text" name="firstName" value="" validation="required,name" inputLabel="First Name" />
		
		<input type="radio" name="gender" value="male" validation="required" inputLabel="Gender" /> Male
		<input type="radio" name="gender" value="female" validation="required" inputLabel="Gender" /> Female
		
		<input type="button" name="submit" value="Submit" />
	</div >
	
	--------------------
	example.js
	--------------------
	$("#example").validateForm();
	But this will not display any error. Check below example to see how to display error.
	
	########################################
	
	To show validation errors add one more div for showing errors in example.html. And use $.showFormValidationErrors() plug-in in your JavaScript file/code. Below is the final code.
	
	• Include validation_error_display.js also in your HTML.
	--------------------
	example.html
	--------------------
	<div id="errorMessage" style="display:none;"></div >
	<div id="example">
		<input type="text" name="firstName" value="" validation="required,name" inputLabel="First Name" />
		
		<input type="radio" name="gender" value="male" validation="required" inputLabel="Gender" /> Male
		<input type="radio" name="gender" value="female" validation="required" inputLabel="Gender" /> Female
		
		<input type="button" name="submit" value="Submit" />
	</div >
	
	--------------------
	example.js
	--------------------
	errorsMap = $("#example").validateForm();
	$("#errorMessage").showFormValidationErrors({"errorDetails" : errorMap })  
	
	##############################################################################
	
	---------------------------------
	DETAILS of validateForm() PLUG-IN:
	---------------------------------
	
	This plug-in returns a map of errors as follows:
	
	'key' of map :- 'name' attribute of input element where validation failed. 
	'value' of map :- value is again a map (key/value) as below.
					
					KEY   :- VALUE
					-----    -----
	   				type :- Type of element e.g. text, radio, checkbox etc.
	   				message :- Error Message that needs to be shown.
	   				label :- Label of input element. 
	   		
	------------------------------------------------   				
	Example:
	"firstName" : {
					"type" : "text",
					"message" : "Invalid first name",
					"label" : "First Name"
				}
	------------------------------------------------
	   				
	This doesn't show any validation message by its own. Error Map returned by this plug-in can be passed as a parameter to another plug-in or function to show error message.
	This way it separates the validation functionality from showing errors and gives developer flexibility to write their own function/plug-in to display the error messages.
	
	To get started with it, one default implementation $.showFormValidationErrors() for showing errors has been created and can be used as 
	errorMap = $(selector).validateForm();
	$(selector).showFormValidationErrors({"errorDetails" : errorMap })  
	
 */


(function($) {

	$.fn.validateForm = function(options) {
        var defaults = {};
        var errorDetailsMap = {};
        var plugin = this;
        plugin.settings = {};
        var $element = this;  // reference to the jQuery version of DOM element

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            validateFormData();
            return errorDetailsMap;
        };
        
        var validateFormData = function(){
        	$($element).find("[validation]").each(function(){
        		elementName = $(this).attr("name");
        		if(!errorDetailsMap.hasOwnProperty(elementName)){
        			validationTypes = ($(this).attr("validation")).split(",");
        			for(var i = 0; i < validationTypes.length; i++){
        				currentValidationType = validationTypes[i];
        				currentValidationType = "validate"+currentValidationType.charAt(0).toUpperCase() + currentValidationType.slice(1);   
        				if(!window["ValidationHelper"]["type"][currentValidationType](this)){
        					populateErrorDetails(this, currentValidationType);
        					break;
        				}
        			}
        		}
    		});		
        };
        
        var populateErrorDetails = function(inputElement, currentValidationType){
        	elementName = $(inputElement).attr("name");
        	elementType = window["ValidationHelper"]["util"]["getElementType"](inputElement);
        	errorMessageValue = window["ValidationHelper"]["msg"][currentValidationType+"Message"]();
        	elementLabel = $(inputElement).attr("inputLabel");
        	errorDetailsMap[elementName] = {
        			"type" : elementType,
        			"message" : errorMessageValue,
        			"label" : elementLabel
        	};
        };

        return plugin.init();
    };

})(jQuery);