import { ApiComment, ApiUser } from 'src/app/theme/types/api.types';

export interface Post {
  user: ApiUser;
  id: number;
  title: string;
  body: string;
  coment: ApiComment;
}
