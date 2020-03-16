# hexo-html-truncate
>-- A Hexo plugin to truncate html by only counting word filtering out html tags

<p>
  <a href="https://circleci.com/gh/TriDiamond/hexo-html-truncate/tree/master"><img src="https://img.shields.io/circleci/project/github/TriDiamond/hexo-html-truncate.svg" alt="Build Status"></a>
  <a href="https://github.com/TriDiamond/hexo-html-truncate/stargazers"><img src="https://img.shields.io/github/stars/TriDiamond/hexo-html-truncate.svg" alt="Github starts"></a>
  <a><img src="https://img.shields.io/github/license/TriDiamond/hexo-html-truncate.svg" alt="License"></a>
  <a href="https://www.npmjs.com/package/hexo-html-truncate"><img src="https://img.shields.io/npm/dt/hexo-html-truncate.svg" alt="License"></a>
</p>

# Install

```shell
npm install hexo-html-truncate --save
```

# Options
```js
/**
 * truncate html
 * @method truncate(html, [length], [options])
 * @param  {String|CheerioStatic}         html    html string to truncate, or  existing cheerio instance(aka cheerio $)
 * @param  {Object|number}  length how many letters(words if `byWords` is true) you want reserve
 * @param  {Object|null}    options
 * @param  {Boolean}        [options.stripTags] remove all tags, default false
 * @param  {String}         [options.ellipsis] ellipsis sign, default '...'
 * @param  {Boolean}        [options.decodeEntities] decode html entities(e.g. convert `&amp;` to `&`) before
 *                                                   counting length, default false
 * @param  {String|Array}   [options.excludes] elements' selector you want ignore
 * @param  {Number}         [options.length] how many letters(words if `byWords` is true)
 *                                           you want reserve
 * @param  {Boolean}        [options.byWords] if true, length means how many words to reserve
 * @param  {Boolean|Number} [options.reserveLastWord] how to deal with when truncate in the middle of a word
 *                                1. by default, just cut at that position.
 *                                2. set it to true, with max exceed 10 letters can exceed to reserver the last word
 *                                3. set it to a positive number decide how many letters can exceed to reserve the last word
 *                                4. set it to negetive number to remove the last word if cut in the middle.
 * @param  {Boolean}        [options.trimTheOnlyWord] whether to trim the only word when `reserveLastWord` < 0
 *                                if reserveLastWord set to negetive number, and there is only one word in the html string,
 *                                 when trimTheOnlyWord set to true, the extra letters will be cutted if word's length longer
 *                                 than `length`.
 *                                see issue #23 for more details
 * @param  {Boolean}        [options.keepWhitespaces] keep whitespaces, by default continuous
 *                                spaces will be replaced with one space
 *                                set it true to reserve them, and continuous spaces will count as one
 * @return {String}
 */
```

# Default Options
```js
{
  byWords: false,
  stripTags: false,
  ellipsis: '...',
  decodeEntities: false,
  keepWhitespaces: false,
  excludes: '',
  reserveLastWord: false,
  keepWhitespaces: false
}
```

# Usage

```js
// content: post html content
// length: truncate word length
// options: check out the API part of this 
//          document for avaliable options
htmlTruncate(content, length, options);
```

## Swig

```html
   <div class="content">
        {{ htmlTruncate(post.content, 100, {
            ellipsis: '...',
            excludes: ['img'],
            keepWhitespaces: true,
            reserveLastWord: true
        }) }}
    </div>
```

## Ejs

```html
   <div class="content">
        <%- htmlTruncate(post.content, 100, {
            ellipsis: '...',
            excludes: ['img'],
            keepWhitespaces: true,
            reserveLastWord: true
        }) %>
    </div>
```

## Jade

```js
    span.post-count= htmlTruncate(post.content, 100, {
            ellipsis: '...',
            excludes: ['img'],
            keepWhitespaces: true,
            reserveLastWord: true
        })
```

# License

MIT

# Reference/Source

Base on the package [mehwww/vue-sticky-directive](https://github.com/oe/truncate-html#readme), this package just compiled the package into a hexo plugin for easier use in hexo.
