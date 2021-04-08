import { StyleSheet, css } from 'aphrodite';
import * as React from 'react';

import { c } from '../ThemeProvider';

type Props = {
  url: string;
};

export default function DocsFrame(props: Props) {
  const { url } = props;
  return (
    <div className={css(styles.container)}>
      <iframe src={url} className={css(styles.frame)} />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  frame: {
    display: 'flex',
    flex: 1,
    border: 0,
    backgroundColor: c('content'),
  },
});
