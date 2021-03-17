import { RequestService } from 'services/request.services';

export class ProfileRestService {
    requestService = new RequestService;
    request: RequestService;
    urlDh: string = `${process.env.staging || ''}public/`;
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

    updateProfile(payload: any) {
        return this.request.put(`profile`, payload);
    }

    loadProfileTransaction() {
        return this.request.get(`profile/transaction`);
    }
}
