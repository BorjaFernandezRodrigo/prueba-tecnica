import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { routing } from './app.routing';
import { MaterialsModule } from './theme/shared/materials.module';
import { ComponentsModule } from './theme/components/components.module';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ErrorComponent } from './pages/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './pages/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    DashboardComponent,
    MaintenanceComponent,
    NotFoundComponent,
    ErrorComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    MaterialsModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
