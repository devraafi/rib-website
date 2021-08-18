import React from 'react'
import Head from 'next/head'

function HeaderComponent({ meta }: any) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>{meta?.title || 'Ruang Insan Berbagi'}</title>
                <meta name='description' content={meta?.desc} />
                <meta property='og:locale' content='en_US' />
                <meta property='og:type' content='website' />
                <meta property='og:title' content={meta?.ogTitle || 'Ruang Insan Berbagi'} />
                <meta property='og:description' content={meta?.ogDesc || 'Ruang Insan Berbagi sebagai wadah kebaikan bagi masyarakat Indonesia dengan pengelolaan dana sosial secara Amanah, Tepat Sasaran dan Profesional. Implementasi program donasi di rangkum dalam 4 Rumpun Program Insani yaitu Insan Sehat (Kesehatan), Insan Mandiri (Perbaikan Ekonomi), Insan Peduli Lingkungan, Insan Cerdas (Pendidikan).'} />
                <meta property='og:image' content={meta?.img || '/images/logos/dh-logo-footer.svg'} />
                <meta property='og:url' content={meta?.url || 'https://ruanginsanberbagi.org/'} />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="400" />
                <meta property="og:image:height" content="400" />
                <script type="text/javascript"
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key="Mid-client-BHJdJcj_-5xRENuz"></script>
                <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
            </Head>
        </>
    );
}
export default HeaderComponent;
