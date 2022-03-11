import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { User } from 'src/app/models/User';
import { UsersController } from 'src/app/controllers/users.controller';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
    user: User;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private usersController: UsersController,
        private toast: ToastService
    ) {}

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user') as string);
    }

    async delete() {
        try {
            await this.usersController.deleteUser(this.data.id);
            this.toast.toast('Conta deletada com sucesso!');
            localStorage.clear();
            this.router.navigate(['']);
        } catch (error: any) {
            this.toast.toast(error.error.message, true);
        }
    }
}
