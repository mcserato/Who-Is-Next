var util = {
    escapeText: function (text) {
        return text
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    },

    headers: {
        'Accept': 'application/json;',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
