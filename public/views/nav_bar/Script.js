var navbar = {
    init: function (navbar) {

        $(navbar).append([
            '<div class="navbar-fixed">',
            '<ul id="user-settings" class="dropdown-content">',               
                '<li>',
                    '<a id="edit-user-btn" title="Edit User" href="#edit-user-modal" class="modal-trigger">Edit Profile</a>',
                '</li>',
                '<li class="divider"></li>',
                '<li><a href="/views/switch_theme">Switch Theme</a></li>',
                '<li class="divider"></li>',
                '<li><a id="logout-btn" href="#">Logout</a></li>',
            '</ul>',
                '<div class="navbar-wrapper">',
                    '<nav class="z-depth-0">',
                        '<a href="/" class="brand-logo black-text center">',
                            '<img id="logo-holder" src="/../../icon/logo1.png" class="logo"/>',
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
            '</div>',
            '<div id="edit-user-modal" class="modal">',
            '<div class="modal-content">',
                '<h2>Edit User</h2>',
                '<form id="edit-user-form">',
                    '<div class="input-field">',
                        '<input id="name_edit" type="text" class="validate" placeholder=""/>',
                        '<label for="name_edit">Name</label>',
                    '</div>',
                    '<div class="input-field">',
                        '<input id="email_edit" type="email" class="validate" placeholder=""/>',
                        '<label for="email_edit">Email Address</label>',
                    '</div>',
                    '<div class="input-field">',
                        '<input disabled id="username_edit" type="text" class="validate" placeholder=""/>',
                        '<label for="username_edit">Username</label>',
                    '</div>',
                    '<div class="input-field">',
                        '<input id="new_password_edit" type="password" class="validate" placeholder=""/>',
                        '<label for="new_password_edit">New Password</label>',
                    '</div>',
                    '<div class="input-field">',
                        '<input id="cnew_password_edit" type="password" class="validate" placeholder=""/>',
                        '<label for="cnew_password_edit">Confirm New Password</label>',
                    '</div>',

                    '<div class="input-field">',
                        '<span id="confirm-message"> Enter Current Password to Save Changes:</span>',
                        '<input id="current_password" type="password" class="validate"/>',
                    '</div>',
                '</form>',
                '</div>',
                '<div class="modal-footer">',
                        '<button id="edit-user-button" type="submit" class="modal-action btn waves-light waves-effect">',
                            '<i class="material-icons">done</i>',
                        '</button>',
                '</div>',
            '</div>',
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

        $('.modal-trigger').leanModal();

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


                 /* Fills Up Areas */
         $.ajax({
                type: "GET",
                url: "/api/faculty/"+ JSON.parse(localStorage.user).emp_num
             }).done(function(info){
                $("#name_edit").val(info[0].name);
                $("#email_edit").val(info[0].email);
                $("#username_edit").val(info[0].username);
             });   
            

            /*Edit User*/
        $('#edit-user-button').click(function () {
            // Get data from input fields of edit user form
            var name = $("#name_edit").val();
            var email = $("#email_edit").val();
            var username = $("#username_edit").val();
            var new_password = $("#new_password_edit").val();
            var cnew_password = $("#cnew_password_edit").val();
            var old_password = $("#current_password").val();

            if (new_password != cnew_password) {
                Materialize.toast("New passwords does not match !",1500);
                return false;
            }else if(old_password == "" || old_password.trim()==""){
                Materialize.toast("Please enter your current password !",1500);
                return false;
            }else{

                $.ajax({
                    type: "PUT",
                    url: "/api/faculty",
                    data: {
                        name: name,
                        password: new_password,
                        email: email,
                        old_password : old_password
                    },
                    dataType: "JSON",
                    success: function(){
                        Materialize.toast("Account successfully edited!", 1000,"",
                            function(){
                                document.location.reload();
                            });
                    },
                    error:function(err){
                        Materialize.toast(err.responseText, 1000);
                    }
                });

                return true;
            }
        });

        this.manipulateDOM();
    },

    manipulateDOM: function() {
        var user_name = JSON.parse(localStorage.user).username;
        $('#user-name').html(user_name);
    },
}
