export interface INotification {
    type: 'success' | 'info' | 'warning' | 'error';
    title: string;
    description: string;
  }