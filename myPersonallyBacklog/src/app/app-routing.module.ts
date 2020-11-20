import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TopicEditComponent } from './topic-edit/topic-edit.component';


const routes: Routes = [
  {path: 'edittask/:id', component: TaskEditComponent},
  {path: 'edittopic/:id', component: TopicEditComponent},
  {path: 'newtask/:parentId', component: TaskEditComponent},
  {path: 'not-found', component: Error404Component},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
