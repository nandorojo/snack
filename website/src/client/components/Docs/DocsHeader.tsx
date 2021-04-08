import { StyleSheet, css } from 'aphrodite';
import * as React from 'react';

// import IconButton from '../shared/IconButton';
import withThemeName, { ThemeName } from '../Preferences/withThemeName';
import { c } from '../ThemeProvider';

type Props = {
  title: string;
  onPopup: () => any;
  onBack?: () => any;
  theme: ThemeName;
};

function DocsHeader(props: Props) {
  const { title, onPopup, theme } = props;
  return (
    <div className={css(styles.container)}>
      {/* <IconButton responsive title="Back" onClick={onBack}>
        <svg width="20" height="20">
          <path d="M14.167 10H5.833L10 16.667 14.167 10z" />
          <path d="M2.5 18.333h15M10 10V1.667" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </IconButton> */}
      <h1 className={css(styles.title)}>{title}</h1>
      <button
        className={css(
          styles.popupButton,
          theme === 'dark' ? styles.popupButtonDark : styles.popupButtonLight
        )}
        onClick={onPopup}
      />
    </div>
  );
}

export default withThemeName(DocsHeader);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderColor: c('border'),
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
  },
  title: {
    flex: 1,
    fontSize: '1.3em',
    lineHeight: '1.3em',
    fontWeight: 600,
    margin: '0 12px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  popupButton: {
    appearance: 'none',
    height: 48,
    width: 48,
    padding: 16,
    margin: 0,
    border: 0,
    outline: 0,
    opacity: 0.8,
    backgroundSize: 16,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'transparent',
    transition: '.2s',

    ':hover': {
      opacity: 1,
    },
  },
  popupButtonDark: {
    backgroundImage: `url(${require('../../assets/open-link-icon-light.png')})`,
  },
  popupButtonLight: {
    backgroundImage: `url(${require('../../assets/open-link-icon.png')})`,
  },
});
