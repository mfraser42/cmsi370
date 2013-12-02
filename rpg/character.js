/* 
    character.js - Javascript corresponding to the character page (character.html) of Puzzles RPG.
    Author: Michael Fraser
*/
$(function () {
    var inv_items = new Array();
    
    var random_items = ["A Crooked Seven", "Pocket Lint", "Microprocessor", "Left Shoe", "Pen", "Scroll on Interaction Design", "Wirt\'s Leg", "Potato"];

    $( "#random_item" ).click(function () {
        if (inv_items.length === 9) { 
            alert("Inventory is full.");
        } else {
            var rand_index = Math.floor(Math.random() * random_items.length);
            $("#inventory").append("<tr><td> " + random_items[rand_index] + " </td></tr>");
            inv_items.push(random_items[rand_index]);
        }
    }); 
});    
