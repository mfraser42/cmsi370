$(function () {

    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters/" + window.location.hash.substr(1),
        function (character) {
            $("#char-props-table").find("tbody:nth-child(1)").append("<td>" + character.level + "</td>");
            $("#char-props-table").find("tbody:nth-child(2)").append("<td>" + character.classType + "</td>");
            $("#char-props-table").find("tbody:nth-child(3)").append("<td>" + character.money + "</td>");
            $("#char-props-table").find("tbody:nth-child(4)").append("<td>" + character.gender.substr(0,1) + "</td>");
            $("h1 > em > strong").text(character.name);
        }
    );
});

/*$.getJSON(
        "http://lmu-diabolical.appspot.com/characters",
        function (characters) {
            // Do something with the character list.
            characters.forEach(function (character) {
                var $characterRow = $(characterRowTemplate);
                $characterRow.find("td:nth-child(2) > a")
                    .attr({ href: "character.html#" + character.id })
                    .text(character.name);
                $characterRow.find("td:nth-child(3)").text(character.classType);
                $characterRow.find("td:nth-child(4)").text(character.gender.substr(0, 1));
                $characterRow.find("td:nth-child(5)").text(character.level);
                $characterRow.find("td:nth-child(6)").text(character.money);
                $("#characters > tbody").append($characterRow);
            });
        }
    );*/
