$(document).ready(function(){
    console.log("I was correctly inited");
    $("#search-submit").click(function(event) {
        console.log("click event");

        event.preventDefault();

        //Difficulty and length aren't here because the user can't search using them:
        var trailName = $("#searchName").val();
        var trailLocation = $("#searchLocation").val();
        var trailType = $("#searchType").val();

        var queryString = "/trails" + "?name=" + trailName + "&location=" + trailLocation + "&type=" + trailType;
        console.log("query string:" + queryString);

        $.getJSON( queryString, function (json) {
            console.log(json);

            var items = [];
            items.push( "<tr> <th>Name:</th> <th>Length (Miles):</th> <th>Difficulty:</th> <th>Location:</th> <th>Type:</th> </tr>")

            $.each( json, function( key, val ) {
                var newDifficulty = "";
                if (val.difficulty != null){
                    newDifficulty =  val.difficulty + "/10";
                }

                items.push( "<tr>" + "<td>" + val.name + "</td>" + "<td>" + val.length + "</td>" + "<td>" + newDifficulty + "</td>" + "<td>" + val.location + "</td>" + "<td>" + val.type + "</td>" + "</tr>");
            });
            //items.push("</table>");
            $("#searchResults").html(items);
        });
    });
});

function ridNull(val){
    if (val == null){
        return " ";
    } else {
        if (val == val.difficulty)
        return val.difficulty + "/10";
    }
}

//Changes:
//Added "miles" in line 23
//Added difficulty
//Added the type category
//Attemted to exclude any null values (and failed (it's commented out now))
