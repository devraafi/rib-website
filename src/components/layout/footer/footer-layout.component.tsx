import Link from 'next/link';
import React from 'react';

export default class FooterComponent extends React.Component {

    render() {
        return (
            <div>
                <footer className="container-fluid pt-5 pb-2" id="footer-dh">
                    <div className="row">
                        <div className="col-12">
                            {/* <div className="row justify-content-center">
                                <div className="col-auto">
                                    <div className="text-download">
                                        Download Aplikasi Ruang Insan Berbagi di
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center py-2">
                                <div className="col-auto text-center">
                                    <img className="lazyload blur-up lazyloaded img-fluid lazyload blur-up lazyloaded" src="/images/footer/appstore.svg" alt="" />
                                </div>
                                <div className="col-auto text-center">
                                    <img className="lazyload blur-up lazyloaded img-fluid" src="/images/footer/playstore.svg" alt="" />
                                </div>
                            </div>
                            <div className="container py-5">
                                <div className="separator-dh mx-5"></div>
                            </div> */}
                            <div className="container-fluid container-lg py-3">
                                <div className="row">
                                    <div className="col-md-auto col-auto mix-blend-multi px-2 py-0">
                                        <img src="/images/logos/dh-logo-footer.svg" className="img-fluid lazyload blur-up lazyloaded" alt="" />
                                    </div>
                                    <div className="col-12 col-md dh-desc py-2">
                                        Ruang Insan Berbagi sebagai wadah kebaikan bagi masyarakat Indonesia dengan pengelolaan dana sosial secara Amanah, Tepat Sasaran dan Profesional. Implementasi program donasi di rangkum dalam 4 Rumpun Program Insani yaitu Insan Sehat (Kesehatan), Insan Mandiri (Perbaikan Ekonomi), Insan Peduli Lingkungan, Insan Cerdas (Pendidikan).
                                    </div>
                                    <div className="col-12 col-md py-2">
                                        <div className="dh-footer-title">Hubungi Kami</div>
                                        <ul className="list-unstyled">
                                            <li className="my-2">
                                                <Link href="/">
                                                    <a className="dh-footer-item-link" href="#">
                                                        <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/location.svg" alt="" />
                                                        <span className="ml-3">
                                                            Jl. Setia Graha II No.44, Margasari, Bandung
                                                        </span>
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="my-2">
                                                <Link href="/">
                                                    <a className="dh-footer-item-link" href="#">
                                                        <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/call.svg" alt="" />
                                                        <span className="ml-3">
                                                            +62 81218547953
                                                        </span>
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="my-2">
                                                <Link href="/">
                                                    <a className="dh-footer-item-link" href="#">
                                                        <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/mail.svg" alt="" />
                                                        <span className="ml-3">
                                                            info@ruanginsanberbagi.org
                                                        </span>
                                                    </a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <div className="col-6 col-md py-2">
                                        <div className="dh-footer-title">Rekening Donasi</div>
                                        <ul className="list-unstyled">
                                            <li className="my-2">
                                                <Link href="/">
                                                    <a className="dh-footer-item-link" href="#">
                                                        <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/right.svg" alt="" />
                                                        <span className="ml-3">
                                                            BNI Syariah  <br />
                                                            <span className="ml-4 rek">
                                                                4111711147
                                                            </span>
                                                        </span>
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="my-2">
                                                <Link href="/">
                                                    <a className="dh-footer-item-link" href="#">
                                                        <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/right.svg" alt="" />
                                                        <span className="ml-3">
                                                            Bank Muamalat  <br />
                                                            <span className="ml-4 rek">
                                                                1110007373
                                                            </span>
                                                        </span>
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="my-2">
                                                <Link href="/">
                                                    <a className="dh-footer-item-link" href="#">
                                                        <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/right.svg" alt="" />
                                                        <span className="ml-3">
                                                            Mandiri Syariah       <br />
                                                            <span className="ml-4 rek">
                                                                7728528577
                                                            </span>
                                                        </span>
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="my-2">
                                                <div className="separator-dh mx-4"></div>
                                            </li>
                                            <li className="my-2">
                                                <div className="dh-footer-item-link">
                                                    <span className="ml-4">
                                                        An. Ruang Insan Berbagi
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div> */}
                                    <div className="col-6 col-md py-2">
                                        <div className="dh-footer-title">Social Media</div>
                                        <ul className="list-unstyled">
                                            <li className="my-2">
                                                <a className="dh-footer-item-link" href="https://www.facebook.com/Ruang-Insan-Berbagi-105321831513073/" target="_blank">
                                                    <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/fb.svg" alt="" />
                                                    <span className="ml-3">
                                                        Ruang Insan Berbagi
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="my-2">
                                                <a className="dh-footer-item-link" href="https://www.instagram.com/ruanginsanberbagi/" target="_blank">
                                                    <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/ig.svg" alt="" />
                                                    <span className="ml-3">
                                                        @ruanginsanberbagi
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="container py-2">
                                <div className="separator-dh mx-5"></div>
                            </div>
                            <div className="container-fluid container-lg py-3 px-md-4">
                                <div className="row justify-content-between mx-4">
                                    <div className="col-6 text-copyright">
                                        Copyright © 2020. Ruang Insan Berbagi. All rights reserved.
                                    </div>
                                    <div className="col-6 text-copyright text-right priv">
                                        <Link href="/syarat-dan-ketentuan">
                                            <a>Syarat & Ketentuan</a>
                                        </Link>
                                        <Link href="/kebijakan-privasi">
                                            <a className="ml-3">Kebijakan Privasi</a>
                                        </Link>
                                        <Link href="/faq">
                                            <a className="ml-3">FAQ</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}