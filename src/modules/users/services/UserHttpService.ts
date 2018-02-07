import {Http} from '../../http/Http';
import {AuthInterceptorOptions} from '../../auth/AuthHttpInterceptor';
import {Inject, Injectable} from 'react.di';
import {Role} from '../enums/Role';
import {IUserCredentials} from '../interfaces/IUserCredentials';
import {toBase64} from '../../utils/cryptoUtils';

@Injectable
export class UserHttpService {

    constructor(@Inject private http: Http) {
    }

    getUserToken(email: string, code: string) {
        return this.http.get<AuthInterceptorOptions>(
            `/users/me/token`,
            {
                headers: {
                    Authorization: `Basic ${toBase64(`${email}:${code}`)}`
                },
                interceptOptions: {skipAuth: true}
            }
        );
    }

    createUser(data: { credentials: IUserCredentials, role: Role }) {
        return this.http.post<AuthInterceptorOptions>(
            `/users`,
            {
                email: data.credentials.email,
                password: (data.credentials.password),
                role: Object
                    .keys(Role)
                    .find(key => Role[key] === data.role),
            },
            {
                interceptOptions: {skipAuth: true}
            }
        );
    }

    async getRole() {
        const role = await this.http.get('/users/me/role');
        return role.data as Role;
    }

}
