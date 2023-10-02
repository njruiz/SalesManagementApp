import { Photo } from './photo';

export interface Member {
  id: number;
  userName: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  address: string;
  contactNumber: string;
  created: string;
  lastActive: string;
  photos: Photo[];
}
