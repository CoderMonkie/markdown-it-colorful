# markdown-it-colorful

[中文](https://github.com/CoderMonkie/markdown-it-colorful/blob/master/README.zh-CN.md)

A plugin for `markdown-it` used to set background and foreground colors for inline text, such as highlighter effects, to achieve inline text color highlighting and beautification.

## Usage

### Using `umd` in the browser

[![pEpYZDS.png](https://s21.ax1x.com/2025/01/03/pEpYZDS.png)](https://imgse.com/i/pEpYZDS)

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
      console.log('window load', markdownitcolorful)
      console.log('markdownit', markdownit)
      // The markdown-it variable name is markdownit
      var md = markdownit()
      // md.use(markdownitcolorful, { bgColor: 'green', color: 'white'})
      md.use(markdownitcolorful)

      var mdContent = `
# :colorful_red_white markdown::colorful_green_white -it-::colorful_blue_white colorful:
## :colorful__gray In The Browser:
### :colorful__#1E90FF Inline::colorful_#F08080 Text::colorful_#ADFF2F_#001a1a Color::colorful_#87CEFA_#FF8C00 Highlight::colorful_green_white Beautify:      
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

In the `markdown` text content:

``` text
:colorful_aliceblue_#ddd Inline Text Color Beautification:
```

Usage format: `:colorful_backgroundColor_foregroundColor text:`, both `_backgroundColor` and `_foregroundColor` can be omitted to use the default values (specified in `md.use` options).

## API

### options

The `options` object is an optional parameter that can be used to configure default colors, eliminating the need to pass them in each time.

| Property | Type | Required | Default Value | Description | 
|--|--|--|--|--|
|color|String|no|null|text color|
|bgColor|String|no|null|background color|

When using `:colorful_bgColor_color :` to pass in colors, the passed-in colors are used preferentially;  
when using `:colorful :` without passing in colors, the default colors configured in `options` are used.

The rendered `html` `span`:

```html
<span style="background-color:green;color:white;">text</span>
```

When there are neither default color values nor passed-in colors during usage, no processing is done, and the original text is returned.

---
