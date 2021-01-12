import _ from 'lodash';
import { from as observableFrom, Observable } from 'rxjs';
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosStatic, CancelTokenStatic } from 'axios';

import { HttpExtsrvService } from './http-extsrv.service';

export class RequestService {
    axios!: AxiosInstance;
    cancelToken: CancelTokenStatic = Axios.CancelToken;
    _httpExtsrv: HttpExtsrvService = new HttpExtsrvService;

    constructor() {

    }

    new(baseURL: string, useInterceptor: any = true, withoutInterceptor: boolean = false): RequestService {
        const axios: AxiosInstance = Axios.create({ baseURL });
        // (<any>axiosRetry)(axios, { retries: 3 });

        if (_.isBoolean(useInterceptor)) {
            // this._auth.axiosInterceptors(axios);
        } else if (useInterceptor) {
            useInterceptor(axios);
        }

        if (!withoutInterceptor) {
            this._httpExtsrv.axiosInterceptors(axios);
        }


        const requestService = new RequestService();
        requestService.axios = axios;

        return requestService;
    }

    post<T>(url: string, data: any = null, config: AxiosRequestConfig = {}) {
        return new Observable<T>(subscriber => {
            const cancelSource = this.cancelToken.source();
            config.cancelToken = cancelSource.token;

            const promise = this.axios.post(url, data, config).then(response => response.data);
            observableFrom(promise).subscribe(subscriber);

            return () => cancelSource.cancel();
        });
    }

    put<T>(url: string, data: any = null, config: AxiosRequestConfig = {}) {
        return new Observable<T>(subscriber => {
            const cancelSource = this.cancelToken.source();
            config.cancelToken = cancelSource.token;

            const promise = this.axios.put(url, data, config).then(response => response.data);
            observableFrom(promise).subscribe(subscriber);

            return () => cancelSource.cancel();
        });
    }

    get<T>(url: string, config: AxiosRequestConfig = {}, allowModify: boolean = false) {
        return new Observable<T>(subscriber => {
            const cancelSource = this.cancelToken.source();
            config.cancelToken = cancelSource.token;

            const promise = this.axios.get(url, config).then(response => (allowModify) ? response : response.data);
            observableFrom(promise).subscribe(subscriber);

            return () => cancelSource.cancel();
        });
    }

    delete<T>(url: string, data: any = null, config: AxiosRequestConfig = {}) {
        return new Observable<T>(subscriber => {
            const cancelSource = this.cancelToken.source();
            config.cancelToken = cancelSource.token;

            const promise = this.axios.request({
                url,
                method: 'delete',
                data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.data);
            observableFrom(promise).subscribe(subscriber);

            return () => cancelSource.cancel();
        });
    }
}
