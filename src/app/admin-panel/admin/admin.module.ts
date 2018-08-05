import {NgModule} from '@angular/core';
import {SharedModule} from '../../modules/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdditionPopupComponent} from './addition-popup/addition-popup.component';
import {AdminComponent} from './admin.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AdditionPopupComponent,
    AdminComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
  ],
  exports: [
    AdminComponent
  ],
  entryComponents: [
    AdditionPopupComponent
  ]
})
export class AdminModule {
}