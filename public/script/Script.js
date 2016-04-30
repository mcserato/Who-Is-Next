'use strict';

$(document).ready( function () {
    document.title += document.title
        ? ' - ' + config.TITLE
        : config.TITLE;


    if(!localStorage.user &&
        window.location.href != config.FRONTEND_URL){
        window.location.href = '/';
    }


    $('.menu')
        .hover(
        function(){
            $(this).addClass("btn-large");
        },
        function(){
            $(this).removeClass("btn-large");
        });

    $('#logout-btn')
        .click(function(){

            $.ajax({
                url: '/api/logout',
                method: 'POST',
                success: function(data){
                    if(!data){
                        return Materialize.toast("Error in Logout. Please try again !",2500);
                    }

                    localStorage.clear();
                    return Materialize.toast(data,1000,"",function(){
                        window.location.href = "/";
                    });
                },
                error: function(err){
                    return Materialize.toast(err.responseText,2500);
                }
            });

        });
if ($('input[type="checkbox"]').is(':checked')) {
    console.log("sd");
$('#password')[0].setAttribute('type','text');

} else {
$('#password')[0].setAttribute('type','password');
}

});

$('.modal-trigger').leanModal();








