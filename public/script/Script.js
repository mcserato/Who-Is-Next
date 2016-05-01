'use strict';

$(document).ready( function () {
    document.title += document.title
        ? ' - ' + config.TITLE
        : config.TITLE;

    $('.modal-trigger').leanModal();

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

    $(window).scroll(function() {
        if ($(document).scrollTop() > 70) {
            $(".logo").css("margin-top","0px");
            $(".logo").css("height","100px");
            $("nav").css("min-height","15%");
        } else {
            $(".logo").css("margin-top","15px");
            $(".logo").css("height","120px");
            $("nav").css("min-height","20%");
        }
    });
});
