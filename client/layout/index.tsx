import { ViewProps } from 'beidou';
import * as React from 'react';

interface PropTypes extends ViewProps {
  title: string;
  helper: any;
  store: any;
  entry: any;
}

export default class Layout extends React.Component<PropTypes> {
  public render() {
    const { title, helper, entry, store, children } = this.props;
    const htmlString = children as string;

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="stylesheet" href={helper.asset('manifest.css')} />
          <link rel="stylesheet" href={helper.asset(`${entry}.css`)} />
        </head>
        <body>
          <div id="_" dangerouslySetInnerHTML={{ __html: htmlString }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__STORE__=${store}` }} />
          <script src={helper.asset('react.js')} />
          <script src={helper.asset('react-dom.js')} />
          <script src={helper.asset('moment.js')} />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset(`${entry}.js`)} />
        </body>
      </html>
    );
  }
}
