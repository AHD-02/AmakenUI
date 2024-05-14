import * as yup from "yup";

export interface PublicPlaceCreateType {
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  categoryId: number;
  categoryName: string;
  images: string[];
}

export const publicPlaceInitialValues = (values?: PublicPlaceCreateType) => {
  return {
    name: values?.name ?? "",
    description: values?.description ?? "",
    longitude: values?.longitude ?? null,
    latitude: values?.latitude ?? null,
    categoryId: values?.categoryId ?? null,
    categoryName: values?.categoryName ?? "",
    images: values?.images?? [],
  };
};

export const publicPlaceValidationSchema = yup.object({
  name: yup.string().required("Please complete this field"),
  description: yup.string().required("Please complete this field"),
  longitude: yup.number().required("Please complete this field"),
  latitude: yup.number().required("Please complete this field"),
  categoryId: yup.number().required("Please complete this field"),
  images: yup.array().min(1, "Please upload take atleast one image")
});
