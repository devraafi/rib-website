import React from 'react';
import '@Styles/main.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Router } from 'next/router';

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

    return (
        <>
            <FacebookPixel />
            <Component {...pageProps} />
        </>
    )
}
