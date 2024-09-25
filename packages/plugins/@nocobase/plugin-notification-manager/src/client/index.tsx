/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
import { ChannelManager } from './manager/channel/components';
import { LogManager } from './manager/log/components/Manager';
import { lang as t } from './locale';
import NotificationManager from './notification-manager';
import { ChannelType, ChannelTypes } from './manager/channel/types';

const NAMESPACE = 'notification-manager';
export class PluginNotificationManagerClient extends Plugin {
  private manager: NotificationManager;
  channelTypes: ChannelTypes;

  registerChannelType(params: ChannelType) {
    this.manager.registerChannelType(params);
  }

  async afterAdd() {}

  async beforeLoad() {
    this.manager = new NotificationManager();
    this.channelTypes = this.manager.channelTypes;
  }

  // You can get and modify the app instance here
  async load() {
    this.app.pluginSettingsManager.add(NAMESPACE, {
      title: t('Notification'),
      icon: 'NotificationOutlined',
      aclSnippet: 'pm.notification',
    });
    this.app.pluginSettingsManager.add(`${NAMESPACE}.channels`, {
      title: t('Channels'),
      Component: ChannelManager,
      aclSnippet: 'pm.notification.channels',
      sort: 1,
    });
    this.app.pluginSettingsManager.add(`${NAMESPACE}.logs`, {
      title: t('Logs'),
      Component: LogManager,
      aclSnippet: 'pm.notification.logs',
      sort: 3,
    });
  }
}

export default PluginNotificationManagerClient;
export { MessageConfigForm } from './manager/message/components/MessageConfigForm';
export { NotificationVariableContext, useNotificationVariableOptions, NotificationVariableProvider } from './hooks';
