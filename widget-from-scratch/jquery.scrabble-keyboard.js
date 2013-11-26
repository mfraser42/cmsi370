(function ($) {
    
    $.fn.scrabble_keyboard = function (options) {
        var $this = this,
            $current = null;
    
      //  $this.addClass("keyboard-box")
        
        var keyboard_keys = ['q','w','e','r','t','y','u','i','o','p','|','a','s','d','f','g','h','j','k','l','|','z','x','c','v','b','n','m'],
            keysLength = keyboard_keys.length,
            xOffset = 0,
            yOffset = 0,
            row = 0;
        
        for (var i = 0; i<length; i++)
        {
            if (keyboard-keys(i) == '|') {
                row++;
                xOffset = row*3 + "%";
                yOffset += 30 + "%";
            }
            $(".keyboard-box").append("<div class=\"key\" id=\"key" + keyboard_keys(i) +">" + keyboard_keys(i) + "</div>");
            $(".key" + keyboard_keys(i)).css({
                position: fixed,
                left: xOffset,
                top: yOffset    
            });
        }

    };
}(jQuery));
