import MainComponent from "@Components/layout/main/main-layout.component";
import React, { useEffect, useState } from "react";
import CalculateZakat from "./calculate-zakat/calculate-zakat.component";
import GiveZakat from "./give-zakat/give-zakat.component";
import ZakatPaymentDetail from "./payment-detail/zakat-payment-detail.component";
import ZakatPaymetMethod from "./payment-method/zakat-payment-method.component";

const ZakatFormSteps = () => {
    const [step, onStepChange] = useState(1);
    const scrollFunction = () => {
        const windTop = window.pageYOffset;
        const mainFormTop: any = document.getElementById('main-form-zakat')?.offsetTop;
        const footerTop: any = document.getElementById('footer-dh')?.offsetTop;
        const mainFormHeight: any = document.getElementById('main-form-zakat')?.offsetHeight;

        if ((windTop + mainFormHeight + 200) > footerTop) {
            document.getElementById('main-form-zakat')?.classList.remove('syur')
        } else {
            document.getElementById('main-form-zakat')?.classList.add('syur')
        }
    }

    useEffect(() => {
        window.onscroll = function () { scrollFunction() };

    })
    return (
        <React.Fragment>
            <MainComponent
                title="Zakat Lazis Darul Hikam"
                description="lazis Darul Hikam"
                pageId="zakat-page-dh"
            >

                <div className="container-fluid p-0 zakat-form-steps">
                    <div className="conatiner py-5 header-section">
                        <div className="d-flex flex-column m-auto text-center">
                            <div className="header">
                                I'm ready to work out my Zakat
                            </div>
                            <div className="description py-3">
                                Working out your Zakat isn’t always easy. Use our step-by-step calculator to make sure you get it right.
                            </div>
                        </div>
                        <div className="container-lg container-fluid form-section">
                            <div className="row">
                                {
                                    step == 100 ? <ZakatPaymentDetail /> :
                                        <>
                                            <div className="col-lg-7 col-12">
                                                {
                                                    step == 1 ?
                                                        <CalculateZakat step={step} stepChanges={(to) => onStepChange(to)} />
                                                        : step == 2 ?
                                                            <GiveZakat step={step} stepChanges={(to) => onStepChange(to)} />
                                                            : step == 3 ? <ZakatPaymetMethod step={step} stepChanges={(to) => onStepChange(to)} />
                                                                : ''
                                                }
                                            </div>
                                            <div className="col-lg-5 col-12 position-relative">
                                                <div className="main-form my-2 animate__animated animate__bounceIn" id='main-form-zakat'>
                                                    <div className="text-center mb-2 px-2">
                                                        <div className="header mb-2">
                                                            Total zakat anda
                                            </div>
                                                        <div className="description">
                                                            Here's a summary of the information you've provided and how much Zakat you need to give.
                                            </div>
                                                    </div>
                                                    <div className="row py-3">
                                                        <div className="col-6 px-2 py-2">
                                                            <div className="the-box">
                                                                <div className="label">
                                                                    Kekayaan saya
                                                    </div>
                                                                <div className="amount success">
                                                                    Rp 15.000.000
                                                    </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 px-2  py-2">
                                                            <div className="the-box">
                                                                <div className="label">
                                                                    Hutang saya
                                                    </div>
                                                                <div className="amount danger">
                                                                    Rp 1.344.000
                                                    </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 px-2 py-2">

                                                            <div className="the-box">
                                                                <div className="label">
                                                                    Kekayaan saya setara
                                                    </div>
                                                                <div className="amount success">
                                                                    Rp 13.245.000
                                                    </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 px-2 py-2">
                                                            <div className="the-box">
                                                                <div className="label">
                                                                    Nisab hari ini
                                                    </div>
                                                                <div className="amount warn">
                                                                    Rp 150.000
                                                    </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row py-3">
                                                        <div className="col-12">
                                                            <div className="the-lines">
                                                                <div className="label sub">Subtotal Zakat (2.5%)</div>
                                                                <div className="amount">Rp 2.245.000</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="the-lines">
                                                                <div className="label">Zakat</div>
                                                                <div className="amount">Rp 5.000.000</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="the-lines">
                                                                <div className="label">Fidyah/Kaffarah</div>
                                                                <div className="amount">Rp 20.000</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="the-lines">
                                                                <div className="label">Round Up Zakat</div>
                                                                <div className="amount">Rp 400.000</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row py-3">
                                                        <div className="col-12">
                                                            <div className="the-total">
                                                                <div className="label">Total Zakat</div>
                                                                <div className="amount">Rp 5.320.000</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row py-3">
                                                        <div className="col-12">
                                                            <div className="the-footer">
                                                                Still have questions? Email us on zakatquery@darulhikam.com and we’d be happy to help with any questions you have.
                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </MainComponent>
        </React.Fragment >
    )
}

export default ZakatFormSteps;