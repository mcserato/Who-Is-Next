'use strict';

$(document).ready( function () {

    $('#validate-btn')
        .click(function(){

            $.ajax({
                url: '/api/validate',
                method: 'POST',
                success: function(data){
                    if(!data){
                        return Materialize.toast("Error in Validation. Please try again !",2500);
                    }

                    return Materialize.toast("Successfully Validated!",1000,"",function(){
                        window.location.href = "/views/class";
                    });
                    
                },
                error: function(err){
                    return Materialize.toast(err.responseText,2500);
                }
            });

        });

});
