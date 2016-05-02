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
            '<a href="//www.facebook.com/teletubbies">Contact us</a>',
            '<a href="#!">More links</a>'
        ].join(' '));
    },
}
