const getHash = (separator = "#", length = 6) => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";

  for (var i = 0; i < length; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return separator + text.toLocaleLowerCase().trim();
};

export default getHash;
