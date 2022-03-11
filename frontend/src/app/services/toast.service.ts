import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private snackBar: MatSnackBar) {}

    async toast(
        message: string,
        isError: boolean = false,
        duration: number = 3000
    ): Promise<void> {
        this.snackBar.open(message, 'x', {
            duration: duration,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: isError ? ['alert-error'] : ['alert-success'],
        });
    }
}
