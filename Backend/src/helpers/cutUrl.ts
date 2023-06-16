module.exports = function cutUrl(str: string, char: string) {
  const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`${escapedChar}(.*)$`);
  const match = str.match(regex);
  return match ? match[1] : str;
};
