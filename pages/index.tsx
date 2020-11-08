import moment from 'moment';
import Head from 'next/head';
import React from 'react';
import MainLayout from '../src/component/layouts/Main';


export default class Index extends React.Component {

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
                    <MainLayout>
                    </MainLayout>
                </div>
            </>
        )
    }
}