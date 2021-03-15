import { RequestService } from 'services/request.services';

export class TokenRestServices {
    requestService = new RequestService;
    request: RequestService;
    urlDh: string = `${process.env.staging || ''}`;
    constructor(
        baseUrl?: string,
        useInterceptor: any = true,
        withoutInterceptor: boolean = false
    ) {
        this.request = this.requestService.new(this.urlDh, useInterceptor, withoutInterceptor);
    }

    getUserByToken(payload: any) {
        return this.request.post<IUserInfo>(`/user/token`, payload);
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
}
