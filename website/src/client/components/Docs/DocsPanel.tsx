import { StyleSheet, css } from 'aphrodite';
import * as React from 'react';

import constants from '../../configs/constants';
import DocsHeader from './DocsHeader';
import DocsFrame from './DocsFrame';
import ResizablePane from '../shared/ResizablePane';
import { c } from '../ThemeProvider';

type Props = {};

type State = {
  visible: boolean;
  url: string;
  title: string;
  isRendered: boolean;
  isPopupOpen: boolean;
};

const VISIBILITY_MEDIA_QUERY = `(min-width: ${constants.preview.minWidth}px)`;

class DocsPanel extends React.PureComponent<Props, State> {
  state: State = {
    visible: true,
    url: 'https://docs.expo.io/versions/v40.0.0/sdk/background-fetch/',
    title: 'Documentation',
    isRendered: false,
    isPopupOpen: false,
  };

  componentDidMount() {
    this.mql = window.matchMedia(VISIBILITY_MEDIA_QUERY);
    this.mql.addListener(this.handleMediaQuery);
    this.handleMediaQuery(this.mql);
  }

  componentWillUnmount() {
    clearInterval(this.popupInterval);
    this.mql?.removeListener(this.handleMediaQuery);
    this.popup?.close();
  }

  private handleMediaQuery = (mql: any) => this.setState({ isRendered: mql.matches });

  private handlePopup = () => {
    this.popup = window.open(this.state.url, 'snack-docs', 'width=327,height=668');
    if (this.popup?.closed) {
      return;
    }

    this.setState({ isPopupOpen: true });

    clearInterval(this.popupInterval);

    this.popupInterval = setInterval(() => {
      if (!this.popup || this.popup.closed) {
        clearInterval(this.popupInterval);
        this.popup = null;
        this.setState(() => ({ isPopupOpen: false }));
      }
    }, 500);
  };

  private popupInterval: any;
  private popup: Window | null = null;
  private mql: MediaQueryList | null = null;

  render() {
    const { isPopupOpen, isRendered, title, url } = this.state;

    if (!isRendered || isPopupOpen) {
      return null;
    }

    return (
      <ResizablePane direction="horizontal" className={css(styles.container)}>
        <div className={css(styles.panel)}>
          <DocsHeader title={title} onPopup={this.handlePopup} />
          <DocsFrame url={url} />
        </div>
      </ResizablePane>
    );
  }
}

export default DocsPanel;

const styles = StyleSheet.create({
  container: {
    width: '24em',
    height: '100%',
  },
  panel: {
    backgroundColor: c('content'),
    borderColor: c('border'),
    borderWidth: '0 0 0 1px',
    borderStyle: 'solid',
    width: '100%',
    minWidth: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
