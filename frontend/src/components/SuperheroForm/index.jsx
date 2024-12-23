import { Field, Form, Formik, FieldArray } from "formik";
import { connect } from "react-redux";
import { useRef } from "react";
import validateSuperheroForm from "../../utils/validateSuperheroForm";
import { createSuperheroRequest } from "../../actions";
import handleSubmit from "../../utils/handleSubmit";
import fields from "../../constant/fields";

const SuperheroForm = ({ createSuperheroAction, superhero }) => {
  const fileInputRef = useRef(null);

  return (
    <Formik
      initialValues={{
        nickName: superhero?.nickName || "",
        realName: superhero?.realName || "",
        originDescription: superhero?.originDescription || "",
        catchPhrase: superhero?.catchPhrase || "",
        superpowers: superhero?.superpowers || [],
        images: superhero?.images || [],
      }}
      onSubmit={(values, formikBag) =>
        handleSubmit(
          values,
          formikBag,
          true,
          fileInputRef,
          createSuperheroAction
        )
      }
      validate={validateSuperheroForm}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="mb-20">
          <h3 className="mb-20">Create a New Superhero</h3>

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

              {touched[field.name] && errors[field.name] && (
                <span className="font-12 color-red">{errors[field.name]}</span>
              )}
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

                {touched.superpowers && errors.superpowers && (
                  <span className="font-12 color-red">
                    {errors.superpowers}
                  </span>
                )}

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
            <label className="mr-5">Images</label>
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

            {touched.images && errors.images && (
              <span className="font-12 color-red">{errors.images}</span>
            )}
          </div>

          {values.images.length > 0 && (
            <div>
              <label className="mb-5 d-inline-block">Selected Images:</label>
              <ul>
                {values.images.map((imageObj, index) => (
                  <li className="mb-5 d-flex-items-center" key={index}>
                    <img
                      className="img-50 mr-5 mb-5"
                      src={URL.createObjectURL(imageObj)}
                      alt="Preview"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          "images",
                          values.images.filter((_, i) => i !== index)
                        )
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit">Create Superhero</button>
        </Form>
      )}
    </Formik>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createSuperheroAction: (values) => dispatch(createSuperheroRequest(values)),
});

export default connect(null, mapDispatchToProps)(SuperheroForm);
