var list = "none";
/* All of the possible values for "list" and their corresponding IDs are:
 * full     #list-full
 * length     #list-length
 */

$('#list-full').hide();
$('#list-length').hide();

$('#B-full').click(function(){
    if(list !== "full"){
        $('#list-full').show();
        list = "full";
    } else {
        $('#list-full').hide();
        list = "none";
    }
});

$('#B-length').click(function(){
    if(list !== "length"){
        $('#list-length').show();
        list = "length";
    } else {
        $('#list-full').hide();
        list = "none";
    }
});