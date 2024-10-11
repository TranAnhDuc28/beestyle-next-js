import { notification } from 'antd';
import {ArgsProps, GlobalConfigProps, NotificationPlacement} from 'antd/es/notification/interface';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

// Cấu hình mặc định
const defaultConfig: GlobalConfigProps = {
  placement: 'bottomRight',
  duration: 4.5,
  showProgress: true,
  maxCount: 5
};

// Áp dụng cấu hình mặc định
notification.config(defaultConfig);

type NotificationFunction = (
  message?: string,
  description?: string,
  placement?: NotificationPlacement,
  options?: Omit<ArgsProps, 'message' | 'description' | 'placement' | 'type'>
) => void;

const createNotificationFunction = (type: NotificationType): NotificationFunction => {
  return (message, description, placement, options) => {
    notification[type]({
      message,
      description,
      placement,
      ...defaultConfig, // Áp dụng cấu hình mặc định
      ...options, // Cho phép ghi đè cấu hình mặc định
    });
  };
};

export const showNotification = {
  success: createNotificationFunction('success'),
  info: createNotificationFunction('info'),
  warning: createNotificationFunction('warning'),
  error: createNotificationFunction('error'),
};

export const configureNotification = (config: Partial<GlobalConfigProps>) => {
  const newConfig: GlobalConfigProps = { ...defaultConfig, ...config };
  notification.config(newConfig);
  Object.assign(defaultConfig, newConfig); // Cập nhật defaultConfig
};