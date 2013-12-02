(function ($) {
    
    $.fn.scrabble_keyboard = function (options) {
        var $this = this,
            $current = null;
    
      //  $this.addClass("keyboard-box")
        var $dropArea = $('<input type="text" class="drop-area"> </input>');
        $this.append($dropArea);
        
        var $keyboard = $('<div class="keyboard-box"> </div>"');
        $this.append($keyboard);

        var keyboard_keys = ['q','w','e','r','t','y','u','i','o','p','|','a','s','d','f','g','h','j','k','l','|','z','x','c','v','b','n','m','sp'],
            keysLength = keyboard_keys.length,
            xOffset = 0,
            yOffset = 0,
            row = 0;

        
        /**
        * The majority of the Boxes object/variable is from dondi's "bazaar/boxes/boxes.js" git repository
        */
        var Boxes = {
            /**
             * Constant for the left mouse button.
             */
            LEFT_BUTTON: 1,

            /**
             * Sets up the given jQuery collection as the drawing area(s).
             */
            setDrawingArea: function (jQueryElements) {
                jQueryElements
                    .addClass("drawing-area")
                    // "this" is Boxes.
                    .mousemove(this.trackDrag)
                    
                    // We conclude drawing on either a mouseup or a mouseleave.
                    .mouseup(this.endDrag)
                    .mouseleave(this.endDrag);
            },

            /**
             * Utility function for disabling certain behaviors when the drawing
             * area is in certain states.
             */
            setupDragState: function () {
                $(".drawing-area .key")
                    .unbind("mousemove")
                    .unbind("mouseleave");
            },

            /**
             * Tracks a box as it is rubberbanded or moved across the drawing area.
             */
            trackDrag: function (event) {
                // Don't bother if we aren't moving anything.
                if (this.movingBox) {
                    // Reposition the object.
                    this.movingBox.offset({
                        left: event.pageX - this.deltaX,
                        top: event.pageY - this.deltaY
                    });
                }
            },

            /**
             * Concludes a drawing or moving sequence.
             */
            endDrag: function (event) {
                if (this.movingBox) {
                    // Change state to "not-moving-anything" by clearing out
                    // this.movingBox.
                    this.movingBox = null;
                }

                // In either case, restore the highlight behavior that was
                // temporarily removed while the drag was happening.
                $(".drawing-area .box")
                    .removeClass("box-highlight")
                    .mousemove(Boxes.highlight)
                    .mouseleave(Boxes.unhighlight);
            },

            /**
             * Indicates that an element is highlighted.
             */
            highlight: function () {
                $(this).addClass("box-highlight");
            },

            /**
             * Indicates that an element is unhighlighted.
             */
            unhighlight: function () {
                $(this).removeClass("box-highlight");
            },

            /**
             * Begins a box move sequence.
             */
            startMove: function (event) {
                // We only move using the left mouse button.
                if (event.which === Boxes.LEFT_BUTTON) {
                    // Take note of the box's current (global) location.
                    var jThis = $(this),
                        startOffset = jThis.offset(),

                        // Grab the drawing area (this element's parent).
                        // We want the actual element, and not the jQuery wrapper
                        // that usually comes with it.
                        parent = jThis.parent().get(0);

                    // Set the drawing area's state to indicate that it is
                    // in the middle of a move.
                    parent.movingBox = jThis;
                    parent.deltaX = event.pageX - startOffset.left;
                    parent.deltaY = event.pageY - startOffset.top;

                    // Take away the highlight behavior while the move is
                    // happening.
                    Boxes.setupDragState();

                    // Eat up the event so that the drawing area does not
                    // deal with it.
                    event.stopPropagation();
                }
            }

        };
        
        Boxes.setDrawingArea($(".keyboard-box"));
        
        keyboard_keys.forEach(function (character) {
            if (character === '|') {
                row++;
                yOffset += 33;
                xOffset = 3*row;
            } else {
                var $key = $('<div class="key ' + character + ' box">' + character + "</div>");
                $keyboard.append($key);
                $key.css({
                    //position: 'absolute',
                    left: xOffset + '%',
                    top: yOffset + '%'    
                });
                xOffset += 6;
                
                $key
                    .mousemove(Boxes.highlight)
                    .mouseleave(Boxes.unhighlight)
                    .mousedown(Boxes.startMove);
                
            }
        });

    };
}(jQuery));
