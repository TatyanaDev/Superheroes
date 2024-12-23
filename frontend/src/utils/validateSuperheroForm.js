const validateSuperheroForm = (values) => {
  const errors = {};

  if (!values.nickName.trim()) {
    errors.nickName = "Nickname is required";
  }

  if (!values.realName.trim()) {
    errors.realName = "Real name is required";
  }

  if (!values.originDescription.trim()) {
    errors.originDescription = "Origin description is required";
  }

  if (!values.catchPhrase.trim()) {
    errors.catchPhrase = "Catchphrase is required";
  }

  const nonEmptySuperpowers = values.superpowers.filter((superpower) =>
    superpower.trim()
  );

  if (nonEmptySuperpowers.length === 0) {
    errors.superpowers = "At least one superpower is required";
  }

  if (!values.images || values.images.length === 0) {
    errors.images = "At least one image is required";
  }

  return errors;
};

export default validateSuperheroForm;
