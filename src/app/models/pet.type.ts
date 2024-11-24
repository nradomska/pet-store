import { PetStatus } from './status.enum';

export type Pet = {
  id: number;
  category: PetCategory;
  name: string;
  photoUrls: string[]
  tags: PetTag[];
  status: PetStatus;
}

export type PetTag = {
  id: number;
  name: string
}

export type PetCategory = {
  id: number;
  name: string
}
