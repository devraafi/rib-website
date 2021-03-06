import { Loading } from '@Components/basics/loading/loading.component';
import MainComponent from '@Components/layout/main/main-layout.component';
import { Spin, Steps } from 'antd';
import Link from 'antd/lib/typography/Link';
import { IPaymentMethod } from 'interfaces/payment-method';
import { get, replace } from 'lodash';
import { useRouter } from 'next/router';
import { Step } from 'rc-steps';
import React, { useEffect, useState } from 'react';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'services/auth/aut.service';
import { CommonServices } from 'services/common/common.service';
import { RequestService } from 'services/request.services';
import { TransactionRestService } from '../../transaction-detail/transaction-rest.service';
import { DonationRestServices } from '../donation-rest.service';
import { DonationService } from '../donation.services';
import { DonasiPaymentDetail } from './payment-detail/payment-detail.component';
import PaymentMethodStep from './payment-method/payment-method.component';

const auth: AuthenticationService = new AuthenticationService;
const donationService: DonationService = new DonationService;
const donationRestService: DonationRestServices = new DonationRestServices(process.env.staging || '', auth.axiosInterceptors);
const { handleRequest } = new RequestService;
const { isEmail } = new CommonServices;

const DonasiFormStep = (props: { step: number, total?: number, id?: any, referrer?: any, data?: any, isInfaq?: boolean }) => {
    const [step, onStepChange] = useState(1);
    const [spin, setSpin] = useState(false);
    const [res, setRes] = useState<any>();
    const steps = ['Isi Data Diri', 'Metode Pembayaran', 'Bayar'];
    const [paymentMethod, setpayment] = useState<IPaymentMethod>();
    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        notes: '',
        phone: '',
        email: '',
        showAsAnonymous: false
    });
    const baseUrl: any = process.env.baseUrl;
    const router = useRouter();
    const { query } = router;
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
            referrer: props.referrer,
            amount: props.total || 0,
            customerInfo: customerInfo,
            paymentMethodId: paymentMethod && paymentMethod._id
        }
        const params = {
            isInfaq: props.isInfaq || false
        }

        import("react-facebook-pixel")
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.init('809047500028527');
                ReactPixel.fbq('track', 'InitiateCheckout', {
                    program_name: props?.data?.name || '-',
                    content_ids: [payload.programId],
                    value: payload.amount,
                    currency: 'IDR'
                });
            });

        const obs = paymentMethod?.integratedPaymentMethod ? donationRestService.transactionMidtransSnap(payload, params) : donationRestService.transactionManual(payload, params)
        handleRequest({
            obs,
            onError: () => setSpin(false),
            onDone: ((res: any) => {
                setSpin(false);
                if (res.isCoreApi) {
                    router.push({
                        pathname: router.pathname,
                        query: { ...router.query, transactionId: res._id },
                    });
                    return;
                }
                if (paymentMethod?.integratedPaymentMethod) {
                    document.location.href = res.redirect_url;
                } else {
                    setRes(res);
                    onStepChange(4)
                }
            })
        })
    };

    function loadTransactionId() {
        setSpin(true);
        handleRequest({
            obs: new TransactionRestService().loadData(get(router.query, 'transactionId') as any),
            onError: () => setSpin(false),
            onDone: (res) => {
                setSpin(false);
                setRes(res);
            }
        })
    }

    function shareCampaign(data: any, target: 'facebook' | 'twitter' | 'whatsapp') {
        let url;
        const name = replace(data.name, '#', '%23');
        const templateTitle = `Sahabat+Insan+Berbagi%2C+yuk bantu ${name} %0D%0A%23RuangInsanBerbagi%0D%0A`;

        switch (target) {
            case 'whatsapp':
                url = "https://wa.me/?text=" + templateTitle + '%0a%0a' + baseUrl + "/donasi/detail?id=" + data._id + "%26title=" + data.route;
                break;
            case 'twitter':
                url = "https://twitter.com/intent/tweet?text=" + templateTitle + '%0a%0a' + baseUrl + "/donasi/detail?id=" + data._id + "%26title=" + data.route;
                break;
            case 'facebook':
                url = "https://www.facebook.com/sharer/sharer.php?u=" + baseUrl + "/donasi/detail?id=" + data._id + "%26title=" + data.route + "%26quote=" + templateTitle;
                break;
        }

        window.open(url, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollFunction);
        return () => window.removeEventListener('scroll', scrollFunction);
    });

    useEffect(() => {
        if (query && query.transactionId) {
            loadTransactionId();
            onStepChange(4);
        }
    }, [query]);

    return (
        <MainComponent
            title="Donasi | Ruang Insan Berbagi"
            description="Donasi Ruang Insan Berbagi"
            pageId="donasi-step-page-dh"
            customNav={<StepNav />}
            hideFooter
        >
            <Spin indicator={<Loading />} spinning={spin}>
                <div className="container-fluid p-0 donasi-form-steps">
                    <div className="container-lg container-fluid py-5 header-section">
                        <div className="container-lg container-fluid form-section">
                            {
                                step <= 3 ?
                                    <div className="row" style={{ minHeight: '95vh' }}>
                                        <div className="col-lg-7 col-12">
                                            <PaymentMethodStep total={props.total} step={step} stepChanges={onStepChange} onChangeCustomerInfo={onChangeCustomerInfo} done={() => onSubmit()} selectPayment={setpayment} />
                                        </div>

                                        <div className="col-lg-5 col-12 position-relative">
                                            <div className="donasi-form flyover my-2 animate__animated animate__bounceIn" id='donasi-form-main'>
                                                <div className="header pb-3 pt-1 text-center">
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
                                                            Rp {(props.total ? props.total : 0).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="py-3">
                                                    <button className="btn btn-dh-secondary w-100 rounded" disabled={!paymentMethod || !customerInfo.fullName || !customerInfo.email || !isEmail(customerInfo.email)} onClick={() => onSubmit()}>Bayar</button>
                                                </div>
                                                <div className="row py-3 donate-price">
                                                    <div className="col-12 pt-4 share">
                                                        <div className="text-center py-2">Sebarkan Program Melalui</div>
                                                        <div className="d-flex flex-row justify-content-between px-lg-5 px-3">
                                                            <div className="d-flex">
                                                                <a onClick={() => shareCampaign(props.data, 'whatsapp')}>
                                                                    <img src="/images/icons/sosmed/inactive/wa.svg" alt="" className="img-fluid" />
                                                                </a>
                                                            </div>
                                                            <div className="d-flex">
                                                                <a onClick={() => shareCampaign(props.data, 'facebook')}>
                                                                    <img src="/images/icons/sosmed/inactive/fb.svg" alt="" className="img-fluid" />
                                                                </a>
                                                            </div>
                                                            <div className="d-flex">
                                                                <a onClick={() => shareCampaign(props.data, 'twitter')}>
                                                                    <img src="/images/icons/sosmed/inactive/tw.svg" alt="" className="img-fluid" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <DonasiPaymentDetail res={res} />
                            }
                        </div>
                    </div>
                </div>
            </Spin>

        </MainComponent>
    )
}

export default DonasiFormStep;
