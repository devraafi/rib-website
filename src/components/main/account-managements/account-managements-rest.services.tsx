import { RequestService } from 'services/request.services';

export class AccountMangeRestServices {
    requestService = new RequestService;
    request: RequestService;

    constructor(
        baseUrl: string,
        useInterceptor: any = true,
        withoutInterceptor: boolean = false
    ) {
        this.request = this.requestService.new(baseUrl, useInterceptor, withoutInterceptor);
    }

    register(payload: {
        fullName: string,
        phoneNumber: number,
        email: string,
        password: string
    }) {
        return this.request.post(`/user/register`, payload);
    }

    login(payload: {
        username: string,
        password: string,
    }) {
        const client = {
            client_id: 'lazis-dh',
            client_secret: 'L4Z1SDH',
            grant_type: 'password'
        }
        const newPayload = { ...payload, ...client };
        return this.request.post(`/oauth2/connect/token`, newPayload);
    }

    refreshToken(refresh_token: string) {
        const payload = {
            client_id: 'lazis-dh',
            client_secret: 'L4Z1SDH',
            grant_type: 'refresh_token',
            refresh_token: refresh_token

        }
        return this.request.post<IUserInfo>(`/oauth2/connect/token`, payload);
    }
}