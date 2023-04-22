import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from 'src/app/_services/todo.service';
import { TodoCategory } from 'src/types/Appform';
import { NewTodoCategoryDialog } from './dialogs/new-todo-category-dialog';
import { DeleteTodoCategoryDialog } from './dialogs/delete-todo-category-dialog';

@Component({
  selector: 'app-todo-category',
  templateUrl: './todo-category.component.html',
  styleUrls: ['./todo-category.component.css']
})
export class TodoCategoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'tag']
  category_list: TodoCategory[] = []

  constructor(
    private todoService: TodoService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.reload()
  }

  reload(): void {
    this.todoService.initTodoCategoryList().subscribe((res: TodoCategory[]) => {
      this.category_list = res
      console.log(res)
    })
  }

  newTodoCategoryDialog(): void {
    const dialogRef = this.dialog.open(NewTodoCategoryDialog, {
      width: '500px',
      autoFocus: false,
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('New Todo dialog was closed');
      this.reload()
    })
  }

  deleteTodoCategory(row: any): void {
    const dialogRef = this.dialog.open(DeleteTodoCategoryDialog, {
      width: '400px',
      data: row.id,
      autoFocus: false,
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete Todo dialog was closed');
      this.reload()
    })
  }
}
