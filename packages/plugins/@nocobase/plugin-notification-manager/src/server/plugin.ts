/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/server';
import type { Logger } from '@nocobase/logger';
import { SendOptions, RegisterServerTypeFnParams } from './types';
import NotificationManager from './manager';
export class PluginNotificationManagerServer extends Plugin {
  private manager: NotificationManager;
  logger: Logger;

  registerChannelType(params: RegisterServerTypeFnParams) {
    this.manager.registerType(params);
  }
  async send(options: SendOptions) {
    return await this.manager.send(options);
  }

  async afterAdd() {
    this.logger = this.createLogger({
      dirname: 'notification-manager',
      filename: '%DATE%.log',
      transports: ['dailyRotateFile'],
    });
    this.manager = new NotificationManager({ plugin: this });
  }

  async beforeLoad() {
    this.app.resourceManager.registerActionHandler('messages:send', async (ctx, next) => {
      const sendOptions = ctx.action?.params?.values as SendOptions;
      this.manager.send(sendOptions);
      next();
    });
    this.app.acl.registerSnippet({
      name: 'pm.notification',
      actions: ['messages:*'],
    });
  }

  async load() {}

  async install() {}

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginNotificationManagerServer;
