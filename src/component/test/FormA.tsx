import React, { forwardRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormAProps {
  onChange: (data: any) => void;
}

export interface FormARef {
  Submit: () => Promise<void>;
}

const FormA = forwardRef<FormARef, FormAProps>(({ onChange }, ref) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("This field is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async () => {
      watchForm();
    },
  });

  React.useImperativeHandle(ref, () => ({
    Submit: async () => {
      await formik.submitForm();
    },
  }));

  function watchForm() {
    if (onChange) {
      onChange({
        values: formik.values,
        validated: formik.isValidating
          ? false
          : Object.keys(formik.errors).length === 0,
      });
    }
  }

  return (
    <form>
      <div className={"form"}>
        <h3>Form A</h3>
        <div>
          <label>Name </label>
          <input
            name="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: "red" }}>
              <small>{formik.errors.name}</small>
            </div>
          )}
        </div>
        <br />
        <div>
          <label>Email </label>
          <input
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red" }}>
              <small>{formik.errors.email}</small>
            </div>
          )}
        </div>
        <pre>{JSON.stringify(formik.values, null, 2)}</pre>
      </div>
    </form>
  );
});

export default FormA;
