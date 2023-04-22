import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import { TodoComponent } from './todo/todo.component';
import { TodolistComponent } from './todo/todolist/todolist.component';
import { NewTodoDialog } from './todo/todolist/dialogs/new-todo-dialog';
import { EditTodoDialog } from './todo/todolist/dialogs/edit-todo-dialog';
import { DeleteTodoDialog } from './todo/todolist/dialogs/delete-todo-dialog';
import { TodoCategoryComponent } from './todo/todo-category/todo-category.component';
import { TodoSnackBarComponent } from './todo/todolist/dialogs/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodolistComponent,
    NewTodoDialog,
    EditTodoDialog,
    DeleteTodoDialog,
    TodoCategoryComponent,
    TodoSnackBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
