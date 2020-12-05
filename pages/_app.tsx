import React from 'react';
import '@Styles/main.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

export default function MyApp({ Component, pageProps }: any) {
    return <React.Fragment>
        <Component {...pageProps} />
    </React.Fragment>
}