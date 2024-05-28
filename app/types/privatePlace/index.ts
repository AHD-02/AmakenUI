import * as yup from "yup";

export interface IPrivatePlace {
  registerNumber: string;
  placeName: string;
  images: string[];
  description: string;
  status: string;
  longitude: number;
  latitude: number;
  availableFrom: string;
  availableTo: string;
}

export const privatePlaceInitialValues = (initialVal: IPrivatePlace) => {
  return {
    registerNumber: initialVal.registerNumber,
    placeName: initialVal.placeName,
    images: initialVal.images,
    description: initialVal.description,
    status: initialVal.status,
    longitude: initialVal.longitude,
    latitude: initialVal.latitude,
    availableFrom: initialVal.availableFrom,
    availableTo: initialVal.availableTo,
  };
};

export const privatePlaceValidationSchema = yup.object({
  registerNumber: yup.string().required("Please complete this field"),
  placeName: yup.string().required("Please complete this field"),
  images: yup.string().required("Please complete this field"),
  description: yup.string().required("Please complete this field"),
  status: yup.string().required("Please complete this field"),
  longitude: yup.number().required("Please complete this field"),
  latitude: yup.number().required("Please complete this field"),
  availableFrom: yup.string().required("Please complete this field"),
  availableTo: yup.string().required("Please complete this field"),
});
