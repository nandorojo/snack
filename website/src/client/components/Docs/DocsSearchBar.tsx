import { StyleSheet, css } from 'aphrodite';
import * as React from 'react';

import { c } from '../ThemeProvider';
import { SDKVersion } from '../../types';

type Props = {
  sdkVersion: SDKVersion;
};

class DocsSearchBar extends React.Component<Props> {
  private searchRef = React.createRef<HTMLInputElement>();
  private docsearch: any;

  state = {
    isFocused: false,
  };

  componentDidMount() {
    const docsearch = require('docsearch.js');
    // const Hotshot = require('hotshot');

    // latest is indexed in algolia, but we try to match the exact version instead
    // latest is also filtered using the facetFilters, and should not be returned in the search results
    // const currentVersion = this.props.version === 'latest' ? LATEST_VERSION : this.props.version;

    this.docsearch = docsearch({
      apiKey: '2955d7b41a0accbe5b6aa2db32f3b8ac',
      indexName: 'expo',
      inputSelector: '#algolia-search-box',
      enhancedSearchInput: false,
      algoliaOptions: {
        // include pages without version (guides/get-started) OR exact version (api-reference)
        facetFilters: [['version:none', `version:${this.props.sdkVersion}`]],
      },
      // TODO: Get the type definitions for Algolia DocSearch
      handleSelected: (input: any, event: any, suggestion: any) => {
        /* input.setVal('');

        const url = new URL(suggestion.url);
        const route = this.processUrl(url.pathname + url.hash);

        let asPath;
        if (Utilities.isVersionedUrl(suggestion.url) && this.props.version === 'latest') {
          asPath = this.processUrl(Utilities.replaceVersionInUrl(route, 'latest'));
        }

        if (asPath) {
          Router.push(route, asPath);
        } else {
          Router.push(route);
        }

        const docSearchEl = document.getElementById('docsearch');
        if (docSearchEl) {
          docSearchEl.blur();
        }

        const searchbox = document.querySelector('input#docsearch') as HTMLInputElement;
        const reset = document.querySelector('.searchbox [type="reset"]');

        if (reset) {
          reset.className = 'searchbox__reset';
          if (searchbox && searchbox.value.length === 0) {
            reset.className += ' hide';
          }
        }*/
      },
    });
  }

  render() {
    return (
      <div className={css(styles.container)}>
        {/*<div className={css(styles.icon)}>
          <Search />
    </div>*/}
        <input
          className={css(styles.input)}
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
          id={'algolia-search-box'}
          type="text"
          placeholder="API documentation"
          autoComplete="off"
          spellCheck="false"
          dir="auto"
          ref={this.searchRef}
        />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'relative',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  input: {
    appearance: 'none',
    boxSizing: 'border-box',
    width: '20vw',
    // maxWidth: ${Constants.breakpoints.mobileValue - 32}px;
    padding: '0 16px 0 40px',
    borderRadius: 4,
    height: 40,
    outline: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: c('border'),
    ':focus': {
      borderColor: c('selected'),
    },
  },
});

export default DocsSearchBar;
