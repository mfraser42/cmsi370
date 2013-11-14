$(function () {
    //var cache = {};
    
    window.BoxesTouch = {
        /**
         * Sets up the given jQuery collection as the drawing area(s).
         */
        setDrawingArea: function (jQueryElements) {
            // Set up any pre-existing box elements for touch behavior.
            jQueryElements
                .addClass("drawing-area")
                //BoxesTouch.touchCache = {};
                
                // Event handler setup must be low-level because jQuery
                // doesn't relay touch-specific event properties.
                .each(function (index, element) {
                    element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
                    element.addEventListener("touchend", BoxesTouch.endDrag, false);
                    //element.addEventListener("touchstart", BoxesTouch.startCreate, false);
                })

                .find("div.box").each(function (index, element) {
                    element.addEventListener("touchstart", BoxesTouch.startMove, false);
                    element.addEventListener("touchend", BoxesTouch.unhighlight, false);
                });
        },

       /* startCreate: function (event) {
            $.each(event.changedTouches, function (index, touch) {
                var cacheEntry = { };
                cache[touch.identifier] = cacheEntry;
                
                cacheEntry.initialX = touch.pageX;
                cacheEntry.initialY = touch.pageY;
                
                var createdBox = "<div..
                
                
                touch.target.initialX = touch.pageX;
                touchIndex = touch.indentifier; 
                BoxesTouch.toucheCache[touchIndex].initialX = touch.pageX;
                BoxesTouch.toucheCache[touchIndex].initialY = touch.pageY; 
                
                $("#drawing-area").append('<div class="box" style="width: 0px; height:0px; left:' + touch.pageX + 'px; top: ' + touch.pageY + 'px"></div>'*/
                

        /**
         * Tracks a box as it is rubberbanded or moved across the drawing area.
         */
        trackDrag: function (event) {
            $.each(event.changedTouches, function (index, touch) {
                // Don't bother if we aren't tracking anything.
                if (touch.target.movingBox) {
                
                    // Reposition the object.
                    touch.target.movingBox.offset({
                        left: touch.pageX - touch.target.deltaX,
                        top: touch.pageY - touch.target.deltaY
                    });
                    
                    touchArea = $("#drawing-area");
                    rightBorder = touchArea.offset().left + touchArea.width();
                    bottomBorder = touchArea.offset().top + touchArea.height();
                    leftBorder = touchArea.offset().left;
                    topBorder = touchArea.offset().top;
                    
                    boxLeft = touch.target.movingBox.offset().left;
                    boxTop = touch.target.movingBox.offset().top;
                    
                    // if the box was not outside the drawing area, but now it is, highlight it red
                    if ((boxLeft > rightBorder) || (boxTop > bottomBorder) ||
                        (boxTop < (touch.target.movingBox.height() + topBorder)) || 
                        (boxLeft < (touch.target.movingBox.width() + leftBorder)))  {
                        touch.target.movingBox.removeClass("box-highlight");
                        touch.target.movingBox.addClass("box-to-be-deleted");
                        touch.target.movingBox.addClass("delete-highlight");
                        //alert("made it");
                    } else if ((boxLeft < rightBorder) || (boxTop < bottomBorder) || 
                        (boxTop > (touch.target.movingBox.height() + topBorder)) || 
                        (boxLeft > (touch.target.movingBox.width() + leftBorder))) {
                        touch.target.movingBox.removeClass("box-to-be-deleted");
                        touch.target.movingBox.removeClass("delete-highlight");
                        touch.target.movingBox.addClass("box-highlight");
                       // alert("made it2");                    
                    }
                    
                    
                    // if the box was outside the drawing area
                }
               /* if (touch.creatingbox) {
                    var newLeft, newTop, newWidth, newHeight;
                    
                    if (touch.pageX < touch.initialX) {
                        newLeft = touch.pageX;
                        newWidth = touch.initialX-touch.pageX;
                        if (touch.pageY < touch.initialY) {
                            newTop = touch.pageY;
                            newheight = touch.initialy - touch.pagey;
                        } else {
                            newTop = touch.initialY;
                            newheight = touch.pagey - touch.initialy;
                        }
                    } else { (finger is on other side)
                        newLeft = touch.initialX;
                        newWidth = touch.pageX - touch.initialX;
                        if (touch.pageY < touch.initialY) {
                            newTop = touch.pageY;
                            newheight = touch.initialy - touch.pagey;
                        } else {
                            newTop = touch.initialY;
                            newheight = touch.pagey - touch.initialy;
                        }
                    }
                    
                    touch.creatingbox
                        .offset({
                            left: newLeft,
                            top: newTop,
                        })
                        .width(newWidth)
                        .height(newHeight)
                }*/
            });
            
            // Don't do any touch scrolling.
            event.preventDefault();
        },

        /**
         * Concludes a drawing or moving sequence.
         */
        endDrag: function (event) {
            $.each(event.changedTouches, function (index, touch) {
                if (touch.target.movingBox) {
                    // Change state to "not-moving-anything" by clearing out
                    // touch.target.movingBox.
                    touch.target.movingBox = null;
                }
                //var cacheEntry = cache[touch.identifier];
                
                
                // delete cache[touchEntry.identifier]
            });
        },

        /**
         * Indicates that an element is unhighlighted.
         */
        unhighlight: function () {
            $(this).removeClass("box-highlight");
            if ($(this).hasClass("box-to-be-deleted")) {
                $(this).remove();
            }
        },

        /**
         * Begins a box move sequence.
         */
        startMove: function (event) {
            $.each(event.changedTouches, function (index, touch) {
                // Highlight the element.
                $(touch.target).addClass("box-highlight");

                // Take note of the box's current (global) location.
                var jThis = $(touch.target),
                    startOffset = jThis.offset();

                // Set the drawing area's state to indicate that it is
                // in the middle of a move.
                touch.target.movingBox = jThis;
                touch.target.deltaX = touch.pageX - startOffset.left;
                touch.target.deltaY = touch.pageY - startOffset.top;
            });

            // Eat up the event so that the drawing area does not
            // deal with it.
            event.stopPropagation();
        }

    };
});
