import { User } from './user.model';
import { Tag } from './tag.model';


export type VehicleStatus = 'AVAILABLE' | 'SOLD' | 'ON_HOLD';

export interface Vehicle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: User;
  tags: Tag[];
  status: VehicleStatus;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}
