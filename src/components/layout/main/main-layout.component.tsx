import React, { } from 'react';
import HeaderComponent from '@Components/layout/header/header-layout.component';
import NavbarComponent from '@Components/layout/navbar/navbar-layout.component';
import FooterComponent from '@Components/layout/footer/footer-layout.component';
import { NextSeo } from 'next-seo';
import { MainProps } from './main';
import Head from 'next/head';

const MainComponent = (props: MainProps) => (
    <>
        <Head>
            <React.Fragment>
                <script type="text/javascript"
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key="Mid-client-BHJdJcj_-5xRENuz"></script>
                <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
            </React.Fragment>
        </Head>
        <div className="container-fluid p-0">
            {
                !props.hideNav &&
                <NavbarComponent customNav={props.customNav || null} />
            }
            <div className="main-container" id={props.pageId}>
                <div className="content-wrapper container-fluid p-0" >
                    {props.children}
                </div>
                {
                    !props.hideFooter &&
                    < FooterComponent />
                }
            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
    </>
)

export default MainComponent;