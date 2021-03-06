import { RequestService } from 'services/request.services';

export class DonationRestServices {
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

    transactionMidtransSnap(payload: {
        programId: string,
        referrer: string,
        amount: number,
        customerInfo: {
            fullName: string,
            notes: string,
            phone: string,
            email: string,
            showAsAnonymous: boolean
        }
    }, params: any) {
        return this.request.post(`transaction/create/program/midtrans-snap`, payload, { params });
    }

    transactionOvo(id: string) {
        return this.request.post(`transaction/${id}/ovo`);
    }

    transactionManual(payload: {
        programId: string,
        referrer: string,
        amount: number,
        customerInfo: {
            fullName: string,
            notes: string,
            phone: string,
            email: string,
            showAsAnonymous: boolean
        }
    }, params: any) {
        return this.request.post(`transaction/create/program/manual`, payload, { params });
    }

    loadProgram(params: any) {
        return this.request.get(`program`, {
            params
        });
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

    loadInfaq() {
        return this.request.get(`infaq`);
    }

    loadInfaqDetail() {
        return this.request.get(`infaq/detail`);
    }

    onBookMarked(id: string) {
        return this.request.post(`program/${id}/bookmark`);
    }

    loadCategory() {
        return this.request.get(`program-category`);
    }

    void(id: string) {
        return this.request.delete(`transaction/${id}/void`);
    }

}
