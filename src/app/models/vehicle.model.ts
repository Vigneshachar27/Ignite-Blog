import { Tag } from './tag.model';
import { User } from './user.model';

export type VehicleStatus = 'DRAFT' | 'PUBLISHED';

export interface Vehicle {
  id: number;
  title: string;           // vehicle name
  slug: string;
  excerpt: string;
  content: string;         // full details/specs
  author: User;
  tags: Tag[];
  status: VehicleStatus;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}
