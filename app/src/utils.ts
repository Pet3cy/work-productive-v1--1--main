export const sanitize = (str: string): string => {
  return str.replace(/[&<>"'\/]/g, (match) => {
    switch (match) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case "'":
        return '&#x27;';
      case '"':
        return '&quot;';
      case '/':
        return '&#x2F;';
      default:
        return match;
    }
  });
};