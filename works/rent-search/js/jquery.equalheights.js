$.fn.equalHeights=function(minHeight,maxHeight){
	tallest=(minHeight)?minHeight:0;
	this.each(function(){
		if(jQuery(">.box_inner", this).outerHeight()>tallest){
			tallest=jQuery(">.box_inner", this).outerHeight()
		}
	});
	if((maxHeight)&&tallest>maxHeight) tallest=maxHeight;
	return this.each(function(){jQuery(this).height(tallest)})
}
function height_handler(){
	if($(window).width()>767){
		jQuery(".maxheight").equalHeights();
	}else{
		jQuery(".maxheight").css({'height':'auto'});
	}
}
/*add event*/
jQuery(window).on("resize", height_handler).on("load", height_handler);