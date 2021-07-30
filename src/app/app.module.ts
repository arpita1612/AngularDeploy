import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CubejsClientModule, QueryBuilderService } from '@cubejs-client/ngx';
import { ChartsModule } from 'ng2-charts';
import { HttpLink } from 'apollo-angular/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { GridsterModule } from 'angular-gridster2';
import { AppComponent } from './app.component';
import { ExploreComponent } from './explore/explore.component';
import { MembersGroupComponent } from './explore/members-group/members-group.component';
import { TimeGroupComponent } from './explore/time-group/time-group.component';
import { OrderComponent } from './explore/order/order.component';
import { PivotComponent } from './explore/pivot/pivot.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import {
  FilterGroupComponent,
  FilterComponent,
} from './explore/filter-group/filter-group.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddToDashboardDialogComponent } from './explore/add-to-dashboard-dialog/add-to-dashboard-dialog.component';
import { QueryRendererComponent } from './explore/query-renderer/query-renderer.component';
import apolloClient from '../graphql/client';
import { TablechartComponent } from './tablechart/tablechart.component';
import { FormsModule } from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {OrderModule} from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination' ;
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md'
import { GridModule } from 'smart-webcomponents-angular/grid';
import {AgGridModule} from 'ag-grid-angular';

const API_URL = 'https://rolling-gleneaston.aws-us-east-2.cubecloudapp.dev';//https:real-time-dashboard-api.herokuapp.com';'http://localhost:4000'
const CUBEJS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTY3NTc0NTV9.kMqoehXoIFICRJxdVabRG3RravrHb7scSmM7oa4JBB0';
const cubejsOptions = {
  token: CUBEJS_TOKEN,
  options: {
    apiUrl: `${API_URL.replace(/\/$/, '')}/cubejs-api/v1`,
  },
};
@NgModule({
  declarations: [
    AppComponent,
    ExploreComponent,
    DashboardComponent,
    QueryRendererComponent,
    MembersGroupComponent,
    TimeGroupComponent,
    OrderComponent,
    PivotComponent,
    SettingsDialogComponent,
    AddToDashboardDialogComponent,
    FilterGroupComponent,
    FilterComponent,
    TablechartComponent,
  ],
  entryComponents: [SettingsDialogComponent, AddToDashboardDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CubejsClientModule.forRoot(cubejsOptions),
    AgGridModule.withComponents([]),
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    ChartsModule,
    DragDropModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatListModule,
    AppRoutingModule,
    MatMenuModule,
    GridsterModule,
    FormsModule,
    Ng2SearchPipeModule,
    OrderModule,
    NgxPaginationModule,
    RouterModule,
    WavesModule,
    GridModule,
    
  ],
  providers: [
    QueryBuilderService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => apolloClient,
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
