import React from 'react';
import { Formik } from 'formik';
import FormInput from './FormInput';

const FormData = ({
  onSubmit,
  powerName,
  valuePower,
  imagePath,
  valueImage,
}) => {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        nickName: '',
        realName: '',
        originDescription: '',
        catchPhrase: '',
        powerName: [],
        imagePath: [],
      }}
    >
      <FormInput
        powerName={powerName}
        valuePower={valuePower}
        imagePath={imagePath}
        valueImage={valueImage}
      />
    </Formik>
  );
};

export default FormData;
