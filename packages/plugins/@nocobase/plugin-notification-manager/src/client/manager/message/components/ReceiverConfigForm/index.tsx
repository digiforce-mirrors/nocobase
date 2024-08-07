/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useState } from 'react';
import { FormItem } from '@nocobase/client';
import { Radio } from 'antd';
import { ManualConfigForm } from './Manual';
import { CollectionForm } from './Collection';
const ReceiverConfigForm = () => {
  const [inputType, setInputType] = useState('manual');
  const options = [
    {
      label: 'manual Input',
      value: 'manual',
    },
    {
      label: 'collection',
      value: 'collection',
    },
    {
      label: 'import',
      value: 'import',
      disabled: true,
    },
  ];
  const onChange = (e) => {
    setInputType(e.target.value);
  };

  const configFormMap = {
    manual: <ManualConfigForm />,
    collection: <CollectionForm />,
  };

  return (
    <div>
      <FormItem label="input type">
        <Radio.Group
          options={options}
          value={inputType}
          onChange={onChange}
          optionType="button"
          buttonStyle="solid"
        ></Radio.Group>
      </FormItem>

      {configFormMap[inputType]}
    </div>
  );
};

export default ReceiverConfigForm;
