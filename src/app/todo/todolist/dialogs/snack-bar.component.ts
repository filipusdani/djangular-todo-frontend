import { Component, Inject, inject } from "@angular/core";
import { MatSnackBarRef } from "@angular/material/snack-bar";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
    selector: 'snack-bar-component',
    templateUrl: 'snack-bar.component.html',
    styles: [
      `
      :host {
        display: flex;
      }
  
      .example-pizza-party {
        color: hotpink;
      }
    `,
    ],
  })
  export class TodoSnackBarComponent {
    snackBarRef = inject(MatSnackBarRef);

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
  }