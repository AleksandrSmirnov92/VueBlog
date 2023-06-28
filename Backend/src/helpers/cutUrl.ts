module.exports = function cutUrl(str: string) {
  // const regex = /v=([^&]+)/;
  const regex = /(?:watch\?v=|youtu\.be\/)([^&]+)/;
  const match = str.match(regex);
  return match ? match[1] : str;
};
