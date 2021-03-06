import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FileUploadModule

  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    BsDatepickerModule,
    FileUploadModule

  ]
})
export class SharredModule { }
