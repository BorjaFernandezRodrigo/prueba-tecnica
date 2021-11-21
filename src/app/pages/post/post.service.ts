import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/theme/services/api.service';
import { ApiComment, ApiPost, ApiUser } from 'src/app/theme/types/api.types';
import { Post } from './types/post.type';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private urlposts = 'posts';

  private urlusers = 'users';

  private urlComment = 'comments';

  constructor(private apiService: ApiService) {}

  loadData(postId: number, userId: number): Observable<Post> {
    return forkJoin({
      post: this.apiService.get(`${this.urlposts}/${postId}`),
      user: this.apiService.get(`${this.urlusers}/${userId}`),
      comment: this.apiService.get(`${this.urlposts}/${postId}/${this.urlComment}`),
    }).pipe(
      map((res: { post: ApiPost; user: ApiUser; comment: ApiComment[] }) => {
        return this.buildData(res);
      }),
    );
  }

  buildData(data: { post: ApiPost; user: ApiUser; comment: ApiComment[] }): Post {
    const dashboardPosts: Post = {
      user: data.user,
      id: data.post.id,
      title: data.post.title,
      body: data.post.body,
      comment: data.comment,
    };
    return dashboardPosts;
  }
}
