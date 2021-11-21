import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/theme/services/api.service';
import { ApiPost, ApiUser } from 'src/app/theme/types/api.types';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private urlposts = 'posts';

  private urlusers = 'users';

  public users: { name: string; id: number }[];

  public posts: ApiPost[];

  public loadingData: boolean;

  constructor(private apiService: ApiService) {
    this.loadingData = true;
    this.users = [];
    this.posts = [];
  }

  loadData(): Observable<boolean> {
    return forkJoin({
      posts: this.apiService.get(this.urlposts),
      users: this.apiService.get(this.urlusers),
    }).pipe(
      map((res: { posts: ApiPost[]; users: ApiUser[] }) => {
        this.users = res.users.map((user) => {
          return { name: user.username, id: user.id };
        });
        this.posts = res.posts;
        return true;
      }),
    );
  }

  updatePost(postId: number, body: any) {
    return this.apiService.put(`${this.urlposts}/${postId}`, body).pipe(
      map((res) => {
        this.posts = this.posts.map((post) => {
          if (post.id === postId) {
            post = res;
          }
          return post;
        });
        return res;
      }),
    );
  }

  deletePost(postId: number): Observable<boolean> {
    return this.apiService.delete(`${this.urlposts}/${postId}`).pipe(
      map(() => {
        this.posts = this.posts.filter((post) => post.id !== postId);
        return true;
      }),
    );
  }

  createPost(body: any): Observable<ApiPost> {
    return this.apiService.post(`${this.urlposts}`, body).pipe(
      map((res: ApiPost) => {
        this.posts.push(res);
        return res;
      }),
    );
  }
}
