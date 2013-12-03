/* 
    index.js - Javascript corresponding to the index page (index.html) of Puzzles RPG.
    Author: Michael Fraser
*/
$(function () {
    
    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters",
        function (characters) { // JD: Add a space after the function keyword.
            characters.forEach(function (character) {
                var characterRow = '<option id="' + character.id + '" + value=' + character.name + ">" 
                + character.name + ": " + "Level " + character.level + " " + character.classType + "</option>";
                $("#character-select").append(characterRow);                
            });
        }
    );

    // JD: Given this click handler, why not just make #edit-button an <a href="character.html"> ???
    $("#edit-button").click(function () {
        window.location="character.html"; //#" + $("#character-select option:selected").attr("id");
    
    });
    
    $("#confirm-character-delete").click(function () { 
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

    $("#confirm-character-create").click(function () {
        var charSex = $("#create-char-sex").val().toUpperCase();
        if ($(".drop-area").val() && $("#create-char-class").val() && ((charSex === "FEMALE") || (charSex === "MALE"))) {
            $.ajax({
                type: 'POST',
                url: "http://lmu-diabolical.appspot.com/characters",
                data: JSON.stringify({
                    name: $(".drop-area").val(),
                    classType: $("#create-char-class").val(),
                    gender: charSex, 
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
                    location.reload();
                }
            });
            $('#createModal').modal('hide');
        } else {
            alert('You must enter information into the provided fields, and enter "male" or "female" for the character sex.');
        } 
    });
    
    // Cleanup after closure of modal.
    $('#createModal').on('hidden.bs.modal', function () {
        $(".drop-area, #create-char-class, #create-char-sex").val("");
    });

    /*
        Use the scrabble keyboard plugin for the character creation input in the character creation modal. Modify the placeholder text also.
    */
    $("#create-char-name").scrabble_keyboard({
    });
    
    $(".drop-area").attr("placeholder", "Character Name");

});
