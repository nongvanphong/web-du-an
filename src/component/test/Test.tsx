import React, { useState, useRef, useEffect } from "react";
import FormA, { FormARef } from "./FormA"; // Đảm bảo bạn đã import FormARef từ FormA
import FormB, { FormBRef } from "./FormB"; // Đảm bảo bạn đã import FormBRef từ FormB

export default function Test() {
  const [formData, setFormData] = useState({
    formA: { values: null, validated: false },
    formB: { values: null, validated: false },
  });

  const formAref = useRef<FormARef>(null); // Sử dụng FormARef
  const formBref = useRef<FormBRef>(null); // Sử dụng FormBRef

  useEffect(() => {
    if (formData.formB.validated && formData.formA.validated) {
      alert("Ready to save");
    }
  }, [formData]);

  async function handleSubmit() {
    if (formAref.current && formBref.current) {
      await formAref.current.Submit();
      await formBref.current.Submit();
    }
  }

  function handleChangeFormA(data: any) {
    setFormData((prevState) => ({
      ...prevState,
      formA: data,
    }));
  }

  function handleChangeFormB(data: any) {
    setFormData((prevState) => ({
      ...prevState,
      formB: data,
    }));
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <FormA onChange={handleChangeFormA} ref={formAref} />
      <FormB onChange={handleChangeFormB} ref={formBref} />

      <button
        onClick={() => {
          console.log(formData);
        }}
        type="button"
      >
        set
      </button>

      <button onClick={handleSubmit} type="button">
        Submit
      </button>
    </div>
  );
}
