'use strict';

$(document).ready( function () {

    $('#validate-btn')
        .click(function(){

            if(confirm("This is only a test feature. Would you like to continue ?")){
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
            }
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
                    if(err.responseText == "No one is logged in."){
                        localStorage.clear();
                        Materialize.toast(err.responseText,1000, "", function(){
                            document.location.reload();
                        });
                    }else{
                        Materialize.toast(err.responseText,2000);
                    }
                }
            });

        });

});
