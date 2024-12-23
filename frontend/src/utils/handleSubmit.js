import { BASE_URL } from "../config";

const fetchOldImageAsBlob = async (imagePath) => {
  const response = await fetch(`${BASE_URL}${imagePath}`);

  if (!response.ok) {
    throw new Error("Failed to fetch old image");
  }

  return await response.blob();
};

const handleSubmit = async (
  values,
  formikBag,
  isCreate,
  fileInputRef,
  onSubmitFunction
) => {
  const formData = new FormData();

  formData.append("nickName", values.nickName);
  formData.append("realName", values.realName);
  formData.append("originDescription", values.originDescription);
  formData.append("catchPhrase", values.catchPhrase);

  const formattedSuperpowers = values.superpowers
    .map((superpower) => superpower.trim())
    .filter(Boolean);

  formData.append("superpowers", JSON.stringify(formattedSuperpowers));

  for (const imageObj of values.images) {
    if (typeof imageObj === "object" && imageObj instanceof File) {
      formData.append("images", imageObj);
    } else if (typeof imageObj === "object" && imageObj.image) {
      const blob = await fetchOldImageAsBlob(imageObj.image);

      formData.append("images", blob, imageObj.image.split("/").pop());
    }
  }

  if (isCreate) {
    onSubmitFunction(formData);

    formikBag.resetForm();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  } else {
    onSubmitFunction(formData);
  }
};

export default handleSubmit;
