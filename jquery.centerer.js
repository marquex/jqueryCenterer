/*
 * jQuery plugin that makes easy centering a HTML element relative to a container.
 * Copyright (c) 2013 Javier Marquez
 * http://arqex.com
 * 
 * Licensed under GPL2 license:
 * 	 http://www.gnu.org/licenses/gpl-2.0.html
 *
 * @author Javier Marquez (javi@arqex.com)
 * @version 0.1
 * 	 
 * @class centerer
 * @name jQueryCenterer
 * @chainable 
 * @param  {Object} options Initialization parameters for jQuery centerer.
 * @return {jQuery}         
 */

;(function($){	
    
	$.fn.centerer = function(options){
		var settings = $.extend({
			/**
			 * Type of resizing for the element. This option can be
			 * 		'noresize' (Default) : The element would have its original size. If it is bigger than the container, only the part centered in the container will be visible.
			 * 		'overflow' : The element size would be adjusted to have its smaller dimension (height or width) to be equals to the container dimension. If the other dimension is bigger it will be hidden by th container.
			 * 		'visible' : The elemnt size would be adjusted to fit in the container.
			 * @name resizeType
			 * @type {String}
			 */
			resizeType: 'noresize',
			/**
			 * Sets the container position type. The type must be relative or absolute, since the centered element will be absolute positioned.
			 * @type {String}
			 */
			position: 'relative',
			/**
			 * Selector of the element to be centered in the container. Default: 'img'.
			 * @type {String}
			 */
			element: 'img', // Selector of the element to be centered
			/**
			 * Whether to recenter the element when the container or the element is resized. Default: true.
			 * @type {Boolean}
			 */
			resizeSupport: true // Centering when container or element resizing?
		}, options);

		var centering = function($me, $img){
			var dim = {width: $me.width(),	height: $me.height()}
			$img.css({width:'auto', height: 'auto'}); //Just one image, original size.
			$img.dim = {width: $img.width(), height: $img.height()};
			//No img size, retry
			if(!settings.resizeSupport && ($img.dim.width == 0 || $img.height == 0))
				return setTimeout(function(){
					centering($me, $img);
				}, 300);
			if(settings.resizeType != 'noresize'){ // A resizing is maybe needed
				var pivot, diff;
				diff = {
					width: dim.width - $img.dim.width,
					height: dim.height - $img.dim.height
				}

				//The pivot will be the dimension that will equals to the container dimension.
				pivot = dim.width - $img.dim.width > dim.height - $img.dim.height ? 'width' : 'height';
				if(settings.resizeType == 'visible')
					pivot = pivot == 'width' ? 'height' : 'width';

				//Only resize when the image is bigger than the container
				if(diff[pivot] < 0){
					var factor = $img.dim[pivot] / dim[pivot];
					//resize
					$img.css({
						height: Math.round($img.dim.height / factor) + 'px',
						width: Math.round($img.dim.width / factor) + 'px'
					});
					//Update the dimension markers to not to center again
					$img.dim = {width: $img.width(), height: $img.height()};
				}
			}

			//centering
			$img.css({
				top: Math.round((dim.height - $img.dim.height) / 2) + 'px', 
				left: Math.round((dim.width - $img.dim.width) / 2) + 'px'
			});
		};

		return this.each(function(){
			var $this = $(this).css('position', settings.position),
				$img = $this.find(settings.element);

			$this.w = $this.width();
			$this.h = $this.height();
			if($img.length > 0){
				$img = $($img[0]).css('position', 'absolute');
				$img.dim = {width: $img.width(), height: $img.height()};

				//Throttling checking resizing :)
				if(settings.resizeSupport){
					setInterval(function(){
						if($this.height() != $this.h || $this.width() != $this.w)
							centering($this, $img);
						else if($img.height() != $img.dim.height || $img.width() != $img.dim.width)
							centering($this, $img);
					}, 300);
				}

				// center now
				centering($this, $img);
			}
		});
	}
})(jQuery);