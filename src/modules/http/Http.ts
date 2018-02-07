import axios, {AxiosInstance, AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig} from 'axios';
import {HttpInterceptor, HTTP_INTERCEPTOR_TOKEN} from './HttpInterceptor';
import {Inject, Injectable} from 'react.di';

declare module 'axios' {
    export interface IAxiosResponse<TData> {
        data: TData;
        status: number;
        statusText: string;
        headers: any;
        config: AxiosRequestConfig;
    }
    export interface IAxiosPromise<TData> extends Promise<IAxiosResponse<TData>> {
    }
}

export interface RequestOptions<IT> extends AxiosRequestConfig {
    interceptOptions: IT;
}

export interface AxiosResponse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
}

@Injectable
export class Http implements AxiosInstance {

    defaults: AxiosRequestConfig;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };

    request: (<IT = {}>(config: RequestOptions<IT>) => AxiosPromise);
    post: (<IT = {}>(url: string, data?: any, config?: RequestOptions<IT>) => AxiosPromise);
    put: (<IT = {}>(url: string, data?: any, config?: RequestOptions<IT>) => AxiosPromise);
    patch: (<IT = {}>(url: string, data?: any, config?: RequestOptions<IT>) => AxiosPromise);
    get: (<IT = {}>(url: string, config?: RequestOptions<IT>) => AxiosPromise);
    head: <IT = {}>(url: string, config?: RequestOptions<IT>) => AxiosPromise;
    delete: <IT = {}>(url: string, config?: RequestOptions<IT>) => AxiosPromise;

    constructor(@Inject(HTTP_INTERCEPTOR_TOKEN) interceptors: HttpInterceptor[]) {
        const http = axios.create({responseType: 'json', baseURL: process.env.API_URL});

        initInterceptors(interceptors, http);

        return http;
    }
}

function initInterceptors(interceptors: HttpInterceptor[], http: AxiosInstance) {
    interceptors.forEach((interceptor) => {
        Object.keys(http.interceptors).forEach(key => {
            if (interceptor[key]) {
                http.interceptors[key].use(value => {
                    if (!value.interceptOptions) {
                        value.interceptOptions = {};
                    }
                    return interceptor[key](value);
                });
            }
        });
    });
}
