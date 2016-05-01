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
            /*
                add ADMIN sidebar options here
                    
            */

            $('$sidebar').click();
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
            ].join(''));
            
            $('#sidebar-link').click();
        }

        else {
            console.error(user.role, 'role not found.');
            $('#sidebar').hide();
        }
    }
}
