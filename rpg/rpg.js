// Big things have small beginnings... 
$(function () {

    var char_names = ["Slender", "AquaMan", "Honey Badger", "Potted Plant"];
    var char_levels = ["7", "22", "9001", "42"];
    var char_types = ["Creeper", "Underappreciated Hero", "Beast", "Unlucky Soul"];

    $('#confirm-character-delete').click(function () {
//        $("#" + $("#char-to-be-deleted")).remove();
//        index = har_names.indexOf($("#char-to-be-deleted"));
//        char_names.splice(index,1);
//        char_levels.splice(index,1);
//        char_types.splice(index,1);
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
            char_names.push($("#create_char_name").val());
            char_levels.push("1");
            char_types.push($("#class-select").val());
            $("#character-list").append("<li id=" + $("#create_char_name").val() + " class=\"list-group-item\"> <div class=\"row\"> <div class=\"col-md-3\"> <img src=\"http://placehold.it/40x30\"> </div> <div class=\"col-md-9\"> " + $("#create_char_name").val() + ": Level 1 " + $("#class-select").val() + " </div> </div> </li>");
           // window.location = "character.html#" + $("#create_char_name").val() +$("#class-select").val();
           $("#createModal").modal('hide');
        } else {
            alert("You must enter a name.");
        } 
    });
    
    $(document).ready( function () {
        for (var o = 0; o < char_names.length; o++) {
            $("#character-list").append("<li class=\"list-group-item\"> <div class=\"row\"> <div class=\"col-md-3\"> <img src=\"http://placehold.it/40x30\"> </div> <div class=\"col-md-9\"> " + char_names[o] +": Level " + char_levels[o] + " " + char_types[o] + " </div> </div> </li>");
        }
    });

});


