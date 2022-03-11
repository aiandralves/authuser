import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UsersController } from '../controllers/users.controller';
import { AuthInterceptor } from '../guards/auth.interceptor';
import { PopupComponent } from '../components/popup/popup.component';

const modules = [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
];

const providers = [UsersController];

const components = [PopupComponent];

@NgModule({
    declarations: [...components],
    imports: [...modules],
    exports: [...modules],
    providers: [
        ...providers,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
})
export class SharedModule {}
