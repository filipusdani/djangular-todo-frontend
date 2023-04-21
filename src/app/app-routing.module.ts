import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoComponent } from './todo/todo.component';
import { TodolistComponent } from './todo/todolist/todolist.component';

const routes: Routes = [
  { path: '',   redirectTo: 'todo/list', pathMatch: 'full' },
  { path: '**', redirectTo: 'todo/list', pathMatch: 'full' },
  { path: 'todo',   component: TodoComponent, children: [
    { path: 'list', component: TodolistComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
