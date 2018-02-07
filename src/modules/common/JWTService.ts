import {Injectable} from 'react.di';

const PROVIDER = 'ROLE_PROVIDER';
const ADVERTISER = 'ROLE_ADVERTISER';
const AGENCY = 'ROLE_AGENCY';


@Injectable
export class JWTService {

    decode(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }

    isExpired(token: string) {
        const payload = this.decode(token);
        return new Date() > new Date(payload.exp * 1000);
    }

    getRole(token: string) {
        const payload = this.decode(token);
        console.log('token (only for development): ', payload);
        return payload.scopes;
    }

    isAdvertiser(scopes: string[]){
        const advertiser = scopes.find((scope) => scope == ADVERTISER);
        return !!advertiser;
    }

    isProvider(scopes: string[]){
        const provider = scopes.find((scope) => scope == PROVIDER);
        return !!provider;
    }

    isAgency(scopes: string[]){
        const agency = scopes.find((scope) => scope == AGENCY);
        return !!agency;
    }

}
