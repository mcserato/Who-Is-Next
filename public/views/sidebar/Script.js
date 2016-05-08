var sidebar = {
    init: function (main_content) {
        $(main_content).append([
            '<div class="fixed-action-btn click-to-toggle">',
                '<a id="sidebar-link" class="btn-floating btn-large red z-depth-0 black" title="">',
                    '<i class="large material-icons">menu</i>',
                '</a>',
                '<ul id="sidebar-list">',
                '</ul>',
            '</div>'
        ].join(''));

        this.manipulateDOM();

    },
    
    manipulateDOM: function () {
        var user = JSON.parse(localStorage.user),
            list = $('#sidebar-list');

        if (user.role === 'ADMIN') {
            list.append([
                '<li>',
                    '<a href="/views/admin" class="btn-floating black" href="" title="Validate Faculty">',
                        '<i class="material-icons">person_add</i>',
                    '</a>',
                '</li>',
                '<li>',
                    '<a href="/views/faculty" class="btn-floating black" href="" title="View Faculty">',
                        '<i class="material-icons">group</i>',
                    '</a>',
                '</li>',
                '<li>',
                    '<a href="/views/student" class="btn-floating black" href="" title="View Students">',
                        '<i class="material-icons">face</i>',
                    '</a>',
                '</li>',
            ].join(''));

            $('#sidebar-link').click();
        }

        else if (user.role === 'FACULTY') {
            list.append([
                '<li>',
                    '<a href="/views/get_volunteers" class="btn-floating black" title="Get Volunteers">',
                        '<i class="material-icons">loop</i>',
                    '</a>',
                '</li>',
                '<li>',
                    '<a href="/views/class" class="btn-floating black" title="Class">',
                        '<i class="material-icons">class</i>',
                    '</a>',
                '</li>',
                '<li>',
                    '<a href="/views/student" class="btn-floating black" title="Students">',
                        '<i class="material-icons">face</i>',
                    '</a>',
                '</li>',
            /*Features not working
                '<li>',
                    '<a href="/views/logs" class="btn-floating black" title="Logs">',
                        '<i class="material-icons">content_paste</i>',
                    '</a>',
                '</li>',
                '<li>',
                    '<a href="/views/analytics" class="btn-floating black" title="Analytics">',
                        '<i class="material-icons">insert_chart</i>',
                    '</a>',
                '</li>',
            */
                '<li>',
                    '<a href="/views/save_point" class="btn-floating black" title="Save Point">',
                        '<i class="material-icons">archive</i>',
                    '</a>',
                '</li>'
            
            ].join(''));
            
            $('#sidebar-link').click();
        }

        else {
            console.error(user.role, 'role not found.');
            $('#sidebar').hide();
        }
    }
}
