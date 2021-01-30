import { RequestService } from 'services/request.services';

export class HomeRestService {
    requestService = new RequestService;
    request: RequestService;
    urlDh: string = 'https://staging-lazis-dh.herokuapp.com/public/';
    constructor(
        baseUrl?: string,
        useInterceptor: any = true,
        withoutInterceptor: boolean = false
    ) {
        this.request = this.requestService.new(this.urlDh, useInterceptor, withoutInterceptor);
    }

    loadProgram() {
        return this.request.get(`home`);
    }
}
