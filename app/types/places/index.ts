export interface PublicPlaceResponse {
  id: number;
  publicPlaceId?: string;
  description?: string;
  images: string[];
  location?: string;
  name?: string;
  userEmail?: string;
  status?: string;
  addedOn: Date;
}
