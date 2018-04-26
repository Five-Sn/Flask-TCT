$(document).ready(function(){
    console.log("I was correctly inited");
    $("#search-submit").click(function(event) {
        console.log("click event");

        event.preventDefault();

        var trailLength = $("#length").val();
        var trailName = $("#searchName").val();
        var trailLocation = $("#location").val();

        var queryString = "/trails" + "?name=" + trailName + "&length=" + trailLength + "&location=" + trailLocation;
        console.log("query string:" + queryString);

        $.getJSON( queryString, function (json) {
            console.log(json);

            var items = [];
            items.push("<ul>");

            $.each( json, function( key, val ) {
                items.push( "<li>" + "Name: " + val.name + " | " + "Length: " + val.length + " | " + "Location: " + val.location + "</li>" );
            });
            items.push("</ul>");
            $("#searchResults").html(items);
        });
    });
});
