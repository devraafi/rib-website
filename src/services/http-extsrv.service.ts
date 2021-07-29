import { Notifications } from '@Components/basics/notifications/notifications.component';
import { AxiosInstance, AxiosResponse, AxiosStatic } from 'axios';
import { has, set } from 'lodash';


export class HttpExtsrvService {
    notif = new Notifications;
    // messageParseService = new MessageParserService;
    axiosInterceptors(axios: AxiosInstance | AxiosStatic) {
        axios.interceptors.response.use(response => {
            this.handleResponse(response);

            return response;
        }, error => {
            const response = error.response;
            this.handleResponse(response);

            throw error;
        });
    }

    private handleResponse(response: AxiosResponse) {
        if (has(response, 'data.errors') && has(response, 'data.data')) {
            set(response.data, 'summary', {});

            this.handleErrors(response);
        }
    }

    private handleErrors(response: AxiosResponse) {
        // const errorMessages = this.messageParseService.parse(response);

        this.notif.show({
            type: 'error',
            title: '',
            description: ''
            // description: errorMessages
        });
    }
}
