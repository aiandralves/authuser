import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./pages/singin/singin.module').then((m) => m.SinginModule),
    },
    {
        path: 'cadastrar',
        loadChildren: () =>
            import('./pages/singup/singup.module').then((m) => m.SingupModule),
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./pages/home/home.module').then((m) => m.HomeModule),
        canActivate: [AuthGuard],
    },
    {
        path: '',
        redirectTo: '**',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
