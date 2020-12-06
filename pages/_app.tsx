import React from 'react';
import '@Styles/main.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function MyApp({ Component, pageProps }: any) {
    return <React.Fragment>
        <Component {...pageProps} />
    </React.Fragment>
}