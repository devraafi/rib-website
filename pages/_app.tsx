import React from 'react';
import '@Styles/main.scss';

export default function MyApp({ Component, pageProps }: any) {
    return <React.Fragment>
        <Component {...pageProps} />
    </React.Fragment>
}