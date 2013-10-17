// Big things have small beginnings...
$(function () {


    $('#confirm-character-delete').click(function () {
        console.log("Delete confirmed!");
        $('#deleteModal').modal('hide');
    });
    
    var inv_items = new Array();
    inv_items.push("Wirt's Leg");
    inv_items.push("Potato");
    
    var random_items = ["A Crooked Seven", "Pocket Lint", "A Microprocessor", "A Left Shoe", "A Pen", "Scroll on Interaction Design"];
    
    $( "#random_item" ).click(function () {
        if (inv_items.length == 9) {
            alert("Inventory is full.");
        } else {
            var rand_index = Math.floor(Math.random()*random_items.length);
            $( "#inventory" ).append("<tr> <td> " + random_items[rand_index] + " </td> </tr>");
            inv_items.push(random_items[rand_index]);
        }
    });

});

// click might be button specific, onclick() is just clicking everywhere? like mouse clicks?

