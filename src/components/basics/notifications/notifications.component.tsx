import { notification } from 'antd';
import { INotification } from './notifications';
export class Notifications {
    show(params: INotification) {
        notification[params.type]({
            message: `${params.title}`,
            className: `notif-deo notif-deo-${params.type}`,
            description: `${params.description}`,
        });
    }
}
