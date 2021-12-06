
export interface AddressDto {
  countryId?: number;
  stateId?: number;
  townId?: number;
  neighborhoodId?: number;
  zipCodeId?: string;
  indoorNumber?: string;
  outdoorNumber?: string;
  streetName?: string;
}

export interface CreateUpdateAddressDto {
  id?: string;
  countryId?: number;
  stateId?: number;
  townId?: number;
  neighborhoodId?: number;
  zipCodeId?: string;
  indoorNumber?: string;
  outdoorNumber?: string;
  streetName?: string;
}
