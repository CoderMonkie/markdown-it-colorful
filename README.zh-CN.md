# markdown-it-colorful

[English](https://github.com/CoderMonkie/markdown-it-colorful/blob/master/README.md)

`markdown-it` 的插件，用来给行内文字设置背景色、前景色，比如荧光笔效果等，实现行内文字彩色高亮美化。

## Usage

> format changed since v2.0.0
>> ::colorful_green_white text::

### 使用`umd`直接引入

[![pE9wqAK.png](https://s21.ax1x.com/2025/01/06/pE9wqAK.png)](https://imgse.com/i/pE9wqAK)

全局变量名为`markdownitcolorful`

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
      // markdown-it 变量名为 markdownit
      var md = markdownit()
      // md.use(markdownitcolorful, { bgColor: 'green', color: 'white'})
      md.use(markdownitcolorful)

      var mdContent = `
# ::colorful_red_white markdown::::colorful_green_white -it-::::colorful_blue_white colorful::
## ::colorful__gray In The Browser::
### ::colorful__#1E90FF 行内::::colorful_#F08080 文字::::colorful_#ADFF2F_#001a1a *彩色*::::colorful_#87CEFA_#FF8C00 **高亮**::::colorful_green_white 美化::
      `.trim();

      document.getElementById('content').innerHTML = md.render(mdContent)
    })
  </script>
</body>
</html>
```

### 安装 NPM 包使用

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

> 这里配置默认颜色值可以为格式任意，包括`#00000066` `#f1f1f1` `green` `var(--theme-color)`等。

在`markdown`文本内容中：

``` text
::colorful_aliceblue_#ddd 行内文字颜色美化::
```

使用格式`::colorful_背景色_前景色 任意文字内容::`，`_背景色`与`_前景色`都可以不传使用默认值（`md.use`时传入的`options`）。

这里支持的颜色值格式包括：

- 十六进制颜色值（3位或6位），如`#fff`、`#ffffff`、`#000`、`#000000`
- 十六进制颜色值包含透明度的（8位），如`#ffffff1a`、`#0000001a`
- 颜色名称，如`red`、`green`、`blue`

## API

### options 配置项

`options`对象为可选参数，可配置默认颜色，省去每次使用时传入

|属性|类型|必须|默认值|说明|
|--|--|--|--|--|
|color|String|no|null|前景色|
|bgColor|String|no|null|背景色|
|skipWhenNoStyle|Boolean|no|false|没有配置颜色值时仍渲染出 span 元素(`class="colorful"`)，否则跳过本插件的渲染|

- 当使用`::colorful_bgColor_color ::`传入值时，优先使用传入的颜色；  
- 当使用`::colorful ::`未传入值时，使用`options`配置的默认颜色；

渲染为`span`标签：

```html
<span class="colorful" style="background-color:green;color:white;">文字</span>
```

- 当既没有配置默认颜色值，也没有在使用中传入，`skipWhenNoStyle`设为`false`时，仍会渲染出`span`元素
- 当既没有配置默认颜色值，也没有在使用中传入，`skipWhenNoStyle`设为`true`时，不做特别渲染处理，继续处理内部文字

---

### 方法

#### set

`set`方法用来更新设置的默认颜色值等单个或多个属性值

```js
md.use(colorful, {
  color: '#f1f1f1',
  bgColor: 'green'
})

colorful.set({ color: 'white'})

// `colorful.set` 更新属性值之后，需要 `md.render` 再次渲染你的内容
```
