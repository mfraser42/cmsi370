/* 
    index.js - Javascript corresponding to the index page (index.html) of Puzzles RPG.
    Author: Michael Fraser
*/
$(function () {
    
    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters",
        function(characters) { // JD: Add a space after the function keyword.
            characters.forEach(function(character) {
                // JD: When using quotes in a string, you can delimit with apostrophes.  Slightly
                //     more readable, e.g. '<option id="boo">'.
                var characterRow = "<option id=\"" + character.id + "\" + value=" + character.name + ">" 
                + character.name + ": " + "Level " + character.level + " " + character.classType + "</option>";
                $("#character-select").append(characterRow);                
            });
        }
    );

    // JD: Given this click handler, why not just make #edit-button an <a href="character.html"> ???
    $("#edit-button").click(function() {
        window.location="character.html"; //#" + $("#character-select option:selected").attr("id");
    
    });
    
    $("#confirm-character-delete").click(function() { 
        var idToDelete = $("#character-select option:selected").attr("id");
        // JD: What if $("#character-select option:selected") is empty?
        //     Think about how you might handle that case.
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
                    gender: $("#create-char-sex").val(), // JD: Remember this is case sensitive.
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
                    // JD: The way you handle this callback is left somewhat hanging (no pun
                    //     indented, haha).  At the very least, wouldn't a reload have helped?
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





