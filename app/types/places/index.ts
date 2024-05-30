export interface PublicPlaceResponse {
  numberOfRates: number;
  averageScore: number;
  didUserRate: boolean;
  place: IPublicPlaceType;
}

export interface IPublicPlaceType {
  publicPlaceId?: string;
  description?: string;
  images: string[];
  name?: string;
  userEmail?: string;
  status?: string;
  addedOn: Date;
  rate: number;
  longitude?: number;
  latitude?: number;
  city?: string;
  totalRates?: number;
  myRate?: number;
  averageRate?: number;
}

export interface RatePlaceModel {
  id: string;
  score: number;
}

export interface PrivateModel {
  place: MyPrivatePlacesModel;
}
export interface MyPrivatePlacesModel {
  placeId?: string;
  description?: string;
  images: string[];
  placeName?: string;
  userEmail?: string;
  status?: string;
  addedOn: Date;
  longitude?: number;
  latitude?: number;
  registerNumber?: number;
  imageOfOwnerID?: string;
  imageOfOwnershipProof?: string;
  categoryID: string;
  availableFrom: Date | null;
  availableTo: Date | null;
}
