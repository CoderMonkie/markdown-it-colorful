// Process ::colorful_green_white whatever::
//
function colorfulPlugin(md, options) {
  // 正则表达式匹配 ::colorful_bgColor_color whatever:: 格式的内容
  const pattern =
    /::(colorful(_(#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})|(?:[a-zA-Z]+))?){0,2})\s+(.*?)::/i;
  // 规则名称
  const COLORFUL = 'colorful';

  const config = options || {};

  this.set = function (newOpt = {}) {
    if (typeof newOpt !== 'object') return;
    Object.assign(config, newOpt);
  };

  // 注册一个新规则
  function colorful(state, silent) {
    const pos = state.pos;
    const str = state.src.slice(pos);
    // pos 所在位置是否以 ::colorful 开头
    if (!str.startsWith('::colorful')) return false;
    // 以 pos 为起始位置的文字内，是否匹配完整格式
    const match = pattern.exec(str);
    if (!match) return false;

    const { color, bgColor, skipWhenNoStyle } = config;
    const colors = match[1].split('_');
    const styleBgColor = colors[1] || bgColor;
    const styleColor = colors[2] || color;
    let style = '';
    styleBgColor && (style += `background-color: ${styleBgColor};`);
    styleColor && (style += `color: ${styleColor};`);

    // 获取内部的文本
    const content = match[match.length - 1];
    // 解析器解析内部的 Markdown 内容
    const inlineTokens = md.parseInline(content, state.env);

    // 如果没有指定颜色和背景色，跳过，直接处理内部文本
    if (!style && skipWhenNoStyle) {
      state.src = state.src.replace(match[0], content);
      return false;
    }

    // 创建一个 colorful token，渲染为 <span>
    const token = state.push(COLORFUL, 'span', 1);
    token.attrPush(['class', 'colorful']);
    style && token.attrPush(['style', style]);

    // 将解析得到的 inlineTokens 存入 children，渲染为 <span> 标签的内容
    token.children = inlineTokens;

    state.pos += match[0].length; // 更新当前位置
    return true;
  };

  // 检查规则是否已经存在
  if (md.inline.ruler.__find__(COLORFUL) === -1) {
    // 如果规则不存在，插入新规则
    md.inline.ruler.push(COLORFUL, colorful);
  } else {
    // 如果规则已经存在，或者替换现有的规则
    md.inline.ruler.at(COLORFUL, colorful);
  }

  // 注册渲染规则
  md.renderer.rules[COLORFUL] = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const span_s = self.renderToken([token], 0, options);
    const span_e = '</span>';
    const childrenContent = self.render(token.children, options, env);

    return span_s + childrenContent + span_e;
  };

  return md;
}

export default colorfulPlugin;
