import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/User';
import { UsersController } from 'src/app/controllers/users.controller';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-singup',
    templateUrl: './singup.component.html',
})
export class SingupComponent implements OnInit {
    formGroup: FormGroup = new FormGroup({});

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private usersController: UsersController,
        private toast: ToastService
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.formGroup = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });
    }

    async createUser() {
        try {
            if (this.formGroup.dirty && this.formGroup.valid) {
                let user: User = <User>this.formGroup.value;
                await this.usersController.create(user);
                this.toast.toast('Usuário cadastrado com sucesso!');
                this.router.navigate(['']);
            } else {
                this.toast.toast('Preencha os campos obrigatórios', true);
            }
        } catch (error: any) {
            this.toast.toast(error.error.message, true);
        }
    }
}
