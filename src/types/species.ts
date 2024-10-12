import { PaginationQuery } from "./pagination";

interface GetAllSpeciesRes {
  id: string;
  faoCode: string;
  typeOfFish: string;
  scientificName: string;
  englishName: string;
  indonesianName: string;
  localName: string;
  typeOfWater: string;
  imageUrl: string | null;
  statusInIndonesia: string;
  fishUtilization: string;
}

interface GetAllSpeciesFilter extends PaginationQuery {
  Keyword?: string;
}

interface CreateSpeciesReq {
  faoCode: string;
  typeOfFish: string;
  scientificName: string;
  englishName: string;
  indonesianName: string;
  localName: string;
  typeOfWater: string;
  imageUrl: string;
  statusInIndonesia: string;
  fishUtilization: string;
}

interface UpdateSpeciesReq {
  id: string;
  data: CreateSpeciesReq;
}

export type { GetAllSpeciesRes, GetAllSpeciesFilter, CreateSpeciesReq, UpdateSpeciesReq };
