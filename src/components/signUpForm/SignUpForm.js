import { Formik, Form, Field } from "formik";
import styles from "./signUpForm.module.scss";
import initialValues from "./initialValues";
import FirstNameImage from "./images/placeholders/FirstNameImage";
import SecondNameImage from "./images/placeholders/SecondNameImage";
import CountryImage from "./images/placeholders/CountryImage";
import classNames from "classnames";
import { useRef, useState } from "react";
import TelephoneImage from "./images/placeholders/TelephoneImage";
import PasswordImage from "./images/placeholders/PasswordImage";
import ConfirmPasswordImage from "./images/placeholders/ConfirmPasswordImage";
import EmailImage from "./images/placeholders/EmailImage";
import validationShema from "./validationShema";

const SignUpForm = ({ countries }) => {
  const {
    formControl,
    formControlInputWrapper,
    inputLabel,
    filled,
    labelFilled,
    select,
    dropList,
    countryImageWrapper,
    customCheckbox,
    checkmark,
    checkboxTerms,
    submitButton,
    logInOption,
    errorMsg,
    submitButtonContainer,
  } = styles;

  const [countryCode, setCountryCode] = useState("");
  const [submitForm, setSubmitForm] = useState(false);
  const [countryFirst, setCountryFirst] = useState(false);
  // const [formSubmited, setFormSubmited] = useState(false);

  const [firstTouchFields, setFirstTouchFileds] = useState({
    firstName: 0,
    secondName: 0,
    country: 0,
    phone: 0,
    password: 0,
    confirmPassword: 0,
    email: 0,
  });
  const checkboxRef = useRef(null);

  const handleCheckboxChange = () => {
    return checkboxRef.current.checked;
  };
  const incrementFirstTouch = (param) => {
    const field = param;
    setFirstTouchFileds((prevFields) => ({
      ...prevFields,
      [field]: prevFields[field] + 1,
    }));
  };

  const removeStartingChars = (phoneValue, countryCode) => {
    if (phoneValue.startsWith(countryCode)) {
      return phoneValue.substring(countryCode.length);
    }
    return "";
  };

  const isValueSelected = (value, array) => {
    return array.some((item) => item.name === value);
  };
  const compareNames = (arr, inputName) => {
    const lowerInputName = inputName.toLowerCase();
    if (!inputName) {
      return countries;
    }
    return arr.filter(({ name }) => {
      const lowerItemName = name.toLowerCase();
      return lowerItemName.includes(lowerInputName);
    });
  };

  return (
    <>
      <Formik
        onSubmit={(values, actions) => {
          console.log(values);
          alert("Форма заповнена");
        }}
        initialValues={initialValues}
        validationSchema={validationShema}
      >
        {(props) => {
          const countryArr = compareNames(countries, props.values.country);
          return (
            <Form className={formControl}>
              <div className={formControlInputWrapper}>
                <Field
                  className={props.values.firstName && filled}
                  type="text"
                  field="firstName"
                  name="firstName"
                  id="firstName" // Добавлено значение id
                  onClick={() => {
                    if (firstTouchFields.firstName < 2) {
                      incrementFirstTouch("firstName");
                    }
                  }}
                  onFocus={() => {
                    props.setFieldTouched("firstName", true);
                  }}
                  onBlur={() => {
                    if (firstTouchFields.firstName <= 1) {
                      incrementFirstTouch("firstName");
                    }
                    if (!props.values.firstName) {
                      props.setFieldTouched("firstName", false);
                    }
                  }}
                />
                <label
                  htmlFor="firstName"
                  className={
                    props.touched.firstName || props.values.firstName
                      ? labelFilled
                      : inputLabel
                  }
                >
                  First Name
                </label>
                <FirstNameImage />
                {props.errors.firstName && firstTouchFields.firstName > 1 ? (
                  <span className={errorMsg}>{props.errors.firstName}</span>
                ) : null}
              </div>
              <div className={formControlInputWrapper}>
                <Field
                  className={props.values.secondName && filled}
                  type="text"
                  id="secondName"
                  field="secondName"
                  name="secondName"
                  onClick={() => {
                    if (firstTouchFields.secondName < 2) {
                      incrementFirstTouch("secondName");
                    }
                  }}
                  onFocus={() => {
                    props.setFieldTouched("secondName", true);
                  }}
                  onBlur={() => {
                    if (firstTouchFields.secondName < 2) {
                      incrementFirstTouch("secondName");
                    }
                    if (!props.values.secondName) {
                      props.setFieldTouched("secondName", false);
                    }
                  }}
                />
                <label
                  htmlFor="secondName"
                  className={
                    props.touched.secondName || props.values.secondName
                      ? labelFilled
                      : inputLabel
                  }
                >
                  Second Name
                </label>
                <SecondNameImage />
                {props.errors.secondName && firstTouchFields.secondName > 1 ? (
                  <span className={errorMsg}>{props.errors.secondName}</span>
                ) : null}
              </div>
              <div className={formControlInputWrapper}>
                <Field
                  className={classNames(select, props.values.country && filled)}
                  type="text"
                  field="country"
                  name="country"
                  id="country"
                  onClick={() => {
                    if (firstTouchFields.country < 2) {
                      incrementFirstTouch("country");
                    }
                  }}
                  onFocus={() => {
                    props.setFieldTouched("country", true);
                  }}
                  onChange={(e) => {
                    props.setFieldValue("country", e.target.value);
                    props.setFieldValue("phone", "");
                  }}
                  onBlur={(e) => {
                    if (firstTouchFields.country <= 1) {
                      incrementFirstTouch("country");
                    }

                    setTimeout(() => {
                      const selected = isValueSelected(
                        e.target.value,
                        countries
                      );
                      if (!selected) {
                        props.setFieldValue("country", "");
                        props.setFieldTouched("country", false);
                        props.setErrors("country", "Fill in the filed");
                      }
                    }, 100);
                  }}
                />
                <div className={countryImageWrapper}>
                  <CountryImage />
                  {props.errors.country && firstTouchFields.country > 1 ? (
                    <span className={errorMsg}>{props.errors.country}</span>
                  ) : null}
                </div>
                {props.touched.country && !submitForm && (
                  <ul className={dropList}>
                    {countryArr.map((el) => (
                      <li
                        data-country={el.name}
                        onClick={(e) => {
                          props.setFieldValue(
                            "country",
                            e.target.dataset.country
                          );
                          props.setFieldTouched("country", false);
                          setCountryCode(el.countryCode);
                          props.setFieldTouched("phone", true);
                          setCountryFirst(() => false);
                        }}
                      >
                        {el.name}
                      </li>
                    ))}
                  </ul>
                )}

                <label
                  htmlFor="country"
                  className={
                    props.touched.country || props.values.country
                      ? labelFilled
                      : inputLabel
                  }
                >
                  Country
                </label>
              </div>
              <div className={formControlInputWrapper}>
                <Field
                  inputMode="numeric"
                  onKeyPress={(e) => {
                    const keyCode = e.keyCode || e.which;
                    const keyValue = String.fromCharCode(keyCode);
                    const regex = /[0-9]/;

                    if (!regex.test(keyValue)) {
                      e.preventDefault();
                    }
                  }}
                  className={props.values.phone && filled}
                  type="text"
                  field="phone"
                  name="phone"
                  id="phone"
                  value={
                    props.values.country
                      ? countryCode[0] + props.values.phone
                      : props.values.phone
                  }
                  onClick={() => {
                    if (
                      !props.values.country &&
                      setFirstTouchFileds.phone !== 2
                    ) {
                      setCountryFirst(() => true);
                    }
                    if (firstTouchFields.phone < 2) {
                      incrementFirstTouch("phone");
                    }
                  }}
                  onBlur={() => {
                    if (firstTouchFields.phone < 2) {
                      incrementFirstTouch("phone");
                    }
                  }}
                  onChange={(e) => {
                    const number = removeStartingChars(
                      e.target.value,
                      countryCode[0]
                    );
                    props.setFieldValue("phone", number);
                  }}
                />
                {countryFirst && (
                  <span className={errorMsg}>Fill the coumtry first</span>
                )}
                <label
                  htmlFor="phone"
                  className={
                    props.touched.phone || props.values.phone
                      ? labelFilled
                      : inputLabel
                  }
                >
                  Phone
                </label>
                <TelephoneImage />
                {props.touched.phone &&
                props.errors.phone &&
                firstTouchFields.phone > 1 ? (
                  <span className={errorMsg}>
                    {props.values.country
                      ? props.errors.phone
                      : "First select a country"}
                  </span>
                ) : null}
              </div>
              <div className={formControlInputWrapper}>
                <Field
                  className={props.values.password && filled}
                  type="password"
                  field="password"
                  name="password"
                  id="password"
                  onClick={() => {
                    if (firstTouchFields.password < 2) {
                      incrementFirstTouch("password");
                    }
                  }}
                  onFocus={() => {
                    props.setFieldTouched("password", true);
                  }}
                  onBlur={() => {
                    if (firstTouchFields.password < 2) {
                      incrementFirstTouch("password");
                    }
                    if (!props.values.password) {
                      props.setFieldTouched("password", false);
                    }
                  }}
                />
                <label
                  htmlFor="password"
                  className={
                    props.touched.password || props.values.password
                      ? labelFilled
                      : inputLabel
                  }
                >
                  Password
                </label>
                <PasswordImage />
                {props.errors.password && firstTouchFields.password > 1 ? (
                  <span className={errorMsg}>{props.errors.password}</span>
                ) : null}
              </div>
              <div className={formControlInputWrapper}>
                <Field
                  className={props.values.confirmPassword && filled}
                  type="password"
                  field="confirmPassword"
                  name="confirmPassword"
                  id="confirmPassword"
                  onClick={() => {
                    if (firstTouchFields.confirmPassword < 2) {
                      incrementFirstTouch("confirmPassword");
                    }
                  }}
                  onFocus={() => {
                    props.setFieldTouched("confirmPassword", true);
                  }}
                  onBlur={() => {
                    if (firstTouchFields.confirmPassword < 2) {
                      incrementFirstTouch("confirmPassword");
                    }
                    if (!props.values.confirmPassword) {
                      props.setFieldTouched("confirmPassword", false);
                    }
                  }}
                />
                <label
                  htmlFor="confirmPassword"
                  className={
                    props.touched.confirmPassword ||
                    props.values.confirmPassword
                      ? labelFilled
                      : inputLabel
                  }
                >
                  Conform password
                </label>
                <ConfirmPasswordImage />
                {props.errors.confirmPassword &&
                firstTouchFields.confirmPassword > 1 ? (
                  <span className={errorMsg}>
                    {props.errors.confirmPassword}
                  </span>
                ) : null}
              </div>
              <div className={formControlInputWrapper}>
                <Field
                  className={props.values.email && filled}
                  type="email"
                  field="email"
                  name="email"
                  id="email"
                  onClick={() => {
                    if (firstTouchFields.email < 2) {
                      incrementFirstTouch("email");
                    }
                  }}
                  onFocus={() => {
                    props.setFieldTouched("email", true);
                  }}
                  onBlur={() => {
                    if (firstTouchFields.email < 2) {
                      incrementFirstTouch("email");
                    }
                    if (!props.values.email) {
                      props.setFieldTouched("email", false);
                    }
                  }}
                />
                <label
                  htmlFor="email"
                  className={
                    props.touched.email !== undefined
                      ? props.values.email
                        ? labelFilled
                        : !props.values.email
                        ? labelFilled
                        : inputLabel
                      : inputLabel
                  }
                >
                  Email
                </label>

                <EmailImage />
                {props.errors.email && firstTouchFields.email > 1 ? (
                  <span className={errorMsg}>{props.errors.email}</span>
                ) : null}
              </div>
              <label className={customCheckbox}>
                <input
                  type="checkbox"
                  ref={checkboxRef}
                  style={{ backgroundColor: props.errors.terms && "#DA5050" }}
                  onChange={() => {
                    const checked = handleCheckboxChange();
                    if (checked) {
                      props.setFieldValue("terms", true);
                      props.setFieldError(
                        "terms",
                        "Agree with hour terms to proceed"
                      );
                    } else {
                      props.setFieldValue("terms", false);
                    }
                  }}
                />
                <span
                  style={{
                    backgroundColor: props.errors.terms && "#DA5050",
                  }}
                  className={checkmark}
                ></span>
                <span>I agree to the</span>
                <span className={checkboxTerms}>Terms & Conditions</span>
              </label>
              <div className={submitButtonContainer}>
                <button
                  className={submitButton}
                  type="button"
                  // disabled={!props.isValid && true}
                  style={{
                    backgroundColor: !props.isValid && "transparent",
                    border: !props.isValid && "1px solid #6CEEC7",
                  }}
                  onClick={() => {
                    setFirstTouchFileds({
                      firstName: 2,
                      secondName: 2,
                      country: 2,
                      phone: 2,
                      password: 2,
                      confirmPassword: 2,
                      email: 2,
                    });

                    const isValidProps =
                      !!props.values.firstName & !!props.values.secondName &&
                      !!props.values.country &&
                      !!props.values.phone &&
                      !!props.values.password &&
                      !!props.values.password &&
                      !!props.values.confirmPassword &&
                      !!props.values.email &&
                      props.values.terms;

                    if (!!isValidProps) {
                      setSubmitForm(() => true);
                      props.setTouched({
                        country: false,
                      });
                      props.handleSubmit();
                    } else {
                      // Заставить формик создать объект touched если не одно поле не заполенно
                      setCountryFirst(() => true);
                      props.setTouched({
                        firstName: true,
                      });
                      props.setTouched({
                        firstName: false,
                      });
                      props.isValid = false;
                    }
                  }}
                >
                  Sign Up
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <p className={logInOption}>
        If you have an account, <span>Log In</span>
      </p>
    </>
  );
};

export default SignUpForm;
