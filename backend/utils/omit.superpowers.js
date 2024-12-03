module.exports.omitSuperpowers = (body) => {
  const { superpowers, ...keep } = body;

  return keep;
};
