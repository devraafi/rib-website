import MainComponent from "@Components/layout/main/main-layout.component";
import Head from "next/dist/next-server/lib/head";
import React from "react";

export default class HomePage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
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
                    
                </MainComponent>
            </>
        )
    }
}