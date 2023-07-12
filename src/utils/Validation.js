import { useState, useCallback } from "react";

export default function Validation() {
  const [errors, setErrors] = useState({});

  const validateEmail = useCallback((email) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Введите корректный адрес электронной почты";
    }
    return "";
  }, []);

  const validatePassword = useCallback((password) => {
    if (password.length < 6) {
      return "Пароль должен содержать не менее 6 символов";
    }
    return "";
  }, []);

  const validateName = useCallback((name) => {
    if (name.trim() === "") {
      return "Введите ваше имя";
    }
    return "";
  }, []);

  const validateForm = useCallback((name, email, password) => {
    const newErrors = {};
    if (name) {
      newErrors.name = validateName(name);
    }
    if (email) {
      newErrors.email = validateEmail(email);
    }
    if (password) {
      newErrors.password = validatePassword(password);
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  }, [validateName, validateEmail, validatePassword]); // добавлены зависимости

  return {
    errors,
    setErrors,
    validateForm,
  };
}