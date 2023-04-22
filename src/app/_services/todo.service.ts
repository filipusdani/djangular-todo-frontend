import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Todo, TodoCategory } from '../../types/Appform';

const API_Todo_Endpoint = environment.todoUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {}
  todo: Todo[] = [];

  public initTodoList() {
    return this.http.get<Todo[]>(API_Todo_Endpoint + "?format=json");
  }

  public getTodo(id: number) {
    let url = API_Todo_Endpoint + String(id) + "/"
    return this.http.get<Todo>(url);
  }

  public patchTodo(id: number, param: any) {
    let url = API_Todo_Endpoint + String(id) + "/"
    let body = JSON.stringify(param);
    return this.http.patch<any>(url, body, httpOptions)
  }

  public postTodo(param: Todo) {
    let body = JSON.stringify(param);
    return this.http.post<any>(API_Todo_Endpoint, body, httpOptions)
  }

  public putTodo(id: number, param: any) {
    let url = API_Todo_Endpoint + String(id) + "/"
    let body = JSON.stringify(param);
    return this.http.put<any>(url, body, httpOptions)
  }

  public deleteTodo(id: number) {
    let url = API_Todo_Endpoint + String(id) + "/"
    return this.http.delete<any>(url, httpOptions)
  }

  public initTodoCategoryList() {
    return this.http.get<TodoCategory[]>(API_Todo_Endpoint + "category/?format=json");
  }

  public postTodoCategory(param: TodoCategory) {
    let body = JSON.stringify(param);
    let url = API_Todo_Endpoint + "category/"
    return this.http.post<any>(url, body, httpOptions)
  }

  public deleteTodoCategory(id: number) {
    let url = API_Todo_Endpoint + "category/" + String(id) + "/"
    return this.http.delete<any>(url, httpOptions)
  }
}
