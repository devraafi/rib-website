import React from 'react'
import Head from 'next/head'

const HeaderComponent = () => (
    <Head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
        <script type="text/javascript"
            src="https://app.sandbox.midtrans.com/snap/snap.js"
            data-client-key="Mid-client-BHJdJcj_-5xRENuz"></script>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        {/* <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQ9k4stULF3bp_dQMVNp93QyNqwBgwHN4">
        </script> */}
    </Head>
)
export default HeaderComponent;
