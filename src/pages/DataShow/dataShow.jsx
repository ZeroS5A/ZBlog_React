import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Typography } from 'antd';
import styles from './dataShow.less';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => (
  <PageHeaderWrapper>
    <Card
      style={{
        padding: 0,
      }}
    >
      <p style={{ textAlign: 'center' }}>暂无数据展示</p>
    </Card>
  </PageHeaderWrapper>
);
