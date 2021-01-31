import { RequestService } from 'services/request.services';

export class ZakatRestServices {
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

    loadZakatList() {
        return this.request.get(`zakat/list`);
    }

    createTransaction(payload: any) {
        return this.request.get(`transaction/create/zakat/midtrans-snap`, payload);
    }
}
