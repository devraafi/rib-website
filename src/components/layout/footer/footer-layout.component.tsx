import Link from 'next/link';
import React from 'react';

export default class FooterComponent extends React.Component {

    render() {
        return (
            <div>
                <footer className="container-fluid pt-5 pb-2" id="footer-dh">
                    <div className="row">
                        <div className="col-12">
                            <div className="row justify-content-center">
                                <div className="col-auto">
                                    <div className="text-download">
                                        Download Aplikasi Lazis di
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
                            </div>
                            <div className="container-fluid container-lg py-3">
                                <div className="row">
                                    <div className="col-md-auto col-auto mix-blend-multi">
                                        <img src="/images/logos/dh-logo-footer.svg" className="img-fluid lazyload blur-up lazyloaded" alt="" />
                                    </div>
                                    <div className="col-12 col-md dh-desc py-2">
                                        Ruang Insan Berbagi merupakan lembaga filantropi islam yang bergerak pada pengelolaan zakat infak dan sodaqah untuk pemberdayaan dan kemaslahatan umat
                                    </div>
                                    <div className="col-12 col-md py-2">
                                        <div className="dh-footer-title">Services</div>
                                        <ul className="list-unstyled">
                                            <li className="my-2">
                                                <Link href="/">
                                                    <a className="dh-footer-item-link" href="#">
                                                        <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/location.svg" alt="" />
                                                        <span className="ml-3">
                                                            Ir.H.Juanda No. 285 , Bandung
                                                        </span>
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="my-2">
                                                <Link href="/">
                                                    <a className="dh-footer-item-link" href="#">
                                                        <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/call.svg" alt="" />
                                                        <span className="ml-3">
                                                            022 - 2505375
                                                        </span>
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="my-2">
                                                <Link href="/">
                                                    <a className="dh-footer-item-link" href="#">
                                                        <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/mail.svg" alt="" />
                                                        <span className="ml-3">
                                                            fund.ruanginsanberbagi@gmail.com
                                                        </span>
                                                    </a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-6 col-md py-2">
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
                                    </div>
                                    <div className="col-6 col-md py-2">
                                        <div className="dh-footer-title">Follow Us</div>
                                        <ul className="list-unstyled">
                                            <li className="my-2">
                                                <Link href="/">
                                                    <a className="dh-footer-item-link" href="#">
                                                        <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/fb.svg" alt="" />
                                                        <span className="ml-3">
                                                            Facebook
                                                        </span>
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="my-2">
                                                <Link href="/">
                                                    <a className="dh-footer-item-link" href="#">
                                                        <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/twit.svg" alt="" />
                                                        <span className="ml-3">
                                                            Twitter
                                                        </span>
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="my-2">
                                                <Link href="/">
                                                    <a className="dh-footer-item-link" href="#">
                                                        <img className="lazyload blur-up lazyloaded img-fluid" src="/images/icons/ig.svg" alt="" />
                                                        <span className="ml-3">
                                                            Instagram
                                                        </span>
                                                    </a>
                                                </Link>
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
                                        Terms & Conditions <span className="ml-3">Privacy Policy</span>
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