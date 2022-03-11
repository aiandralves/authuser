import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { User } from 'src/app/models/User';
import { UsersController } from 'src/app/controllers/users.controller';
import { PopupComponent } from 'src/app/components/popup/popup.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    user: User;

    constructor(
        private popup: MatDialog,
        private router: Router,
        private usersController: UsersController
    ) {}

    ngOnInit(): void {
        this.findUser();
        this.user = JSON.parse(localStorage.getItem('user') as string);
    }

    async findUser() {
        let user = await this.usersController.findUser(this.user.id);
        this.user.name = user.name;
        this.user.email = user.email;
    }

    openPopup(user: User) {
        const openModal = this.popup.open(PopupComponent, {
            data: {
                id: user.id,
            },
        });

        openModal.afterClosed().subscribe((result) => {
            console.log('Fechado!!!');
        });
    }

    public logout() {
        localStorage.clear();
        this.router.navigate(['']);
    }
}
