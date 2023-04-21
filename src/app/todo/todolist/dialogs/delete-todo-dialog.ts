import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from 'src/app/_services/todo.service';

// ===============================================================================================================================

@Component({
    selector: 'Delete-todo-dialog',
    templateUrl: 'Delete-todo-dialog.html',
  })
export class DeleteTodoDialog implements OnInit {

  id: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DeleteTodoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private todoService: TodoService) {}

  ngOnInit(): void {
    this.id = this.data
  }

  onNoClick(): void {
    this.dialogRef.close({data:"Dialog Closed"});
  }
 
  submitDeleteTodo() {
    this.todoService.deleteTodo(this.id).subscribe(
    res => {
        console.log("Delete Submitted", res)
        this.dialogRef.close()
    })
  }
}