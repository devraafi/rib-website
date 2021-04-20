import '@Styles/main.scss';
import GA4React from 'ga-4-react';
import { Router } from 'next/router';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import React from 'react';
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

    function GoogleAnalytics() {
        React.useEffect(() => {
            const ga4react = new GA4React('G-GV0PS3F6QD');
            ga4react.initialize().then((ga4) => {
            ga4.pageview('path')
            ga4.gtag('event', 'pageview', 'path')
            },(err) => {
            console.error(err)
            })

        })

        return null;
    }

    return (
        <>
            <FacebookPixel />
            <GoogleAnalytics />
            <Component {...pageProps} />
        </>
    )
}
