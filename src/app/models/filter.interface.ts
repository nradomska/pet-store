import { PetStatus } from './status.enum';

export interface Filter {
  name: string;
  status: PetStatus;
}
