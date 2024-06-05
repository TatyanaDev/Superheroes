import React from 'react';
import { Form, Field } from 'formik';

const FormInput = ({ powerName, valuePower, imagePath, valueImage }) => {
  return (
    <Form>
      <Field name='nickName' placeholder='nickName' />
      <Field name='realName' placeholder='realName' />
      <Field name='originDescription' placeholder='originDescription' />
      <Field name='catchPhrase' placeholder='catchPhrase' />
      <input //not workers
        name='powerName'
        placeholder='powerName'
        value={powerName}
        onChange={valuePower}
      />
      <input //not workers
        type='file'
        name='imagePath'
        value={imagePath}
        onChange={valueImage}
        multiple
      />
      <button type='submit'>Create Hero</button>
    </Form>
  );
};

export default FormInput;
