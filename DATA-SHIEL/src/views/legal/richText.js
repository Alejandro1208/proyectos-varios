// Utilidad simple para renderizar negritas (**texto**) y saltos de línea
export const formatLegalText = (text = '') => {
  const boldParsed = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  return boldParsed.replace(/\n/g, '<br />');
};

export const asHtml = (text) => ({
  __html: formatLegalText(text),
});
