declare interface INotification {
    type: 'success' | 'info' | 'warning' | 'error';
    title?: string;
    description: any;
    useService?: boolean;
}