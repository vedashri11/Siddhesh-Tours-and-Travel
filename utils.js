import clipboard from 'clipboard';

export const copyToClipboard = (text) => {
  clipboard.writeText(text);
};
