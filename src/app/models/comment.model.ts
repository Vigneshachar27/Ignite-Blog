import { User } from './user.model';

export type CommentStatus = 'APPROVED' | 'PENDING';

export interface Comment {
  id: number;
  vehicleId: number;
  author: User;
  content: string;
  status: CommentStatus;
  createdAt: string;
}
