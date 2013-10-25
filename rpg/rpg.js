// Big things have small beginnings... 
$(function () {

    var char_names = ["Slender", "AquaMan", "Honey Badger", "Potted Plant"];
    var char_levels = ["7", "22", "9001", "42"];
    var char_types = ["Creeper", "Underappreciated Hero", "Beast", "Unlucky Soul"];
    
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
    
    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters",
        function(characters) {
            characters.forEach(function(character) {
                var characterRow = "<option id=\"" + character.id + "\" + value=" + character.name + ">" + character.name + ": " + "Level " + character.level + " " + character.classType + "</option>";
                $("#character-select").append(characterRow);                
            });
        }
    );
    
    $("#edit-button").click(function() {
        window.location="character.html/#" + $("#character-select option:selected").attr("id");
    
    });
    
    $("#confirm-character-delete").click(function() { 
        var idToDelete = $("#character-select option:selected").attr("id");
        $.ajax({
            type: 'DELETE',
            url: "http://lmu-diabolical.appspot.com/characters/" + idToDelete,
            success: function (data, textStatus, jqXHR) {
                $("#" + idToDelete ).remove();
            }
        });
        $('#deleteModal').modal('hide');
    });

    $("#confirm-character-create").click(function() {
        if ($("#create-char-name").val() && $("#create-char-class").val()) {
  //      var characterRow = "<option id=\"" + character.id + "\" + value=" + character.name + ">" + character.name + ": " + "Level " + character.level + " " + character.classType + "</option>";
            $.ajax({
                type: 'POST',
                url: "http://lmu-diabolical.appspot.com/characters",
                data: JSON.stringify({
                    name: $("#create-char-name").val(),
                    classType: $("#create-char-class").val(),
                    gender: $("#create-char-sex").val(),
                    level: 1,
                    money: 500
                }),
                contentType: "application/json",
                dataType: "json",
                accept: "application/json",
                complete: function (jqXHR, textStatus) {
                    // The new character can be accessed from the Location header.
                    console.log("You may access the new character at:" +
                        jqXHR.getResponseHeader("Location"));
              //      $("#character-select").append(characterRow)
                }
            });
            $('#createModal').modal('hide');
        } else {
            alert("You must enter the following fields.");
        } 
    });
    
    // Cleanup after closure of modal.
    $('#createModal').on('hidden.bs.modal', function () {
        $("#create-char-name, #create-char-class, #create-char-sex").val("");
    });


});





