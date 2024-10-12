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

export type { GetAllSpeciesRes, GetAllSpeciesFilter };
