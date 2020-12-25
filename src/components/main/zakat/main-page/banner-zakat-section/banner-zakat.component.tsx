import Link from 'next/link';
import React from 'react';

const BannerZakatSection = () => (
    <React.Fragment>
        <div className="container-fluid p-0 content-zakat banner-zakat py-5">
            <img src="/images/backgrounds/islamic.svg" className="islamic-bg" alt="" />
            <div className="container-lg container-fluid py-5">
                <div className="row">
                    <div className="col-lg-6 order-lg-1 order-2">
                        <div className="d-flex flex-column">
                            <div className="header mb-3 text-center text-lg-left">
                                Why your Zakat is needed here
                            </div>
                            <div className="description-1 px-md-5 px-lg-0 px-0 px-md-5 px-lg-0 px-0 mb-5 text-center text-lg-left">
                                Your Zakat is more than just a payment, it’s a way to create social change.
                                <br /> <br />
                                Across the Indonesia, thousands of Muslims are living in desperate situations and being held back by lack of money. But there is a solution. Your Zakat has the power to change the lives of Muslims where you live, and it’s up to you to make sure it achieves that potential.
                            </div>
                            <div className="action text-center text-lg-left">
                                <Link href="/zakat/form-steps">
                                    <button className="btn btn-dh-primary px-5">
                                        BERI ZAKAT
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 order-lg-2 order-1">
                        <div className="d-flex w-100 justify-content-center align-item-center text-center pb-3">
                            <img src="/images/zakat/1.png" className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
);

export default BannerZakatSection;