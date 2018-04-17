var list = "none";
/* All of the possible values for "list" and their corresponding IDs are:
 * full     #list-full
 * length     #list-length
 */

$('#list-full').hide();
$('#list-length').hide();

$('#B-full').click(function(){
    if(list !== '#list-full'){
        $('#list-full').show();
        list = '#list-full';
    } else {
        $('#list-full').hide();var list = "none";
/* All of the possible values for "list" and their corresponding IDs are:
 * full     #list-full
 * length     #list-length
 */

$('#list-full').hide();
$('#list-length').hide();

//Clicking the full list button:
$('#B-full').click(function(){
    if(list === '#list-full'){
        list = "none";
    } else {
        list = '#list-full';
    }
    showHide();
});

//Clicking the length list button:
$('#B-length').click(function(){
    if(list === '#list-length'){
        list = "none";
    } else {
        list = '#list-length';
    }
    showHide();
});

function showHide(){
    if(list === '#list-full'){
        $('#list-full').show();
        $('#list-length').hide();
    } else if (list === '#list-length'){
        $('#list-length').show();
        $('#list-full').hide();
    } else {
        $('#list-length').hide();
        $('#list-full').hide();
    }
}

/*$('#B-full').click(function(){
    if(list !== '#list-full'){
        $('#list-full').show();
        list = '#list-full';
    } else {
        $('#list-full').hide();
        list = "none";
    }
});

$('#B-length').click(function(){
    if(list !== "length"){
        //$('#list-length').show();
        list = "length";
    } else {
        //$('#list-length').hide();
        list = "none";
    }
});*/

//I think this makes Popcode lag
/*while(1 > 0){
    if(list === null){
        break;
    }
    if(list === '#list-full'){
    $('#list-full').show();
    } else {
    $('#list-full').hide();
    }
}*/
        list = "none";
    }
});

$('#B-length').click(function(){
    if(list !== "length"){
        //$('#list-length').show();
        list = "length";
    } else {
        //$('#list-length').hide();
        list = "none";
    }
});

//I think this makes Popcode lag
/*while(1 > 0){
    if(list === null){
        break;
    }
    if(list === '#list-full'){
    $('#list-full').show();
    } else {
    $('#list-full').hide();
    }
}*/
