import { RequestService } from 'services/request.services';

export class ProfileRestService {
    requestService = new RequestService;
    request: RequestService;
    urlDh: string = 'http://rib-production.ruanginsanberbagi.org/public/';
    constructor(
        baseUrl?: string,
        useInterceptor: any = true,
        withoutInterceptor: boolean = false
    ) {
        this.request = this.requestService.new(this.urlDh, useInterceptor, withoutInterceptor);
    }

    loadProfile() {
        return this.request.get(`profile`);
    }

    loadProfileTransaction() {
        return this.request.get(`profile/transaction`);
    }
}
