import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFormComponent } from './angular-form/angular-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutputTableComponent } from './output-table/output-table.component';

@NgModule({
  declarations: [AppComponent, AngularFormComponent, OutputTableComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
