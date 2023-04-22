import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/_services/todo.service';
import { Todo } from 'src/types/Appform';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { NewTodoDialog } from './dialogs/new-todo-dialog';
import { EditTodoDialog } from './dialogs/edit-todo-dialog';
import { DeleteTodoDialog } from './dialogs/delete-todo-dialog';

// ===============================================================================================================================

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  todolist: Todo[] = []
  new_order = 0
  loadingDragDrop: boolean = false
  category_list: String[] = []

  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.reload()
  }

  reload(): void {
    this.todoService.initTodoList().subscribe((res: Todo[]) => {
      this.todolist = res.sort((a, b) => { return a.order - b.order })
      console.log(res)
    })
  }

  drop(event: CdkDragDrop<Todo[]>) {
    let end = this.todolist[event.currentIndex].order
    moveItemInArray(this.todolist, event.previousIndex, event.currentIndex);
    let start = this.todolist[event.currentIndex].order
    this.changeOrder(start, end)
    if (start < end) {
      for (let i = start; i < end; i++) {
        this.changeOrder(i+1, i)
      }
    }
    if (start > end) {
      for (let i = start; i > end; i--) {
        this.changeOrder(i-1, i)
      }
    }
  }

  changeOrder(start:number, goal:number) {
    let changedId = (this.todolist.filter(x => x.order == start))[0].id
    let changedOrder = (this.todolist.filter(x => x.order == goal))[0].order
    // Change todolist value
    this.loadingDragDrop = true;
    this.todoService.patchTodo(changedId, {id:changedId, order:changedOrder}).subscribe(
      res => {
        console.log("ID:",changedId, "-> Order:", changedOrder)
        this.reload()
        this.loadingDragDrop = false
      },
      error => console.log("Error:", error)
    )
  }

  newTodoDialog(): void {
    if (this.todolist.length > 0) {
      this.new_order = this.todolist[this.todolist.length - 1].order + 1
    }
    const dialogRef = this.dialog.open(NewTodoDialog, {
      width: '500px',
      data: this.new_order,
      autoFocus: false,
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('New Todo dialog was closed')
      this.reload()
    })
  }

  editTodoDialog(id: number): void {
    const dialogRef = this.dialog.open(EditTodoDialog, {
      width: '500px',
      data: id,
      autoFocus: false,
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('Edit Todo dialog was closed')
      this.reload()
    })
  }

  deleteTodo(id: number): void {
    const dialogRef = this.dialog.open(DeleteTodoDialog, {
      width: '400px',
      data: id,
      autoFocus: false,
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete Todo dialog was closed')
      this.reload()
    })
  }

  getCategoryList(): void {
    this.category_list = this.todolist.map(x => x.category).filter((item, i, ar) => ar.indexOf(item) === i)
    this.todoService.initTodoList().subscribe((res: Todo[]) => {
      this.category_list = this.todolist.map(x => x.category).filter((item, i, ar) => ar.indexOf(item) === i)
    })
  }

  filterCategory(category: String): void {
    this.todolist = this.todolist.filter(item => item.category === category)
  }
}