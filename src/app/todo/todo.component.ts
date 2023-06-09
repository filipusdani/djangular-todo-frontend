import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl("todo/list")
  }

  navigate(path: string) {
    this.router.navigateByUrl(path)
  }
}
