import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
    providedIn: 'root',
})
export class JwtService {
    isTokenValid(): Boolean {
        const user = localStorage.getItem('user') as string;
        const token = localStorage.getItem('token') as string;

        return JSON.parse(user) && !jwtHelper.isTokenExpired(token);
    }
}
