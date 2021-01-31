import { Loading } from '@Components/basics/loading/loading.component';
import MainComponent from '@Components/layout/main/main-layout.component';
import { Spin, Steps } from 'antd';
import Link from 'antd/lib/typography/Link';
import { IPaymentMethod } from 'interfaces/payment-method';
import { Step } from 'rc-steps';
import React, { useEffect, useState } from 'react';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DonationRestServices } from '../donation-rest.service';
import { DonationService } from '../donation.services';
import DonasiPaymentDetail from './payment-detail/payment-detail.component';
import PaymentMethodStep from './payment-method/payment-method.component';

const donationService: DonationService = new DonationService;
const donationRestService: DonationRestServices = new DonationRestServices;

const DonasiFormStep = (props: { step: number, total?: number, id?: any, data?: any }) => {
    const [step, onStepChange] = useState(1);
    const [spin, setSpin] = useState(false);
    const steps = ['Isi Data Diri', 'Metode Pembayaran', 'Bayar'];
    const [paymentMethod, setpayment] = useState<IPaymentMethod>();
    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        notes: '',
        phone: '',
        email: '',
        showAsAnonymous: false
    });

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
                <Link href="/donasi">
                    <div className="close-circle">
                        <img src="/images/icons/close.svg" alt="" />
                    </div>
                </Link>
            </nav>
        </div>
    );

    const scrollFunction = () => {
        const windTop = window.pageYOffset;
        const footerTop: any = document.getElementById('footer-dh')?.offsetTop;
        const mainFormHeight: any = document.getElementById('donasi-form-main')?.offsetHeight;

        if ((windTop + mainFormHeight + 200) > footerTop) {
            document.getElementById('donasi-form-main')?.classList.remove('syur')
            document.getElementById('donasi-form-main')?.classList.add('solute')
            console.log('1-solute');

        } else {
            document.getElementById('donasi-form-main')?.classList.add('syur');
            document.getElementById('donasi-form-main')?.classList.remove('solute');
            if (window.pageYOffset > 70) {

                document.getElementById('donasi-form-main')?.classList.add('nice');
            } else {
                document.getElementById('donasi-form-main')?.classList.remove('nice');
            }
        }
    }

    function onChangeCustomerInfo(val: any) {
        setCustomerInfo(val);
    }

    function onSubmit() {
        setSpin(true);
        const payload = {
            programId: props.id,
            amount: props.total || 0,
            customerInfo: customerInfo,
            paymentMethodId: paymentMethod && paymentMethod._id
        }

        donationRestService.transactionMidtransSnap(payload).pipe(
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
        window.onscroll = function () { scrollFunction() };
    });

    return (
        <MainComponent
            title="Donasi Lazis Darul Hikam"
            description="Donasi Darul Hikam"
            pageId="donasi-step-page-dh"
            customNav={<StepNav />}
        >
            <Spin indicator={<Loading />} spinning={spin}>
                <div className="container-fluid p-0 donasi-form-steps">
                    <div className="container-lg container-fluid py-5 header-section">
                        <div className="container-lg container-fluid form-section">
                            {
                                // step == 1 || 2) ?
                                <div className="row" style={{ minHeight: '95vh' }}>
                                    <div className="col-lg-7 col-12">
                                        <PaymentMethodStep step={step} stepChanges={onStepChange} onChangeCustomerInfo={onChangeCustomerInfo} done={() => onSubmit()} selectPayment={setpayment} />
                                    </div>

                                    <div className="col-lg-5 col-12 position-relative">
                                        <div className="donasi-form flyover my-2 animate__animated animate__bounceIn" id='donasi-form-main'>
                                            <div className="header pb-3 pt-1">
                                                Ringkasan Donasi
                                        </div>
                                            <div className="title py-1">
                                                {props.data ? props.data.name : 'Program'}
                                            </div>
                                            <div className="profile-info py-3">
                                                <div className="d-flex flex-row justify-content-between">
                                                    {/* <div className="d-flex flex-row">
                                                        <div className="profile-img">
                                                            <img src={(props.data && props.data.user) ? props.data.user.imageUrl : '/images/user/placeholder.svg'} alt="" className="lazyload blur-up lazyloaded" />
                                                        </div>
                                                        <div className="ml-3 profile-name">
                                                            {(props.data && props.data.user) ? props.data.user.name : 'Anonim'}
                                                        </div>
                                                    </div> */}
                                                    <div className="is-certified">
                                                        {
                                                            ((props.data && props.data.user) && props.data.user.isCertified) && (
                                                                <img src="/images/program/is-cert.svg" className="img-fluid lazyload blur-up lazyloaded" alt="" />
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="total-info py-3">
                                                <div className="d-flex flex-row justify-content-between">
                                                    <div>Total Donasi</div>
                                                    <div className="amount">
                                                        Rp. {(props.total ? props.total : 0).toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="py-3">
                                                <button className="btn btn-dh-secondary w-100 rounded" disabled={!paymentMethod} onClick={() => onSubmit()}>Bayar</button>
                                            </div>
                                            <div className="row py-3 donate-price">
                                                <div className="col-12 pt-4 share">
                                                    <div className="text-center py-2">Sebarkan Program Melalui</div>
                                                    <div className="d-flex flex-row justify-content-between px-lg-5 px-3">
                                                        <div className="d-flex">
                                                            <img src="/images/icons/sosmed/inactive/wa.svg" alt="" className="img-fluid" />
                                                        </div>
                                                        <div className="d-flex">
                                                            <img src="/images/icons/sosmed/inactive/fb.svg" alt="" className="img-fluid" />
                                                        </div>
                                                        <div className="d-flex">
                                                            <img src="/images/icons/sosmed/inactive/tw.svg" alt="" className="img-fluid" />
                                                        </div>
                                                        <div className="d-flex">
                                                            <img src="/images/icons/sosmed/inactive/wf.svg" alt="" className="img-fluid" />
                                                        </div>
                                                        <div className="d-flex">
                                                            <img src="/images/icons/sosmed/inactive/mail.svg" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                // :
                                // <DonasiPaymentDetail total={100000} />
                            }
                        </div>
                    </div>
                </div>
            </Spin>

        </MainComponent>
    )
}

export default DonasiFormStep;