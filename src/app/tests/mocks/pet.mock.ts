import { PetStatus } from '../../models/status.enum';

export const petMock = {
  id: 999,
  name: 'Milky',
  category: { id: 0, name: 'cat' },
  status: PetStatus.PENDING,
  tags: [
    { id: 0, name: 'kitten' }
  ],
  photoUrls: ['https://t4.ftcdn.net/jpg/00/27/27/71/360_F_27277141_4uhRVl4hJgtacBgDPla0sklkxaFWFFPA.jpg'],
};
