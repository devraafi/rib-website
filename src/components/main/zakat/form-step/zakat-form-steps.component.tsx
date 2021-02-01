import MainComponent from "@Components/layout/main/main-layout.component";
import { Popover, Spin, Steps } from "antd";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CalculateZakat from "./calculate-zakat/calculate-zakat.component";
import GiveZakat from "./give-zakat/give-zakat.component";
import ZakatPaymentDetail from "./payment-detail/zakat-payment-detail.component";
import ZakatPaymetMethod from "./payment-method/zakat-payment-method.component";
import { Messages } from 'primereact/messages';
import { ZakatRestServices } from "../zakat-rest.service";
import { Loading } from "@Components/basics/loading/loading.component";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { IPaymentMethod } from "interfaces/payment-method";
const zakatRestService: ZakatRestServices = new ZakatRestServices;
const ZakatFormSteps = () => {
    const steps = ['Hitung Zakat', 'Beri Zakat', 'Pembayaran'];
    // const steps = ['Hitung Zakat', 'Beri Zakat', 'Pembayaran', 'Selesai'];
    const msgPrivacy = useRef(null);
    const { Step } = Steps;
    const [spin, setSpin] = useState(false);
    const [zakatList, setZakatList] = useState<any>([]);
    const [step, onStepChange] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const [wealthAmount, setWealthAmount] = useState(0);
    const [subtotalAmount, setSubtotal] = useState(0);
    const [debtAmount, setDebAmount] = useState(0);
    const [roundUpAmount, setRoundAmount] = useState(0);
    const [fidyahAmount, setFidyahAmount] = useState(0);
    const [shodaqohAmount, setShodaqohAmount] = useState(0);
    const [isManual, setIsManual] = useState(false);
    const [checkList, setCheckList] = useState<any>(null);

    const [paymentMethod, setpayment] = useState<IPaymentMethod>();

    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        notes: '',
        phone: '',
        email: '',
        showAsAnonymous: false
    });

    function onChangesCalc(values: any) {
        console.log(values);
        let totalZakat = 0;
        let totalWealthAmount = 0;
        let totalDebtAmount = 0;
        let subtotal = 0;
        if (values) {
            for (const key in values) {
                totalZakat += values[key].totalWithRate;
                totalWealthAmount += values[key].totalDebit;
                totalDebtAmount += values[key].totalCredit;
            }
        }
        subtotal = totalZakat;
        setSubtotal(subtotal);
        setWealthAmount(totalWealthAmount);
        setDebAmount(totalDebtAmount);
        // setRoundAmount(subtotal)
    }

    function onRoundUpChanges(val: number) {
        setRoundAmount(val)
    }

    function onFidyahAmountChanges(val: number) {
        setFidyahAmount(val)
    }

    function onShodaqohAmountChanges(val: number) {
        setShodaqohAmount(val)
    }

    function syncTotal() {
        const total = (subtotalAmount + fidyahAmount + shodaqohAmount);
        setTotalAmount(total);
    }

    useEffect(() => {
        syncTotal();
    }, [subtotalAmount, totalAmount, fidyahAmount, shodaqohAmount])


    useEffect(() => {
        console.log(checkList);
    }, [checkList])

    const scrollFunction = () => {
        const windTop = window.pageYOffset;
        const footerTop: any = document.getElementById('footer-dh')?.offsetTop;
        const mainFormHeight: any = document.getElementById('main-form-zakat')?.offsetHeight;

        if ((windTop + mainFormHeight + 200) > footerTop) {
            document.getElementById('main-form-zakat')?.classList.remove('syur')
            document.getElementById('main-form-zakat')?.classList.add('solute')

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

    function loadZakat() {
        setSpin(true);
        zakatRestService.loadZakatList().pipe(
            catchError((err) => {
                setSpin(false);
                return throwError(err);
            })
        ).subscribe((res: any) => {
            let data = [...zakatList];
            setSpin(false);
            if (res) {
                data = [];
                res.data.map((doc: any, i: any) => {
                    doc = { ...doc, checked: false };
                    data.push(doc);
                });
                setZakatList(data)
            }
        })
    }

    function onChangeCustomerInfo(val: any) {
        setCustomerInfo(val);
    };

    function onSubmit() {
        setSpin(true);
        const payload = {
            customerInfo: customerInfo,
            paymentMethodId: paymentMethod && paymentMethod._id
        }

        zakatRestService.createTransaction(payload).pipe(
            catchError(err => {
                setSpin(false);
                return throwError(err);
            })
        ).subscribe((res: any) => {
            setSpin(false);
            document.location.href = res.redirect_url;
        });
    };

    useEffect(() => {
        loadZakat();
        window.onscroll = function () { scrollFunction() };
        const msgPriv: any = msgPrivacy.current;
        if (msgPriv) {
            msgPriv.show({
                sticky: true, content: (
                    <div className="d-flex flex-row privacy-alert text-left">
                        <img alt="logo" src="/images/icons/privacy.svg" onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="align-self-start" />
                        <div className="pl-3 d-flex flex-column">
                            <div className="title">Privasi informasi yang Anda berikan telah terlindungi oleh sistem kami</div>
                            <Link href="#">
                                <a className="desc">Pelajari lebih lanjut <span className="ml-2"><img src="/images/icons/ArrowRight.svg" alt="" /></span></a>
                            </Link>
                        </div>
                    </div>
                )
            });
        }
    }, [])

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
                                <Step key={s} title={s} />
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
        <MainComponent
            title="Zakat Lazis Darul Hikam"
            description="lazis Darul Hikam"
            pageId="zakat-page-dh"
            customNav={<StepNav />}
        >
            <Spin indicator={<Loading />} spinning={spin}>
                <div className="container-fluid p-0 zakat-form-steps">
                    <div className="container-lg container-fluid py-5 header-section">
                        <div className="d-flex flex-column m-auto text-center">
                            <div className="header">
                                Percayakan Zakat Anda pada Kami
                            </div>
                            <div className="description py-3">
                                Lazis Darul Hikam hadir untuk membantu menyalurkan bantuan bagi umat serta kelompok yang membutuhkan
                            </div>
                            <Messages ref={msgPrivacy} className="messages-dh-privacy" />
                        </div>
                        <div className="container-lg container-fluid form-section">
                            <div className="row" style={{ minHeight: '95vh' }}>
                                {
                                    step >= 4 ? <ZakatPaymentDetail total={0} /> :
                                        <>
                                            <div className="col-lg-7 col-12">
                                                <div className={step !== 1 ? 'd-none' : ''}>
                                                    <CalculateZakat
                                                        checkListChange={setCheckList}
                                                        manualChange={setIsManual}
                                                        isManual={isManual}
                                                        zakatList={zakatList}
                                                        step={step}
                                                        stepChanges={onStepChange}
                                                        onChangesForm={onChangesCalc}
                                                    />
                                                </div>
                                                <div className={step !== 2 ? 'd-none' : ''}>
                                                    <GiveZakat
                                                        onChangesTotal={setSubtotal}
                                                        checkList={checkList}
                                                        isManual={isManual}
                                                        subtotalAmount={subtotalAmount}
                                                        step={step}
                                                        stepChanges={onStepChange}
                                                        roundUpChanges={onRoundUpChanges}
                                                        onFidyahChanges={onFidyahAmountChanges}
                                                        onShodaqohChanges={onShodaqohAmountChanges}
                                                    />
                                                </div>
                                                <div className={step !== 3 ? 'd-none' : ''}>
                                                    <ZakatPaymetMethod
                                                        step={step}
                                                        stepChanges={onStepChange}
                                                        onChangeCustomerInfo={onChangeCustomerInfo}
                                                        done={() => onSubmit()} selectPayment={setpayment}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-5 col-12 position-relative">
                                                <div className="main-form my-2 animate__animated animate__bounceIn" id='main-form-zakat'>
                                                    <div className="text-center mb-2 px-2">
                                                        <div className="header mb-2">
                                                            Total Zakat Anda
                                                        </div>
                                                        <div className="description">
                                                            Berikut ringkasan informasi yang Anda berikan dan berapa banyak Zakat yang perlu dibayarkan
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
                                                                        Rp {debtAmount ? (debtAmount).toLocaleString() : 0}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 px-2 py-2">

                                                                <div className="the-box">
                                                                    <div className="label">
                                                                        Harga emas
                                                                    </div>
                                                                    <div className="amount warn">
                                                                        Rp {0 ? (0).toLocaleString() : 0}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 px-2 py-2">
                                                                <div className="the-box">
                                                                    <div className="d-flex flex-row w-100 justify-content-between">
                                                                        <div className="label">
                                                                            Nisab hari ini
                                                                        </div>
                                                                        <Popover content={'Nilai nisab adalah sebesar 20 Dinar emas (85 gram) dalam satu tahun'} title="Nisab">
                                                                            <img src="/images/icons/tooltip.svg" alt="" className="img-fluid" />
                                                                        </Popover>
                                                                    </div>
                                                                    <div className="amount warn">
                                                                        Rp {0 ? (0).toLocaleString() : 0}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row py-3">
                                                            <div className="col-12">
                                                                <div className="the-lines">
                                                                    <div className="label sub">Subtotal Zakat</div>
                                                                    <div className="amount">
                                                                        Rp {subtotalAmount ? (subtotalAmount).toLocaleString() : 0}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {
                                                                (roundUpAmount > 0 && step > 1) && (
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
                                                                <div className="label">Total</div>
                                                                <div className="amount">
                                                                    Rp {totalAmount ? (totalAmount).toLocaleString() : 0}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row py-3">
                                                        <div className="col-12">
                                                            <div className="the-footer">
                                                                Masih memiliki pertanyaan? Hubungi kami di lazisdarulhikam@gmail.com
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
            </Spin>
        </MainComponent>

    )
}

export default ZakatFormSteps;