import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/theme/services/api.service';
import { ApiPost, ApiUser } from 'src/app/theme/types/api.types';
import { DashboardPost } from './types/dashboard.type';

@Injectable({
  providedIn: 'any',
})
export class DashboardService {
  private urlposts = 'posts';
  private urlusers = 'posts';

  constructor(private apiService: ApiService) {}

  loadData(): Observable<DashboardPost[]> {
    return forkJoin({
      posts: this.apiService.get(this.urlposts),
      users: this.apiService.get(this.urlusers),
    }).pipe(
      map((res: { posts: ApiPost[]; users: ApiUser[] }) => {
        return this.buildData(res);
      })
    );
  }

  buildData(data: { posts: ApiPost[]; users: ApiUser[] }): DashboardPost[] {
    const dashboardPosts: DashboardPost[] = [];
    data.posts.forEach((post) => {
      const userPost: ApiUser = data.users.find(
        (user) => user.id === post.userId
      );
      const aux = {
        userName: userPost.username,
        id: post.id,
        title: post.title,
        body: post.body,
      };
      dashboardPosts.push(aux);
    });
    return dashboardPosts;
  }
}
