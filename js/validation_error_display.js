/**
 * ************************
 * Author : C J
 * Created on : 03-JUL-2013
 * ************************	
 	Form Validation Error display plug-in: validation_error_display.js
	
	------------
	Description:
	------------ 
	
	This plug-in can be used to display/remove the error messages. Developers can write their own function/plug-in to display error messages. 
	
	parameter : Error Map, returned by the $(selector).validateForm().
	return : 	true :- if form has errors
				false :- if form doesn't have error.
				
	------------------------------------------------------------------
	
	It displays the errors in following format on the top of page/modal.
	
	---------------------------------------------------------------------------------------------------------------------------------
	| <red cross image> You must correct the following error(s) in order to continue:												|
	|		              • First Name: is an invalid name. 																		|
	|					    You can use the letters A-Z, spaces and the characters hyphen (-), asterisk (*), backslash (\), at (@), |
	|					     apostrophe (') and decimal (.) to type the name.														|
	|					  • Gender: is a required field. Please enter/select a value 												|
	|																																|			
	---------------------------------------------------------------------------------------------------------------------------------
	
	#############################################################################
	-------------------------
	HOW TO USE PLUG-IN:
 	-------------------------
	• Include validation_error_display.js in your HTML.
	
	Using plug-in for displaying errors.
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
	$("#errorMessage").showFormValidationErrors({"errorDetails" : errorMap });  
	
	#########################################
	
	Using plug-in for removing error message created earlier.
	$("#errorMessage").hideFormValidationErrors();  
	#############################################################################
 */


(function($) {

	$.fn.showFormValidationErrors = function(options) {
        var defaults = {
        		"errorDetails" : {}
        };
        var plugin = this;
        var errorFlag = false;
        plugin.settings = {};
        var $element = this;  // reference to the jQuery version of DOM element

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            $($element).hideFormValidationErrors();
            showValidationErrors();
            return errorFlag;
        };
        
        var showValidationErrors = function(){
        	$($element).css("border","solid 2px red");
        	
        	var errorMessage = "<img src='../images/red_close_button.png' alt='Error' style='cursor:pointer' width='16' height='16'/>"
        						+ "<b>You must correct the following error(s) in order to continue: </b>"
        						+ "<ul>";
        	errorMap = plugin.settings.errorDetails;
        	
        	for(key in errorMap){
                if(errorMap.hasOwnProperty(key)){
                	errorFlag = true;
                	details = errorMap[key];
                	errorMessage += "<li><b>"+details.label+":</b> "+details.message+"</li>";
                }
            }
        	errorMessage += "</ul>";
        	if(errorFlag){
        		$($element).html(errorMessage);
            	$($element).css("display","block");
        	}
        	
        };
        return plugin.init();
    };
    
    $.fn.hideFormValidationErrors = function(options) {
    	$element = this;
    	$($element).find("img").css("display","none");
    	$($element).html("");
    	$($element).css("display","none");
    };
    
})(jQuery);