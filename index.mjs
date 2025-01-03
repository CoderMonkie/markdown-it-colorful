export default function colorful_plugin(md, options) {
  const defaultRender =
    md.renderer.rules.text ||
    ((tokens, idx, options, env, self) =>
      self.renderToken(tokens, idx, options));

  const { color, bgColor } = options || {};

  md.renderer.rules.text = (tokens, idx, options, env, self) => {
    const token = tokens[idx];

    const matches = token.content.match(
      /:(colorful(_(#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})|(?:[a-zA-Z]+))?){0,2})\s+(.*?):/gi,
    );
    if (matches && matches.length > 0) {
      matches.forEach(item => {
        const match = item.match(
          /:(colorful(_(#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})|(?:[a-zA-Z]+))?){0,2})\s+(.*?):/i,
        );
        const text = match.pop();
        const colors = match[1].split('_');
        const hasColor = colors[1] || bgColor || colors[2] || color;
        const ret = `<span style="background-color: ${colors[1] || bgColor};color: ${colors[2] || color};">${text}</span>`;
        token.content = token.content.replace(item, hasColor ? ret : text);
      });
      return token.content;
    }

    return defaultRender(tokens, idx, options, env, self);
  };
}
