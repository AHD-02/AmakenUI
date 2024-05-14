import * as yup from "yup";
import { UserModel } from ".";

export interface SignupModel {
  firstName: string;
  lastName: string;
  images: string | null;
  email: string;
  countryCode: string;
  phone: string;
  date: Date | null | string;
  country: string;
  city: string;
  password: string;
  confirmPassword: string;
  status: string;
}

export const SignUpInitialValues = (userData?: UserModel) => ({
  firstName: userData?.firstName ?? "",
  lastName: userData?.lastName ?? "",
  images: userData?.images ?? null,
  email: userData?.email ?? "",
  countryCode: "JO",
  phone: userData?.phone ?? "",
  date: userData?.dateOfBirth ?? "2024-04-30T22:23:00.000Z",
  country: userData?.country ?? "",
  city: userData?.city ?? "",
  password: "",
  confirmPassword: "",
  status: 'OK',
});

export const SignUpValidationSchema = yup.object({
  firstName: yup.string().required("Please complete this field"),
  lastName: yup.string().required("Please complete this field"),
  email: yup
    .string()
    .email("invalid email address")
    .required("Please complete this field"),
  countryCode: yup.string().required("Please complete this field"),
  phone: yup.string().required("Please complete this field"),
  date: yup.date().nullable().required("Please complete this field"),
  country: yup.string().required("Please complete this field"),
  city: yup.string().required("Please complete this field"),
  password: yup
    .string()
    .min(
      8,
      "Password must be at least 8, with atleast 1 lower case and uppercase characters and includes at least one spcial character"
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must be at least 8, with atleast 1 lower case and uppercase characters and includes at least one spcial character"
    )
    .required("Please complete this field"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null as any], "Password must match")
    .required("Please complete this field"),
});
