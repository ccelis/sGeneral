
/**
 * Description for boxee.
 * 
 * @author Sexar
 */

var boxee = {	
   
   /**
    * Add commas to a number.
    *
    * @param {number} number
    */
   addCommas: function(number){
       
       var n, nLeft, nRight;
       var rgx = /(\d+)(\d{3})/;
       
       // Parse to String.
       number += '';
       
       n = number.split('.');
       nLeft = n[0];
       nRight = (n[1]) ? '.' + n[1] : '';
       
       while(rgx.test(nLeft))
           nLeft = nLeft.replace(rgx, '$1' + ',' + '$2');
       
       return nLeft + nRight;
       
   },
   
    /**
     * Description for centerItem.
     *
     * @param {jQuery} item
     * @param {bool} toParent
     */
    centerItem: function(item, toParent){
        
        var container = (toParent) ? item.parent() : $(window);
        var position = item.css('position');
        
        // Obtains values.
        var l = (container.width() - item.width()) / 2,
            t = (container.height() - item.height()) / 2;
        
        // Check if the position is absolute to asign a left and top values.
        if(position === 'absolute' || position === 'fixed')
            item.css({
                'left': l, 
                'top': t
            });
        
        else
            item.css({
                'margin-left': l, 
                'margin-top': t
            });
    },
    
    /**
     * Go to the top of the page.
     * Note: The default animation for the button is fadeIn and fadeOut, make sure
     *       that the button have display none.
     * 
     * @param {jQuery} button
     */
    goTop: function(button){
        
        // Initialize vars.
        var scrollTimer = null,
            $window = $(window),
            targets = $('html, body'),
            top = targets.children(0).position().top;
        
        $window.scroll(function(){
            
            clearTimeout(scrollTimer);
            
            scrollTimer = setTimeout(function(){
                
                // Top of the page
                if ($window.scrollTop() <= top ) {
                    
                    targets.stop(true, true);
                    button.fadeOut();
                    
                } else {
                    
                    button
                        .fadeIn()
                        .click(function(event){
                            targets.animate({scrollTop: top}, 300);
                            button.fadeOut();
                            event.preventDefault();
                        });
                        
                }
                
            }, 100);
            
        });
    },

    /**
     * Fill the container with the image.
     * Note: Make sure that the image is fully loaded.
     *
     * @param {jQuery} image
     */
    resizeImage: function(image){
        var container = image.parent();
        
        var width = container.width();
        var height = container.width() * image.height() / image.width();
        
        if( height < container.height() ){
            height = container.height();
            width = container.height() * image.width() / image.height();
        }
        
        image.height(height);
        image.width(width);
    },

    /**
     * Scale an image without lose aspect ratio.
     * Note: Make sure that the image is fully loaded.
     *
     * @param {jQuery} image
     */
    scaleImage: function(image){
        var container = image.parent();

        var realHeight = image.height(),
        realWidth = image.width();
        
        var ratio = [container.width() / realWidth, container.height() / realHeight ];
        ratio = Math.min(ratio[0], ratio[1]);

        image.width( realWidth * ratio );
        image.height( realHeight * ratio );

    },

    /**
     * Simulate a place holder of a input.
     * This function could recive an array o inputs and uses the attribute data-placeholder.
     *
     * @param {Array<jQuery>=} inputs
     */
    simulatePlaceholder: function(inputs){
        
        inputs.each(function(){
            var input = $(this);
            var value = input.data('placeholder');
            
            // Initialize the input with placeholder value.
            input.val(value);
            
            // Show placeholder.
            input.focus(function(){
                if(input.val() === value)
                    input.val('');
            });
            
            // Hide placeholder
            input.blur(function(){
                if(input.val() === '')
                    input.val(value);
            });
        });
        
    },

    /**
     * Trim a string to a specified size.
     * Add suspension points if the string was trimmed.
     *
     * @param {string} string
     * @param {int} size
     * @return trimmedString
     */
    trimText: function(string, size){

        // Removes white space at the end of a string.
        function trim (s){ return s.replace(/^\s+|\s+$/g, ''); }

        var newString = string.split(" ");
        var trimmedString = '';
        var word = '';

        for (var i = 0 ; i < newString.length; i ++) {
            word = newString[i];
	 		
            if (trimmedString.length > size)	{
                break;
            } else {
                trimmedString += word + ' ';

                if(trimmedString.length - 1 > size){
                    trimmedString = trimmedString.substr(0, trimmedString.lastIndexOf(word));
                    break;
                }
            }

        }

        trimmedString = trim(trimmedString);

        return ( trimmedString != string )
            ? trimmedString + '\u2026'
            : trimmedString;

    },

    /**
     * Wait to the images are already loaded, then excecute a callback.
     *
     * @param {jQuery} images
     * @param {function} callback
     */
     waitForImages: function(images, callback){
        var totalimages = images.length,
            loadedimages = 0;

        function onImageLoaded(){

            if(++loadedimages >= totalimages)
                if(callback && typeof callback === 'function')
                    callback();

        }

        images.each(function(){
            var image = $(this);

            if(image.get(0).complete)
                onImageLoaded();

            else
                image.load(function(){ onImageLoaded(); });
        });

     }

}
