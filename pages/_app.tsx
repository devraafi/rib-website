import '@Styles/main.scss';
import { Router } from 'next/router';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import React from 'react';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function MyApp({ Component, pageProps }: any) {
    // if (typeof window === 'undefined' || typeof document === 'undefined') {
    //     return <div>
    //         loading
    //     </div>;
    // }

    function FacebookPixel() {
        React.useEffect(() => {
            import("react-facebook-pixel")
                .then((x) => x.default)
                .then((ReactPixel) => {
                    ReactPixel.init('809047500028527');
                    ReactPixel.pageView();
                    Router.events.on("routeChangeComplete", () => {
                        ReactPixel.pageView();
                    });
                });
        });
        return null;
    }

    function GoogleAnalytics(pageProps: any) {
        React.useEffect(() => {
            ReactGA.initialize('UA-854H4S29QL-2');

            ReactGA.pageview(window.location.pathname + window.location.search);
            ReactGA.pageview(pageProps.page);
        })

        return null;
    }

    function GogleTagManager() {   
        React.useEffect(() => {
            const tagManagerArgs = {
                gtmId: 'G-854H4S29QL'
            }
            
            TagManager.initialize(tagManagerArgs)  
        })

        return null;
    }

    return (
        <>
            <FacebookPixel />
            <GoogleAnalytics page={pageProps} />
            <GogleTagManager/>
            <Component {...pageProps} />
        </>
    )
}
