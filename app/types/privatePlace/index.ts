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
  availableFrom: Date | null;
  availableTo: Date | null;
  categoryID: string;
  imageOfOwnerID: string;
  imageOfOwnershipProof: string;
}

export const privatePlaceInitialValues = (initialVal?: IPrivatePlace) => {
  return {
    registerNumber: initialVal?.registerNumber ?? "2020",
    placeName: initialVal?.placeName ?? "",
    images: initialVal?.images ?? [],
    description: initialVal?.description ?? "",
    longitude: initialVal?.longitude ?? null,
    latitude: initialVal?.latitude ?? null,
    availableFrom: initialVal?.availableFrom ?? null,
    availableTo: initialVal?.availableTo ?? null,
    categoryID: initialVal?.categoryID ?? '',
    imageOfOwnerID: initialVal?.imageOfOwnerID ?? "",
    imageOfOwnershipProof: initialVal?.imageOfOwnershipProof ?? "",
  };
};

export const privatePlaceValidationSchema = yup.object({
  registerNumber: yup.string(),
  placeName: yup.string().required("Please complete this field"),
  images: yup.array().required("Please complete this field"),
  description: yup.string().required("Please complete this field"),
  longitude: yup.number().required("Please complete this field"),
  latitude: yup.number().required("Please complete this field"),
  availableFrom: yup.date().nullable("Please complete this field").required("Please complete this field"),
  availableTo: yup.date().nullable('Please complete this field').required("Please complete this field"),
  categoryID: yup.string().required("Please complete this field"),
  imageOfOwnerID: yup.string().required("Please complete this field"),
  imageOfOwnershipProof: yup.string().required("Please complete this field"),
});
