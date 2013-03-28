
/**
 * Description for boxee.
 */

var boxee = {	
   
    /**
     * Description for centerItem.
     *
     * @param {jQuery} item
     * @param {bool} horizontal
     * @param {bool} vertical
     * @param {bool} toParent
     */
    centerItem: function(item, horizontal, vertical, toParent){

    },
    
    /**
     * Description for goTop.
     */
    goTop: function(){
        
    },

    /**
     * Description for popup.
     *
     * @param {jQuery} content
     */
    popup: function(content){

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
     * Description for simulatePlaceholder.
     *
     * @param {jQuery} inputElement
     */
    simulatePlaceholder: function(inputElement){

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
            ? trimmedString + 'É' 
            : trimmedString;

    },

    /**
     * Description for validateForm.
     *
     * @param {jQuery} form
     */
    validateForm: function(form){

    }

}