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

        keyboard_keys.forEach(function (character) {
            if (character === '|') {
                row++;
                xOffset = row*3 + "%";
                yOffset += 30 + "%";
            }

            var $key = $('<div class="key' + character +'">' + character + "</div>");
            $this.append($key);
            $key.css({
                position: 'absolute',
                left: xOffset,
                top: yOffset    
            });
        });

    };
}(jQuery));
