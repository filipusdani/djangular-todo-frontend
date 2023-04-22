import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/_services/todo.service';
import { Todo, TodoCategory } from 'src/types/Appform';
import { TodoSnackBarComponent } from './snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

// ===============================================================================================================================

@Component({
    selector: 'new-todo-dialog',
    templateUrl: 'new-todo-dialog.html',
    styleUrls: ['./todo-dialog.css'],
  })
export class NewTodoDialog implements OnInit {

  category_list: TodoCategory[] = []

  newTodoForm: FormGroup = new FormGroup({
    task: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    due_date: new FormControl(''),
    order: new FormControl(0),
  })

  constructor(
    public dialogRef: MatDialogRef<NewTodoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private fb: FormBuilder,
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.newTodoForm = this.fb.group({
      task: ['', Validators.required],
      description: [''],
      category: [''],
      due_date: [''],
      order: [0]
    });
    this.todoService.initTodoCategoryList().subscribe((res: TodoCategory[]) => {
      this.category_list = res;
      console.log(res);
    })
  }
  get f(): { [key: string]: AbstractControl } {return this.newTodoForm.controls;}

  onNoClick(): void {
    this.dialogRef.close({data:"Dialog Closed"});
  }

  saveNewTodo() {
    if (this.newTodoForm.valid) {
      if (this.newTodoForm.value.due_date == "") {
        this.newTodoForm.patchValue({due_date: null});
      }
      else {
        let temp = this.newTodoForm.value.due_date
        let dateStr = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate(), temp.getHours(), temp.getMinutes() - temp.getTimezoneOffset()).toISOString();
        dateStr = dateStr.slice(0,10)
        this.newTodoForm.patchValue({due_date: dateStr});
      }
      this.newTodoForm.patchValue({order: this.data});
      this.dialogRef.close();
      console.log(this.newTodoForm.value)
      this.submitNewTodo(this.newTodoForm.value)
    }
  }
  
  submitNewTodo(param: Todo) {
    this.todoService.postTodo(param).subscribe(
      res => {console.log("New Todo Submitted", res)
      this.openSnackBar("Task Created")
    })
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(TodoSnackBarComponent, {
      duration: 2000,
      data: message,
    });
  }
}