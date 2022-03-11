import { User } from '../models/User';

export interface LoginDTO {
    token: string;
    auth: boolean;
    user: User;
}
