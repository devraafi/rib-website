import Head from 'next/head';
import React from 'react';
import MainComponent from '@Components/layout/main/main-layout.component';


export default class ShadaqahServiceComponent extends React.Component {

    render() {
        return (
            <>
                <div>
                    <Head>
                        <title>-</title>
                        <meta name="description" content="--" />
                        <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1.0, user-scalable=0" />
                        <meta name="keywords" content="---" />
                        <meta charSet="utf-8" />
                        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                        <link rel="canonical" href="https://uhuy.com/" />
                    </Head>
                    <MainComponent>
                        Layanan Shadaqah
                    </MainComponent>
                </div>
            </>
        )
    }
}