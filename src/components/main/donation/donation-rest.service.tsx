import { RequestService } from 'services/request.services';

export class DonationRestServices {
    requestService = new RequestService;
    request: RequestService;
    urlDh: string = 'https://staging-lazis-dh.herokuapp.com/public/transaction/';
    constructor(
        baseUrl?: string,
        useInterceptor: any = true,
        withoutInterceptor: boolean = false
    ) {
        this.request = this.requestService.new(this.urlDh, useInterceptor, withoutInterceptor);
    }

    transactionMidtransSnap(payload: {
        programId: string,
        amount: number,
        customerInfo: {
            fullName: string,
            notes: string,
            phoneOrEmail: string,
            showAsAnonymous: boolean
        }
    }) {
        return this.request.post(`/create/program/midtrans-snap`, payload);
    }
}
