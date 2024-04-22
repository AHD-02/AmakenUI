import * as yup from "yup";

export interface SignupModel {
  firstName: string;
  lastName: string;
  image: string | null;
  email: string;
  countryCode: string;
  phoneNumber: string;
  date: Date | null;
  country: string;
  city: string;
  password: string;
  confirmPassword: string;
}

export const SignUpInitialValues: SignupModel = {
  firstName: "",
  lastName: "",
  image: null,
  email: "",
  countryCode: "JO",
  phoneNumber: "",
  date: null,
  country: "",
  city: "",
  password: "",
  confirmPassword: "",
};

export const SignUpValidationSchema = yup.object({
  firstName: yup.string().required("Please complete this field"),
  lastName: yup.string().required("Please complete this field"),
  email: yup
    .string()
    .email("invalid email address")
    .required("Please complete this field"),
  countryCode: yup.string().required("Please complete this field"),
  phoneNumber: yup.string().required("Please complete this field"),
  date: yup.date().nullable().required("Please complete this field"),
  country: yup.string().required("Please complete this field"),
  city: yup.string().required("Please complete this field"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "passwordCriteriaNotMet" // TODO: change message
    )
    .required("Please complete this field"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null as any], "Password must match")
    .required("Please complete this field"),
});
