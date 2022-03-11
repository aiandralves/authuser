import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/User';
import { UsersController } from 'src/app/controllers/users.controller';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-singin',
    templateUrl: './singin.component.html',
})
export class SinginComponent implements OnInit {
    formGroup: FormGroup = new FormGroup({});

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private usersController: UsersController,
        private toast: ToastService
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.formGroup = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    async login() {
        try {
            if (this.formGroup.dirty && this.formGroup.valid) {
                let response = await this.usersController.login(
                    <User>this.formGroup.value
                );
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));

                this.router.navigate(['/home']);
            } else {
                this.toast.toast('Campo nome e senha são obrigatórios!', true);
            }
        } catch (error: any) {
            this.toast.toast(error.error.message, true);
        }
    }
}
