var navbar = {
    init: function (navbar) {

        $(navbar).append([
            '<div class="navbar-fixed">',
            '<ul id="user-settings" class="dropdown-content">',
                '<li><a href="#">Edit Information</a></li>',
                '<li class="divider"></li>',
                '<li><a href="#">Change Password</a></li>',
                '<li class="divider"></li>',
                '<li><a href="/views/switch_theme">Switch Theme</a></li>',
                '<li class="divider"></li>',
                '<li><a id="logout-btn" href="#">Logout</a></li>',
            '</ul>',
                '<div class="navbar-wrapper">',
                    '<nav class="z-depth-0">',
                        '<a href="/" class="brand-logo black-text center">',
                            '<img src="/../../icon/logo1.png" class="logo"/>',
                        '</a>',
                          '<ul class="user-menu right">',
                            '<li><h5 id="user-name" style="margin-top:35px;"></h5></li>',
                            '<li>',
                                '<a href="#" id="settings" class="btn black btn-large btn-circle dropdown-button" style="margin-top:20px;" data-activates="user-settings">',
                                    '<i class="material-icons">settings</i>',
                                '</a>',
                            '</li>',
                          '</ul>',
                    '</nav>',
                '</div>',
            '</div>'      
        ].join(''));


        $('.dropdown-button').dropdown({
               inDuration: 300,
               outDuration: 225,
               constrain_width: false, 
               hover: false, 
               gutter: -20, 
               belowOrigin: true 
               }
        );

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

        this.manipulateDOM();
    },

    manipulateDOM: function() {
        var user_name = JSON.parse(localStorage.user).username;
        $('#user-name').html(user_name);
    },
}
