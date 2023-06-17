module.exports = function cutUrl(str: string) {
  const regex = /v=([^&]+)/;
  const match = str.match(regex);
  return match ? match[1] : str;
};
