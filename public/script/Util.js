var util = {
    escapeText: function (text) {
        return text
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
}
