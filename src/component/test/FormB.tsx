import React, { forwardRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormBProps {
  onChange: (data: any) => void;
}

export interface FormBRef {
  Submit: () => Promise<void>;
}

const FormB = forwardRef<FormBRef, FormBProps>(({ onChange }, ref) => {
  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("This field is required")
        .min(6, "At least 06 characters"),
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
        <h3>Form B</h3>
        <div>
          <label>Phone number </label>
          <input
            name="phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div style={{ color: "red" }}>
              <small>{formik.errors.phone}</small>
            </div>
          )}
        </div>
        <pre>{JSON.stringify(formik.values, null, 2)}</pre>
      </div>
    </form>
  );
});

export default FormB;
