import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MaterialsModule } from '../shared/materials.module';
import { PortfolioComponent } from './portfolio/portfolio.component';

@NgModule({
  declarations: [SearchComponent, PortfolioComponent],
  exports: [SearchComponent, PortfolioComponent],
  imports: [CommonModule, MaterialsModule],
})
export class ComponentsModule {}
