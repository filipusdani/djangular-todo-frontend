import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/_services/todo.service';
import { TodoCategory } from 'src/types/Appform';
import { TodoCategorySnackBarComponent } from './snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

// ===============================================================================================================================

@Component({
    selector: 'new-todo-category-dialog',
    templateUrl: 'new-todo-category-dialog.html',
    styleUrls: ['./todo-category-dialog.css'],
  })
export class NewTodoCategoryDialog implements OnInit {

  newTodoCategoryForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    tag: new FormControl(''),
  })

  constructor(
    public dialogRef: MatDialogRef<NewTodoCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private fb: FormBuilder,
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.newTodoCategoryForm = this.fb.group({
      name: ['', Validators.required],
      tag: ['', Validators.required],
    })
  }
  get f(): { [key: string]: AbstractControl } {return this.newTodoCategoryForm.controls;}

  onNoClick(): void {
    this.dialogRef.close({data:"Dialog Closed"})
  }

  saveNewTodoCategory() {
    if (this.newTodoCategoryForm.valid) {
      this.dialogRef.close();
      console.log(this.newTodoCategoryForm.value)
      this.submitNewTodoCategory(this.newTodoCategoryForm.value)
    }
  }
  
  submitNewTodoCategory(param: TodoCategory) {
    this.todoService.postTodoCategory(param).subscribe(
      res => {console.log("New Todo Category Submitted", res)
      this.openSnackBar("Category Created")
    })
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(TodoCategorySnackBarComponent, {
      duration: 2000,
      data: message,
    });
  }
}