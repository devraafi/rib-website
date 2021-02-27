import { notification } from 'antd';
import { MessageParserService } from './msg.service';
export class NotifService {
  msgService: MessageParserService = new MessageParserService;
  /**
   *
   * @param params
   * type: 'success' | 'info' | 'warning' | 'error';
   * description: any;
   * useService?: boolean;;
   */
  show(params: INotification) {
    notification[params.type]({
      message: `${params.title}`,
      className: `notif-dh notif-dh-${params.type}`,
      description: !params.useService ? `${params.description}` : this.msgService.parse(params.description),
    });
  }
}
