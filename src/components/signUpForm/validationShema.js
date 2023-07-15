import * as Yup from "yup";
const validationShema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "The name must be more than 2 characters")
    .required("Name is required"),
  secondName: Yup.string().required("Second name is required"),
  country: Yup.string().required("Fill in the field"),
  // phone: Yup.number().required("Fill in the field"),
  phone: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/,
      "Password must have at least 1 letter, 1 number, and 1 special character"
    )
    .required("Fill in the field"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password does not match")
    .required("Confirm password is required"),
  email: Yup.string()
    .email("Email is not correct")
    .required("Fill in the field"),
  terms: Yup.bool()
    .oneOf([true], "You must accept the terms")
    .required("You must accept the terms"),
});

export default validationShema;
