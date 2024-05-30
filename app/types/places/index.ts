
export interface PublicPlaceResponse {
  numberOfRates: number;
  averageScore: number; 
  place: IPublicPlaceType
}

interface IPublicPlaceType {
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
  id: string
  score: number
}