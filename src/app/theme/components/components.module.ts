import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MaterialsModule } from '../shared/materials.module';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [SearchComponent, PortfolioComponent, BreadcrumbComponent],
  exports: [SearchComponent, PortfolioComponent, BreadcrumbComponent],
  imports: [CommonModule, MaterialsModule],
})
export class ComponentsModule {}
