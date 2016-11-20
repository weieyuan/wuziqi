(function(context) {
	var WUtils = context.WUtils = new Object();

	WUtils.getCssPropValue = function(elementId, cssPropValue) {
		var element = document.getElementById(elementId);
		var style = window.getComputedStyle ? window.getComputedStyle(element, null) : element.style;
		return style[cssPropValue];
	};

})(this);