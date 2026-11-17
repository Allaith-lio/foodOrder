import { useState } from "react";
import { checkField, checkForm, sanitize } from "../utils/validators";

// Generic validated form state driven by a fields definition object
// (see src/data/formFields.js). Values, errors and touched flags are all
// keyed by Object.keys(fields), so adding a field only requires editing
// the fields file.
export function useForm(fields, initialValues = {}) {
  const [values, setValues] = useState(() => {
    const initial = {};
    Object.keys(fields).forEach((name) => {
      initial[name] = initialValues[name] ?? "";
    });
    return initial;
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const ruleFor = (name) => fields[name]?.rule ?? name;

  const setValue = (name, value) => {
    const clean = sanitize(ruleFor(name), value);
    setValues((prev) => ({ ...prev, [name]: clean }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: checkField(fields, name, clean) }));
    }
  };

  const handleChange = (name) => (event) => setValue(name, event.target.value);

  const handleBlur = (name) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: checkField(fields, name, values[name]) }));
  };

  // Validate every field and mark all as touched. Returns the errors object.
  const validateAll = () => {
    const nextErrors = checkForm(fields, values);
    setErrors(nextErrors);
    setTouched(
      Object.keys(fields).reduce((acc, name) => ({ ...acc, [name]: true }), {}),
    );
    return nextErrors;
  };

  const isValid = () => Object.keys(checkForm(fields, values)).length === 0;

  return { values, errors, touched, setValue, handleChange, handleBlur, validateAll, isValid };
}
