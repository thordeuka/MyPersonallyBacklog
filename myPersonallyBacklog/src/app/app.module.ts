import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BacklogTaskComponent } from './backlog-task/backlog-task.component';
import { TaskKindFilterPipe } from './task-kind-filter.pipe';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { FormsModule } from '@angular/forms';
import { ParentFilterPipe } from './parent-filter.pipe';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { Error404Component } from './error404/error404.component';
import { BacklogWorkComponent } from './backlog-work/backlog-work.component';

@NgModule({
  declarations: [
    AppComponent,
    BacklogTaskComponent,
    TaskKindFilterPipe,
    FilterBarComponent,
    ParentFilterPipe,
    TaskEditComponent,
    Error404Component,
    BacklogWorkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
