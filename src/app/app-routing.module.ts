import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoComponent } from './todo/todo.component';
import { TodolistComponent } from './todo/todolist/todolist.component';
import { TodoCategoryComponent } from './todo/todo-category/todo-category.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TodoResetOrderComponent } from './todo/todo-reset-order/todo-reset-order.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'todo', component: TodoComponent, children: [
    { path: 'list', component: TodolistComponent},
    { path: 'category', component: TodoCategoryComponent},
    { path: 'reset-order', component: TodoResetOrderComponent},
  ]},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
