import {Inject, Injectable} from 'react.di';
import {JWTService} from '../common/JWTService';

@Injectable
export class AuthService {

    private token: string;

    constructor(@Inject private jwtService: JWTService) {
    }

    setToken(token: string) {
        this.token = token;
    }

    getValidToken(): string | undefined {
        if (this.hasValidToken()) return this.token;
    }

    hasValidToken(): boolean {
        return !!this.token && !this.jwtService.isExpired(this.token);
    }

    isValidAdvertiser() {
        return this.hasValidToken() && this.jwtService.isAdvertiser(this.jwtService.getRole(this.token));
    }

    isValidProvider() {
        return this.hasValidToken() && this.jwtService.isProvider(this.jwtService.getRole(this.token));
    }
}
