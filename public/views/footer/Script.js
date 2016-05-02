var footer = {
    init: function (footer, page) {
        page = page || 'user';

        $(footer).append([
            '<hr/>',
            '<span id="copyright-year">©</span>',
            '<span id="footer-links" class="right"></span>'
        ].join(''));

        this.manipulateDOM(page);
    },

    manipulateDOM: function(page) {
        if (page !== 'user' && page !== 'landing') {
            return console.error('Footer not loaded properly.', page, 'is not a valid page');
        }

        else if (page === 'user') {
            
        }

        else if (page === 'landing') {
            
        }

        $('#copyright-year').append([
            new Date().getFullYear(),
            'All rights reserved.'
        ].join(' '));
        
        $('#footer-links').append([
            '<p><a href="//www.facebook.com/teletubbies">Contact us</a></p>',
            '<p><a href="#!">More links</a></p>'
        ].join(' '));
    },
}



$('#footer').append([
        "<div class='row'>",
            "<div class='col s9'",
                '<h2 id="heading"> Description</h2>',
                '<p id = "intro" class ="left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
            "</div>",
            "<div class ='col s3'>",
                 '<p id="footer-links" class="center"></p>',
            "</div>",
        "</div>",




           
            '<p id="copyright-year" class="center">©</p>'
        ].join(''));

 $('#copyright-year').append([
            new Date().getFullYear(),
            'All rights reserved.'
        ].join(' '));
$('#footer-links').append([
            '<p><a href="//www.facebook.com/teletubbies">Contact us</a></p>',
            '<p><a href="#!">More links</a></p>'
        ].join(' '));

$('#footer').css({
    'width':'100%',
    'height':'relative',
    'background-color':'rgb(192,192,192)',
    'padding':'2vw 4vw 0.2vw 4vw',
    'box-shadow': '1vw 0 0 0 rgba(0, 0, 0, 0.2)',
    'border-top': '0.3vw solid #CB494E',
    'margin':'30vh 0 0 0',
    'bottom':'0'
});
$('#heading').css({
    "color":'white',
    "font-size":"1.9vw"
});
$('#intro').css({
    "color":'black',
    "font-size":"1.1vw"
})

 $('#copyright-year').css({
    'text-align':'center'
 });