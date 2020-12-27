import MainComponent from "@Components/layout/main/main-layout.component";
import { Steps } from "antd";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CalculateZakat from "./calculate-zakat/calculate-zakat.component";
import GiveZakat from "./give-zakat/give-zakat.component";
import ZakatPaymentDetail from "./payment-detail/zakat-payment-detail.component";
import ZakatPaymetMethod from "./payment-method/zakat-payment-method.component";
import { Messages } from 'primereact/messages';

const ZakatFormSteps = () => {
    const steps = ['Hitung Zakat', 'Beri Zakat', 'Beri Sedekah', 'Selesai'];
    const msgPrivacy = useRef(null);
    const { Step } = Steps;
    const [step, onStepChange] = useState(1);
    const [wealthAmount, onChangewealthAmount] = useState(15000000);
    const [goldPrice, onChangeGoldPrice] = useState(150000);
    const [nisabAmount, onChangeNisabAmount] = useState(150000);
    const [debAmount, onChangeDebAmount] = useState(1344000);
    const [subTotal, onChangeSubtotal] = useState(wealthAmount * (2.5 / 100));
    const [zakatAmount, onChangeZakatAmont] = useState(0);
    const [roundUpAmount, onChangeRoundUpAmont] = useState(0);
    const [fidyahAmount, onChangeFidyahAmont] = useState(0);
    const [shodaqohAmount, onChangeShodaqohAmont] = useState(0);
    const [totalAmount, onChangeTotalAmount] = useState(subTotal + zakatAmount + fidyahAmount + shodaqohAmount + roundUpAmount);

    const syncAmount = (amount: number) => {
        onChangeZakatAmont(amount);
        syncTotal()
    }

    const syncTotal = () => {
        const total = subTotal + zakatAmount + fidyahAmount + shodaqohAmount + roundUpAmount;
        onChangeTotalAmount(total);
    }

    const scrollFunction = () => {
        const windTop = window.pageYOffset;
        const mainFormTop: any = document.getElementById('main-form-zakat')?.offsetTop;
        const footerTop: any = document.getElementById('footer-dh')?.offsetTop;
        const mainFormHeight: any = document.getElementById('main-form-zakat')?.offsetHeight;

        if ((windTop + mainFormHeight + 200) > footerTop) {
            document.getElementById('main-form-zakat')?.classList.remove('syur')
            document.getElementById('main-form-zakat')?.classList.add('solute')
            console.log('1-solute');

        } else {
            document.getElementById('main-form-zakat')?.classList.add('syur');
            document.getElementById('main-form-zakat')?.classList.remove('solute');
            if (window.pageYOffset > 70) {

                document.getElementById('main-form-zakat')?.classList.add('nice');
            } else {
                document.getElementById('main-form-zakat')?.classList.remove('nice');
            }
        }
    }

    useEffect(() => {
        window.onscroll = function () { scrollFunction() };
        const msgPriv: any = msgPrivacy.current;
        msgPriv ? msgPriv.show({
            sticky: true, content: (
                <React.Fragment>
                    <div className="d-flex flex-row privacy-alert text-left">
                        <img alt="logo" src="/images/icons/privacy.svg" onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="align-self-start" />
                        <div className="pl-3 d-flex flex-column">
                            <div className="title">Privasi informasi yang Anda berikan telah terlindungi oleh sistem kami</div>
                            <Link href="#">
                                <a className="desc">Pelajajari lebih lanjut <span className="ml-2"><img src="/images/icons/ArrowRight.svg" alt="" /></span></a>
                            </Link>
                        </div>
                    </div>
                </React.Fragment>
            )
        }) : '';
        syncTotal();
        return () => msgPriv ? msgPriv.clear() : null;
    }, [totalAmount])

    const StepNav = () => (
        <div id="navbar-dh" className="d-none d-md-flex">
            <nav className="navbar navbar-expand-lg container-fluid container-lg navbar-light">
                <Link href="/">
                    <a className="navbar-brand" href="/">
                        <img src="/images/logos/dh-logo.svg" alt="" />
                    </a>
                </Link>
                <div className="m-auto">
                    <Steps current={step - 1} labelPlacement="vertical" className="step-antd-dh">
                        {
                            steps.map((s) => (
                                <Step title={s} />
                            ))
                        }
                    </Steps>
                </div>
                <Link href="/zakat">
                    <div className="close-circle">
                        <img src="/images/icons/close.svg" alt="" />
                    </div>
                </Link>
            </nav>
        </div>
    )
    return (
        <React.Fragment>
            <MainComponent
                title="Zakat Lazis Darul Hikam"
                description="lazis Darul Hikam"
                pageId="zakat-page-dh"
                customNav={<StepNav />}
            >

                <div className="container-fluid p-0 zakat-form-steps">
                    <div className="container-lg container-fluid py-5 header-section">
                        <div className="d-flex flex-column m-auto text-center">
                            <div className="header">
                                I'm ready to work out my Zakat
                            </div>
                            <div className="description py-3">
                                Working out your Zakat isn’t always easy. Use our step-by-step calculator to make sure you get it right.
                            </div>
                            <Messages ref={msgPrivacy} className="messages-dh-privacy" />
                        </div>
                        <div className="container-lg container-fluid form-section">
                            <div className="row" style={{ minHeight: '95vh' }}>
                                {
                                    step >= 4 ? <ZakatPaymentDetail total={totalAmount} /> :
                                        <>
                                            <div className="col-lg-7 col-12">
                                                {
                                                    step == 1 ?
                                                        <CalculateZakat zakatAmount={zakatAmount} onChangeZakatAmount={syncAmount} step={step} stepChanges={(to) => onStepChange(to)} />
                                                        : step == 2 ?
                                                            <GiveZakat step={step} stepChanges={(to) => onStepChange(to)} fidyahChanges={(a) => { onChangeFidyahAmont(a); syncTotal() }
                                                            } shodaqohChanges={(a) => { onChangeShodaqohAmont(a); syncTotal() }} roundUpChanges={(a) => {
                                                                onChangeRoundUpAmont(a);
                                                                syncTotal()
                                                            }} />
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
                                                    <div className="flyover">
                                                        <div className="row py-3">
                                                            <div className="col-6 px-2 py-2">
                                                                <div className="the-box">
                                                                    <div className="label">
                                                                        Kekayaan saya
                                                                    </div>
                                                                    <div className="amount success">
                                                                        Rp {wealthAmount ? (wealthAmount).toLocaleString() : 0}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 px-2  py-2">
                                                                <div className="the-box">
                                                                    <div className="label">
                                                                        Hutang saya
                                                                    </div>
                                                                    <div className="amount danger">
                                                                        Rp {debAmount ? (debAmount).toLocaleString() : 0}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 px-2 py-2">

                                                                <div className="the-box">
                                                                    <div className="label">
                                                                        Harga emas
                                                                    </div>
                                                                    <div className="amount warn">
                                                                        Rp {goldPrice ? (goldPrice).toLocaleString() : 0}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 px-2 py-2">
                                                                <div className="the-box">
                                                                    <div className="d-flex flex-row w-100 justify-content-between">
                                                                        <div className="label">
                                                                            Nisab hari ini
                                                                        </div>
                                                                        <img src="/images/icons/tooltip.svg" alt="" className="img-fluid" />
                                                                    </div>
                                                                    <div className="amount warn">
                                                                        Rp {nisabAmount ? (nisabAmount).toLocaleString() : 0}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row py-3">
                                                            <div className="col-12">
                                                                <div className="the-lines">
                                                                    <div className="label sub">Subtotal Zakat (2.5%)</div>
                                                                    <div className="amount">
                                                                        Rp {subTotal ? (subTotal).toLocaleString() : 0}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="the-lines">
                                                                    <div className="label">Zakat</div>
                                                                    <div className="amount">
                                                                        Rp {zakatAmount ? (zakatAmount).toLocaleString() : 0}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {
                                                                (roundUpAmount > 0) && (
                                                                    <div className="col-12">
                                                                        <div className="the-lines">
                                                                            <div className="label">Round Up Zakat</div>
                                                                            <div className="amount">
                                                                                Rp {roundUpAmount ? (roundUpAmount).toLocaleString() : 0}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                            {
                                                                (fidyahAmount > 0) && (
                                                                    <div className="col-12">
                                                                        <div className="the-lines">
                                                                            <div className="label">Fidyah/Kaffarah</div>
                                                                            <div className="amount">
                                                                                Rp {fidyahAmount ? (fidyahAmount).toLocaleString() : 0}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                            {
                                                                (shodaqohAmount > 0) && (
                                                                    <div className="col-12">
                                                                        <div className="the-lines">
                                                                            <div className="label">Sadaqah</div>
                                                                            <div className="amount">
                                                                                Rp {shodaqohAmount ? (shodaqohAmount).toLocaleString() : 0}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="row py-3">
                                                        <div className="col-12">
                                                            <div className="the-total">
                                                                <div className="label">Total Zakat</div>
                                                                <div className="amount">
                                                                    Rp {totalAmount ? (totalAmount).toLocaleString() : 0}
                                                                </div>
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