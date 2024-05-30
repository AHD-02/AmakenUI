import * as yup from "yup";

export interface IPrivatePlaceResponse extends IPrivatePlace {
  placeId: string;
  addedOn: string;
  status: string;
}

export interface IPrivatePlace {
  registerNumber: string;
  placeName: string;
  images: string[];
  description: string;
  longitude: number | null;
  latitude: number | null;
  availableFrom: string;
  availableTo: string;
  categoryId: number;
  imageOfOwnerID: string;
  imageOfOwnershipProof: string;
}

export const privatePlaceInitialValues = (initialVal?: IPrivatePlace) => {
  return {
    registerNumber: initialVal?.registerNumber ?? "",
    placeName: initialVal?.placeName ?? "",
    images: initialVal?.images ?? [],
    description: initialVal?.description ?? "",
    longitude: initialVal?.longitude ?? null,
    latitude: initialVal?.latitude ?? null,
    availableFrom: initialVal?.availableFrom ?? "",
    availableTo: initialVal?.availableTo ?? "",
    categoryId: initialVal?.categoryId ?? 0,
    imageOfOwnerID: initialVal?.imageOfOwnerID ?? "",
    imageOfOwnershipProof: initialVal?.imageOfOwnershipProof ?? "",
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
  categoryId: yup.string().required("Please complete this field"),
  imageOfOwnerID: yup.string().required("Please complete this field"),
  imageOfOwnershipProof: yup.string().required("Please complete this field"),
});
