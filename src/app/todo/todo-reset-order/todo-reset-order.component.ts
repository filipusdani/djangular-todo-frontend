import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/_services/todo.service';
import { Todo } from 'src/types/Appform';

@Component({
  selector: 'app-todo-reset-order',
  templateUrl: './todo-reset-order.component.html',
  styleUrls: ['./todo-reset-order.component.css']
})
export class TodoResetOrderComponent implements OnInit {

  todolist: Todo[] = []
  id_list: number[] = []
  order: number = 1

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  forceResetOrder() {
    this.todoService.initTodoList().subscribe((res: Todo[]) => {
      this.todolist = res.sort((a, b) => { return a.order - b.order })
      this.id_list = this.todolist.map(x => x.id)
      for (let i = 0; i < this.id_list.length; i++) {
        this.todoService.patchTodo(this.id_list[i], {order:this.order}).subscribe(
          res => {console.log("Edit Submitted", res, this.id_list[i])
        })
      }
    })
  }
}
