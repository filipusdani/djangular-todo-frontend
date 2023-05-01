import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/_services/todo.service';
import { Todo, TodoCategory } from 'src/types/Appform';
import { TodoSnackBarComponent } from './snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

// ===============================================================================================================================

@Component({
    selector: 'edit-todo-dialog',
    templateUrl: 'edit-todo-dialog.html',
    styleUrls: ['./todo-dialog.css'],
  })
export class EditTodoDialog implements OnInit {

  category_list: TodoCategory[] = []

  editTodoForm: FormGroup = new FormGroup({
    task: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    due_date: new FormControl(''),
    order: new FormControl(0),
  })

  id: number = 0;
  edittedTodo: Todo = {
    id: 0,
    task: '',
    description: '',
    category: '',
    due_date: '',
    order: 0,
    status: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<EditTodoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private fb: FormBuilder,
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.id = this.data
    this.todoService.getTodo(this.id).subscribe(
      res => {
        console.log("Todo Retrieved", res)
        this.edittedTodo = res
      }
    )
    this.todoService.initTodoCategoryList().subscribe((res: TodoCategory[]) => {
      this.category_list = res
      console.log(res)
    })
    this.editTodoForm = this.fb.group({
      task: [this.edittedTodo.task, Validators.required],
      description: [this.edittedTodo.description],
      category: [this.edittedTodo.category],
      due_date: [this.edittedTodo.due_date],
      order: [this.edittedTodo.order],
    })
  }
  get f(): { [key: string]: AbstractControl } {return this.editTodoForm.controls;}

  onNoClick(): void {
    this.dialogRef.close({data:"Dialog Closed"})
  }

  saveEditTodo() {
    if (this.editTodoForm.valid) {
      if (this.editTodoForm.value.due_date == "") {
        this.editTodoForm.patchValue({due_date: null})
      }
      else if (typeof(this.editTodoForm.value.due_date) == 'object') {
        let temp = this.editTodoForm.value.due_date
        let dateStr = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate(), temp.getHours(), temp.getMinutes() - temp.getTimezoneOffset()).toISOString()
        dateStr = dateStr.slice(0,10)
        this.editTodoForm.patchValue({due_date: dateStr});
      }
      if (this.editTodoForm.value.category == "") {
        this.editTodoForm.patchValue({category: this.edittedTodo.category})
      }
      this.editTodoForm.patchValue({order: this.edittedTodo.order})
      console.log(this.editTodoForm.value)
      this.submitEditTodo(this.editTodoForm.value)
    }
  }
  
  submitEditTodo(param: Todo) {
    this.todoService.putTodo(this.id, param).subscribe(
      res => {console.log("Edit Submitted", res)
      this.openSnackBar("Task Edited")
      this.dialogRef.close();
    })
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(TodoSnackBarComponent, {
      duration: 2000,
      data: message,
    })
  }
}