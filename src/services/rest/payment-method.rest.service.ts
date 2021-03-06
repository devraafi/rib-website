import { RequestService } from 'services/request.services';

export class PaymentMethodRest {
    requestService = new RequestService;
    request: RequestService;
    urlDh: string = 'https://staging-rib.herokuapp.com/public/';
    constructor(
        baseUrl?: string,
        useInterceptor: any = true,
        withoutInterceptor: boolean = false
    ) {
        this.request = this.requestService.new(this.urlDh, useInterceptor, withoutInterceptor);
    }

    loadPayment() {
        return this.request.get(`payment-method`);
    }
}
