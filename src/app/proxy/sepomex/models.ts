
export interface CountryDto {
  id: number;
  name?: string;
}

export interface NeighborhoodDto {
  id: number;
  name?: string;
  zipCodeId?: string;
}

export interface StateDto {
  id: number;
  name?: string;
  countryId: number;
}

export interface TownDto {
  id: number;
  name?: string;
  stateId: number;
}

export interface ZipCodeDto {
  id?: string;
  townId: number;
}
