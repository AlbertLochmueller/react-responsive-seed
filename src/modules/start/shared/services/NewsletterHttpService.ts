import {Http} from '../../../http/Http';
import {AuthInterceptorOptions} from '../../../auth/AuthHttpInterceptor';
import {Inject, Injectable} from 'react.di';

@Injectable
export class NewsletterHttpService {

    constructor(@Inject private http: Http) {
    }

    subscribe(email: string) {
        return this.http.post<AuthInterceptorOptions>(
            `/newsletter`,
            {
                email: email,
            },
            {
                interceptOptions: {skipAuth: true}
            }
        );
    }

}
