import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MaterialsModule } from '../shared/materials.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [SearchComponent, BreadcrumbComponent],
  exports: [SearchComponent, BreadcrumbComponent],
  imports: [CommonModule, MaterialsModule],
})
export class ComponentsModule {}
