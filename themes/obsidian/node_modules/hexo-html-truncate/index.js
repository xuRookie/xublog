var truncateHtml = require('truncate-html');

hexo.extend.helper.register('htmlTruncate', function (content, length = 30, options = {}) {
    return truncateHtml(content, length, options);
});