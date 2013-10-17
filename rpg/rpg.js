// Big things have small beginnings... 
$(function () {

    var characters = ["Level 7 Slender", "Level 22 AquaMan", "Level 9001 Honey Badger", "Level 42 Potted Plant"];

    $('#confirm-character-delete').click(function () {
        //characters.splice(characters.indexOf(
        $('#deleteModal').modal('hide');
    });
    
    var inv_items = new Array();
    inv_items.push("Wirt's Leg");
    inv_items.push("Potato");
    
    var random_items = ["A Crooked Seven", "Pocket Lint", "Microprocessor", "Left Shoe", "Pen", "Scroll on Interaction Design", "Wirt\'s Leg", "Potato"];
    
    $( "#random_item" ).click(function () {
        if (inv_items.length == 9) {
            alert("Inventory is full.");
        } else {
            var rand_index = Math.floor(Math.random()*random_items.length);
            $( "#inventory" ).append("<tr> <td> " + random_items[rand_index] + " </td> </tr>");
            inv_items.push(random_items[rand_index]);
        }
    });
    
    $("#confirm-character-create").click(function () {
        if ($("#create_char_name").val()) {
            characters.push( "Level 1 " + $("#create_char_name").val());
            $("#character-list").append("<li class=\"list-group-item\"> <div class=\"row\"> <div class=\"col-md-3\"> <img src=\"http://placehold.it/40x30\"> </div> <div class=\"col-md-9\"> Level 1 " + $("#create_char_name").val() + " </div> </div> </li>");
            $("#createModal").modal('hide');
        } else {
            alert("You must enter a name.");
        }
        
    });
    

});


