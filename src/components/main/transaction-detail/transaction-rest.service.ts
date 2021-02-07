import { RequestService } from 'services/request.services';

export class TransactionRestService {
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

    loadData(id: string) {
        return this.request.get<ITransactionDetail>(`transaction/${id}`);
    }
}
