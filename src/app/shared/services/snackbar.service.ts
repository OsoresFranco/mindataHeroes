import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbarService:MatSnackBar) { }

  openSnackbar(message:string, action:string):void{
    this.snackbarService.open(message, action)
  }
}
