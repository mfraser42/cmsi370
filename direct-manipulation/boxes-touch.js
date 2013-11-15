$(function () {
    var cache = {};
    
    window.BoxesTouch = {
        /**
         * Sets up the given jQuery collection as the drawing area(s).
         */
        setDrawingArea: function (jQueryElements) {
            // Set up any pre-existing box elements for touch behavior.
            jQueryElements
                .addClass("drawing-area")

                // Event handler setup must be low-level because jQuery
                // doesn't relay touch-specific event properties.
                .each(function (index, element) {
                    element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
                    element.addEventListener("touchend", BoxesTouch.endDrag, false);
                    element.addEventListener("touchstart", BoxesTouch.startCreate, false);
                })

                .find("div.box").each(function (index, element) {
                    element.addEventListener("touchstart", BoxesTouch.startMove, false);
                    element.addEventListener("touchend", BoxesTouch.unhighlight, false);
                });
        },

        startCreate: function (event) {
            $.each(event.changedTouches, function (index, touch) {
                var cacheEntry = { };
                touchIndex = touch.indentifier;                
                cacheEntry.initialX = touch.pageX;
                cacheEntry.initialY = touch.pageY;
                
                var newBox = '<div class="box" style="width: 0px; height:0px; left:' + touch.pageX + 'px; top: ' + touch.pageY + 'px"></div>';
                $("#drawing-area").append(newBox);
                
                touch.target.creatingBox = $("div div:last-child");
                touch.target.creatingBox.addClass("create-highlight");
                cacheEntry.creatingBox = touch.target.creatingBox;
                cache[touchIndex] = cacheEntry;
                
                $("#drawing-area").find("div.box").each(function (index, element) {
                    element.addEventListener("touchstart", BoxesTouch.startMove, false);
                    element.addEventListener("touchend", BoxesTouch.unhighlight, false);
                });
                
             //    
               // BoxesTouch.toucheCache[touchIndex].initialX = touch.pageX;
                //BoxesTouch.toucheCache[touchIndex].initialY = touch.pageY; 
            });
        },       

        /**
         * Tracks a box as it is rubberbanded or moved across the drawing area.
         */
        trackDrag: function (event) {
            $.each(event.changedTouches, function (index, touch) {
                // Don't bother if we aren't tracking anything.
                touchIndex = touch.indentifier;
                cacheEntry = cache[touchIndex];
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
                    boxHeight = touch.target.movingBox.height();
                    boxWidth = touch.target.movingBox.width();
                    
                    // if the box was not outside the drawing area, but now it is, highlight it red
                    if ((boxLeft > rightBorder) || (boxTop > bottomBorder) ||
                        (boxTop < (topBorder - boxHeight)) || (boxLeft < (leftBorder - boxWidth)))  {
                        touch.target.movingBox.removeClass("box-highlight");
                        touch.target.movingBox.addClass("box-to-be-deleted");
                        touch.target.movingBox.addClass("delete-highlight");
                    } else if ((boxLeft < rightBorder) || (boxTop < bottomBorder) || 
                        (boxTop > (topBorder - boxHeight)) || 
                        (boxLeft > (leftBorder - boxWidth))) {
                        touch.target.movingBox.removeClass("box-to-be-deleted");
                        touch.target.movingBox.removeClass("delete-highlight");
                        touch.target.movingBox.addClass("box-highlight");     
                    }
                }
                
                if (cacheEntry.creatingBox) {
                    var newLeft, newTop, newWidth, newHeight;
                    
                    if (touch.pageX < cacheEntry.initialX) {
                        newLeft = touch.pageX;
                        newWidth = cacheEntry.initialX - touch.pageX;
                        if (touch.pageY < cacheEntry.initialY) {
                            newTop = touch.pageY;
                            newHeight = cacheEntry.initialY - touch.pageY;
                        } else {
                            newTop = cacheEntry.initialY;
                            newHeight = touch.pageY - cacheEntry.initialY;
                        }
                    } else { //(finger is on other side)
                        newLeft = cacheEntry.initialX;
                        newWidth = touch.pageX - cacheEntry.initialX;
                        if (touch.pageY < cacheEntry.initialY) {
                            newTop = touch.pageY;
                            newHeight = cacheEntry.initialY - touch.pageY;
                        } else {
                            newTop = cacheEntry.initialY;
                            newHeight = touch.pageY - cacheEntry.initialY;
                        }
                    }
                    
                    cacheEntry.creatingBox
                        .offset({
                            left: newLeft,
                            top: newTop
                        })
                        .width(newWidth)
                        .height(newHeight)
                }
                cache[touchIndex] = cacheEntry;
            });
            
            // Don't do any touch scrolling.
            event.preventDefault();
        },

        /**
         * Concludes a drawing or moving sequence.
         */
        endDrag: function (event) {
            $.each(event.changedTouches, function (index, touch) {
                touchIndex = touch.indentifier;
                cacheEntry = cache[touchIndex];
                if (touch.target.movingBox) {
                    // Change state to "not-moving-anything" by clearing out
                    // touch.target.movingBox.
                    touch.target.movingBox = null;
                }
                if (cacheEntry) {
                    cacheEntry.creatingBox.removeClass("create-highlight");
                    cacheEntry.creatingBox = null;
                }
                delete cache[touchIndex];
            });
        },

        /**
         * Indicates that an element is unhighlighted.
         */
        unhighlight: function () {
            $(this).removeClass("box-highlight");
           // $(this).removeClass("create-highlight");
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
