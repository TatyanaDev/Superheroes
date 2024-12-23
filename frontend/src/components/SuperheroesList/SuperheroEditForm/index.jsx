import { Field, Formik, Form, FieldArray } from "formik";
import { useRef } from "react";
import handleSubmit from "../../../utils/handleSubmit";
import fields from "../../../constant/fields";
import { BASE_URL } from "../../../config";

const SuperheroEditForm = ({ superhero, onSubmit, onCancel }) => {
  const fileInputRef = useRef(null);

  return (
    <Formik
      initialValues={{
        nickName: superhero.nickName || "",
        realName: superhero.realName || "",
        originDescription: superhero.originDescription || "",
        catchPhrase: superhero.catchPhrase || "",
        superpowers:
          superhero.superpowers.map(({ superpower }) => superpower) || [],
        images: superhero.images || [],
      }}
      onSubmit={(values, formikBag) =>
        handleSubmit(values, formikBag, false, fileInputRef, onSubmit)
      }
    >
      {({ values, setFieldValue }) => (
        <Form>
          <h4 className="mb-5">Edit Superhero</h4>

          {fields.map((field) => (
            <div className="mb-5" key={field.id}>
              <label className="mr-5" htmlFor={field.id}>
                {field.label}
              </label>
              <Field
                placeholder={field.placeholder}
                aria-required={field.required}
                name={field.name}
                className="mr-5"
                id={field.id}
                type="text"
              />
            </div>
          ))}

          <FieldArray name="superpowers">
            {({ remove, push }) => (
              <div>
                <span className="mr-5 mb-5 d-inline-block">
                  <label className="mr-5">Superpowers</label>
                  <button type="button" onClick={() => push("")}>
                    Add Superpower
                  </button>
                </span>

                {values.superpowers.map((_, index) => (
                  <div key={index} className="mb-5">
                    <Field
                      type="text"
                      name={`superpowers[${index}]`}
                      placeholder="e.g. Flight"
                      className="mr-5"
                    />
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </FieldArray>

          <div className="mb-5">
            <label className="mb-5 d-inline-block">Images</label>

            <div className="d-flex mb-5">
              {values.images.map((imageObj, index) => (
                <div key={index}>
                  {typeof imageObj === "object" && imageObj.image ? (
                    // Display old images
                    <div>
                      <img
                        className="img-100 mr-5"
                        src={`${BASE_URL}${imageObj.image}`}
                        alt={`Superhero ${index + 1}`}
                      />
                    </div>
                  ) : (
                    // Display new images
                    <div>
                      <img
                        className="img-50 mr-5"
                        src={URL.createObjectURL(imageObj)}
                        alt="Preview"
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue(
                        "images",
                        values.images.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={({ target }) =>
                setFieldValue("images", [
                  ...values.images,
                  ...Array.from(target.files),
                ])
              }
            />
          </div>

          <div>
            <button className="mr-5" type="submit">
              Save Changes
            </button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SuperheroEditForm;
