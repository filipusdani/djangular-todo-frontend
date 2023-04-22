import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from 'src/app/_services/todo.service';
import { TodoCategorySnackBarComponent } from './snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

// ===============================================================================================================================

@Component({
    selector: 'delete-todo-category-dialog',
    templateUrl: 'delete-todo-category-dialog.html',
  })
export class DeleteTodoCategoryDialog implements OnInit {

  id: number = 0

  constructor(
    public dialogRef: MatDialogRef<DeleteTodoCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.id = this.data
  }

  onNoClick(): void {
    this.dialogRef.close({data:"Dialog Closed"})
  }
 
  submitDeleteTodoCategory() {
    this.todoService.deleteTodoCategory(this.id).subscribe(
    res => {
        console.log("Delete Submitted", res)
        this.openSnackBar("Category Deleted")
        this.dialogRef.close()
    })
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(TodoCategorySnackBarComponent, {
      duration: 2000,
      data: message,
    })
  }
}