import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DashboardPost } from './types/dashboard.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit {
  public dashboardPosts: DashboardPost[] | undefined;

  public dashboardPostsSearch: DashboardPost[] | undefined;

  public keySerach = [
    {
      prop: 'userName',
      name: 'Usuario',
    },
    {
      prop: 'title',
      name: 'Titulo',
    },
    {
      prop: 'body',
      name: 'Contenido',
    },
  ];

  constructor(private dashboardService: DashboardService) {
    this.dashboardPosts = undefined;
  }

  ngOnInit(): void {
    this.dashboardService.loadData().subscribe((res: DashboardPost[]) => {
      this.dashboardPosts = res;
    });
  }
}
