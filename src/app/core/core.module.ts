import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from './pipes/truncate.pipe';



@NgModule({
  declarations: [TruncatePipe],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[TruncatePipe]
})
export class CoreModule { } 