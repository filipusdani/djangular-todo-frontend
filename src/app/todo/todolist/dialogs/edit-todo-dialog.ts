import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/_services/todo.service';
import { Todo } from 'src/types/Appform';

// ===============================================================================================================================

@Component({
    selector: 'Edit-todo-dialog',
    templateUrl: 'Edit-todo-dialog.html',
    styleUrls: ['./todo-dialog.css'],
  })
export class EditTodoDialog implements OnInit {

  category_list = [
    { value:"GEN", name:'General' },
    { value:"CIT", name:'CIT' },
    { value:"SEP", name:'SEP' },
  ]

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
    private todoService: TodoService) {}

  ngOnInit(): void {
    this.id = this.data
    this.todoService.getTodo(this.id).subscribe(
      res => {
        console.log("Todo Retrieved", res)
        this.edittedTodo = res
      }
    )
    this.editTodoForm = this.fb.group({
      task: [this.edittedTodo.task, Validators.required],
      description: [this.edittedTodo.description],
      category: [this.edittedTodo.category],
      due_date: [this.edittedTodo.due_date],
      order: [this.edittedTodo.order],
    });
  }
  get f(): { [key: string]: AbstractControl } {return this.editTodoForm.controls;}

  onNoClick(): void {
    this.dialogRef.close({data:"Dialog Closed"});
  }

  saveEditTodo() {
    if (this.editTodoForm.valid) {
      let temp = this.editTodoForm.value.due_date
      if (typeof(temp)=='object' && temp!=null) {
        let dateStr = temp.getUTCFullYear() + '-' + (String('0'+(temp.getUTCMonth()+1))).slice((String('0'+(temp.getUTCMonth()+1))).length-2, (String('0'+(temp.getUTCMonth()+1))).length) + '-' + (temp.getUTCDate()+1) 
        this.editTodoForm.patchValue({due_date: dateStr});
      }
      this.editTodoForm.patchValue({order: this.edittedTodo.order})
      this.dialogRef.close();
      this.submitEditTodo(this.editTodoForm.value)
    }
  }
  
  submitEditTodo(param: Todo) {
    this.todoService.putTodo(this.id, param).subscribe(
      res => console.log("Edit Submitted", res)
    )
  }
}