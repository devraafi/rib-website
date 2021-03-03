import { RequestService } from 'services/request.services';

export class DonationRestServices {
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

    transactionMidtransSnap(payload: {
        programId: string,
        amount: number,
        customerInfo: {
            fullName: string,
            notes: string,
            phone: string,
            email: string,
            showAsAnonymous: boolean
        }
    }) {
        return this.request.post(`transaction/create/program/midtrans-snap`, payload);
    }

    loadProgram() {
        return this.request.get(`program`);
    }
    loadProgramById(id: any) {
        return this.request.get(`program/${id}`);
    }
    loadProgramDetail(id: any) {
        return this.request.get<IDonor[]>(`program/${id}/detail`);
    }
    loadProgramByCategory() {
        return this.request.get(`program/program-by-categories`);
    }

}
