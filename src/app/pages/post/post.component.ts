import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from './post.service';
import { Post } from './types/post.type';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public post: Post;

  public commetOpen: boolean;

  public loadSpinner: boolean;

  constructor(private route: ActivatedRoute, private postService: PostService) {
    this.loadSpinner = true;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { postId: number; userId: number }) => {
      this.postService.loadData(params.postId, params.userId).subscribe((res) => {
        this.post = res;
        this.loadSpinner = false;
      });
    });
  }
}
