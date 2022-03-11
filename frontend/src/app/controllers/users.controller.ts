import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { LoginDTO } from '../dtos/login.dtos';

@Injectable()
export class UsersController {
    private api: string = environment.api;

    constructor(private http: HttpClient) {}

    async create(user: User): Promise<User> {
        return this.http
            .post<User>(`${this.api}/users`, user)
            .toPromise()
            .then((data) => {
                return data;
            });
    }

    async login(user: User): Promise<LoginDTO> {
        return this.http
            .post<LoginDTO>(`${this.api}/sessions`, user)
            .toPromise()
            .then((data) => {
                return data;
            });
    }

    async findUser(id: string | undefined): Promise<User> {
        return this.http
            .get<User>(`${this.api}/users/${id}`)
            .toPromise()
            .then((data) => {
                return data;
            });
    }

    async deleteUser(id: string | undefined): Promise<any> {
        return this.http
            .delete<any>(`${this.api}/users/${id}`)
            .toPromise()
            .then((data) => {
                return data;
            });
    }
}
