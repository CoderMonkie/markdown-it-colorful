# markdown-it-colorful

[中文](https://github.com/CoderMonkie/markdown-it-colorful/blob/master/README.zh-CN.md)

A plugin for `markdown-it` used to set background and foreground colors for inline text, such as highlighter effects, to achieve inline text color highlighting and beautification.

## Usage

> format changed since v2.0.0
>> ::colorful_green_white text::

### Using `umd` in the browser

[![pE9wqAK.png](https://s21.ax1x.com/2025/01/06/pE9wqAK.png)](https://imgse.com/i/pE9wqAK)

The global variable name is `markdownitcolorful`.

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>MarkdownItColorful in the browser</title>
</head>
<body>
  <div id="content"></div>
  <script src="https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/markdown-it-colorful/dist/markdown-it-colorful.min.js"></script>
  <script>
    window.addEventListener('load', function() {
      // The markdown-it variable name is markdownit
      var md = markdownit()
      // md.use(markdownitcolorful, { bgColor: 'green', color: 'white'})
      md.use(markdownitcolorful)

      var mdContent = `
# ::colorful_red_white markdown::::colorful_green_white -it-::::colorful_blue_white colorful::
## ::colorful__gray In The Browser::
### ::colorful__#1E90FF Inline::::colorful_#F08080 Text::::colorful_#ADFF2F_#001a1a *Colorful*:: ::colorful_#87CEFA_#FF8C00 **Highlight**::::colorful_green_white Beautify::
      `.trim();

      document.getElementById('content').innerHTML = md.render(mdContent)
    })
  </script>
</body>
</html>
```

### Install and Use as an NPM Package

```bash
npm i markdown-it-colorful
# or
pnpm i markdown-it-colorful
```

```js
import MarkdownIt from 'markdown-it'
import colorful from 'markdown-it-colorful'

const md = MarkdownIt();

md.use(colorful, {
  color: '#f1f1f1',
  bgColor: 'green'
})
// or
md.use(colorful)
```

> The default color value configured here can be in any format, including `#00000066`, `#f1f1f1`, `green`, `var(--theme-color)`, etc.

In the `markdown` text content:

``` text
::colorful_aliceblue_#ddd Inline Text Color Beautification::
```

Usage format: `::colorful_backgroundColor_foregroundColor arbitrary-text::`, both `_backgroundColor` and `_foregroundColor` can be omitted to use the default values specified in `md.use` options.

The color value formats supported here include:

- Hexadecimal color values (3 or 6 digits), such as `#fff`, `#ffffff`, `#000`, `#000000`
- Hexadecimal color values with transparency (8 digits), such as `#ffffff1a`, `#0000001a`
- Color names, such as `red`, `green`, `blue`

## API

### options

The `options` object is an optional parameter that can be used to configure default colors, eliminating the need to pass them in each time.

| Property | Type | Required | Default Value | Description |
|--|--|--|--|--|
|color|String|no|null|text color|
|bgColor|String|no|null|background color|
|skipWhenNoStyle|Boolean|no|false|When no color values are configured, skip the rendering of this plugin; otherwise, still render the span element with `class="colorful"`|

- When using `::colorful_bgColor_color ::` to pass in colors, the passed-in colors are used preferentially;  
- When using `::colorful ::` without passing in colors, the default colors configured in `options` are used.

The rendered `html` `span`:

```html
<span class="colorful" style="background-color:green;color:white;">text</span>
```

- When there are neither default color values nor passed-in colors during usage, and `skipWhenNoStyle` is set to `false`, a `span` element will still be rendered.
- When there are neither default color values nor passed-in colors during usage, and `skipWhenNoStyle` is set to `true`, no special rendering processing is performed by default, and continue processing the internal text.

---

### Methods

#### set

The 'set' method is used to update single or multiple property values, such as the default color value of the initial configuration.

```js
md.use(colorful, {
  color: '#f1f1f1',
  bgColor: 'green'
})

colorful.set({ color: 'white'})

// After `colorful.set` updates the property value, you'll need `md.render` to render your content again.
```
