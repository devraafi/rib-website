import { AxiosInstance, AxiosStatic } from 'axios';
import _ from 'lodash';
import { throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { TokenRestServices } from 'services/rest/token-rest.service';

const tokenRestServices: TokenRestServices = new TokenRestServices;
let userInfo: IUserInfo;
const local: any = (typeof window !== 'undefined') ? localStorage : null;
export class AuthenticationService {
    constructor() {
        const currentUser = local ? local.getItem('userInfo') : '';

        // checking if user manually insert the localstorage
        
        let theUser;
        try {
            theUser = JSON.parse(currentUser);
        } catch (e) {
            console.log(e);
        }

        if (theUser && _.has(theUser, 'accessToken')) {
            userInfo = theUser;
        } else {
            userInfo = null as any;
        }
    }

    axiosInterceptors(axios: AxiosInstance | AxiosStatic, interceptRequest: boolean = true, interceptResponse: boolean = true) {
        axios.interceptors.request.use(request => {
            request.headers.common['Timezone-Offset'] = _.get(userInfo, 'timezone_offset') || (new Date).getTimezoneOffset();
            request.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
            request.headers.common['Accept'] = 'application/json, text/plain, */*';
            request.headers.common['Accept-Language'] = 'id-ID';

            return request;
        });

        if (interceptRequest) {
            axios.interceptors.request.use(request => {
                if (userInfo) {
                    console.log(userInfo);
                    
                    request.headers.common['Authorization'] = `Bearer ${userInfo.accessToken}`;
                }
                return request;
            });
        }

        if (interceptResponse) {
            axios.interceptors.response.use(response => {
                return response;
            }, async (error: any) => {
                const response = error.response;
                if (
                    response &&
                    response.status === 401 &&
                    response.config &&
                    response.config.headers &&
                    response.config.headers['Authorization']
                ) {
                    console.log('login boi');

                    return this.refreshToken().pipe(
                        switchMap(function (res) {
                            userInfo = res
                            response.config.headers['Authorization'] = `Bearer ${res.accessToken}`;
                            return axios.request(response.config);
                        }),
                        catchError((err) => {
                            userInfo = null as any;
                            local && local.removeItem('userInfo');
                            window.location.href = '/login';
                            return throwError(err);
                        }),
                    ).toPromise()
                }
                throw error;
            });
        }
    }

    login(payload: { username: string, password: string }) {
        return tokenRestServices.login(payload).pipe(
            tap((loginData) => {
                console.log(loginData);
                userInfo = loginData as any;
                local && local.setItem('userInfo', JSON.stringify(loginData));
            })
        );
    }

    logout() {
        userInfo = null as any;
        local && local.removeItem('userInfo');
        window.location.href = '/login'
    }

    refreshToken() {
        return tokenRestServices.refreshToken(userInfo.refreshToken).pipe(
            tap((response) => {
                userInfo = response;
                local && local.setItem('userInfo', JSON.stringify(response));
                window.location.reload();
            })
        )
    }
}