import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import payment_step from './payment-step.json';
import _ from 'lodash';
const Step = (props: { step: number }) => {
    const stepData = payment_step;
    const [step, setStep] = useState(props.step);
    const [anonim, setAnonim] = useState(true);
    const [paymentMethod, selectPayment] = useState('');
    const paymentMethods = [
        {
            type: 'Bank Virtual Account',
            list: ['BCA', 'Mandiri', 'BNI', 'BRI']
        },
        {
            type: 'e-Wallet',
            list: ['OVO', 'gopay', 'dana', 'shopeepay', 'linkaja']
        }
    ];
    const danation = {
        title: 'Tebar 1000 Sejadah Untuk Masjid Pelosok',
        amount: 1600000000,
        targetAmount: 2500000000,
        user: {
            name: 'Jon Snow Foundation',
            imageUrl: '/images/user/exp/1.svg',
            isCertified: true
        },
        donaturAmount: 1020,
        dayAmount: 65
    };

    function getPaymentStep(id: string) {
        const paymentStep: any = _.find(_.get(stepData, 'data'), ['id', id]);
        console.log(paymentStep);
        return paymentStep.steps;
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [step]);

    return (
        <React.Fragment>
            {
                step == 1 ?
                    <div className="container step py-5">
                        <div className="header">
                            Isi Data Diri
                    </div>
                        <div className="sub-header py-3 text-center">
                            <Link href="/">
                                <a href="" className="mr-1">
                                    <span className="link">Masuk</span>
                                </a>
                            </Link>
                                atau lengkapi data di bawah ini
                    </div>
                        <div>
                            <div className="form-group">
                                <input type="text" disabled={anonim} placeholder="Nama Lengkap" name="" id="" className="form-control" />
                            </div>
                            <div className="form-group">
                                <input type="text" disabled={anonim} placeholder="Nomor ponsel atau email" name="" id="" className="form-control" />
                            </div>
                            <div className="form-group">
                                <div className="d-flex flex-row justify-content-between">
                                    <label className="label-input">Sembunyikan nama saya (Anonim)</label>
                                    <div className="">
                                        <InputSwitch className="dh-switch" checked={anonim} onChange={(e) => setAnonim(e.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label-input" htmlFor="">Tulis catatan (opsional)</label>
                                <textarea className="form-control" placeholder="Beri doa, dan dukunganmu disini" name="" id="" cols={30} rows={10}></textarea>
                            </div>
                            <div className="form-group w-50 m-auto">
                                <button onClick={() => setStep(step + 1)} className="btn btn-dh-secondary rounded w-100">Lanjutkan</button>
                            </div>
                        </div>
                    </div>
                    :
                    step == 2 ?
                        <div className="container step p-5">
                            <div className="header">Pilih metode pembayaran</div>
                            <div className="row py-4">
                                <div className="col-lg-7 py-1">
                                    <div className="d-flex flex-column">
                                        {
                                            paymentMethods.map((pm, i) => {
                                                return (
                                                    <div className="row" key={i}>
                                                        <div className="col-12 sub-header py-2">
                                                            {pm.type}
                                                        </div>
                                                        {
                                                            pm.list.map((l, i) => {
                                                                return (
                                                                    <div key={i} className="col-lg-4 col-6 p-2" onClick={() => selectPayment(l)}>
                                                                        <div className={'payment-box ' + (paymentMethod == l ? 'active' : '')}>
                                                                            <img src={`/images/logos/payment/${l.toLocaleLowerCase()}.svg`} className="img-fluid" alt="" />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-5 py-1">
                                    <div className="box-detail p-4">
                                        <div className="header pb-3 pt-1">
                                            Ringkasan Donasi
                                        </div>
                                        <div className="title py-1">
                                            {danation.title}
                                        </div>
                                        <div className="profile-info py-3">
                                            <div className="d-flex flex-row justify-content-between">
                                                <div className="d-flex flex-row">
                                                    <div className="profile-img">
                                                        <img src={danation.user.imageUrl} alt="" className="lazyload blur-up lazyloaded" />
                                                    </div>
                                                    <div className="ml-3 profile-name">
                                                        {danation.user.name}
                                                    </div>
                                                </div>
                                                <div className="is-certified">
                                                    {
                                                        danation.user.isCertified && (
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
                                                    Rp. {(1000000).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-3">
                                            <button className="btn btn-dh-secondary w-100 rounded" onClick={() => setStep(step + 1)}>Bayar</button>
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
                        </div>
                        :
                        <div className="container step p-5">
                            <div className="header">Detail Pembayaran</div>
                            <div className="sub-header detail py-2">
                                Selesaikan Pembayaran dalam
                            </div>
                            <div className="timer text-center py-2">
                                23:59:59
                            </div>
                            <div className="sub-header text-center py-2">
                                Batas akhir pembayaran
                            </div>
                            <div className="sub-header day py-2 text-center">
                                Minggu, 6 Desember 2020 17:32
                            </div>
                            <div className="py-4">
                                <div className="card card-payment-info">
                                    <div className="card-header">
                                        <div className="d-flex flex-row justify-content-between py-1 px-2">
                                            <div className="name align-self-center">BCA Virtual Account</div>
                                            <div className="align-self-center">
                                                <img src="/images/logos/payment/bca.svg" className="img-fluid" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex flex-row justify-content-between py-1 px-2">
                                            <div className="d-flex flex-column">
                                                <div className="rek-info pb-2">
                                                    <div className="header mb-1">
                                                        Nomor virtual account
                                                </div>
                                                    <div className="value">
                                                        806661234567890
                                                </div>
                                                </div>
                                                <div className="total-info pt-1">
                                                    <div className="header mb-1">
                                                        Total pembayaran
                                                </div>
                                                    <div className="value">
                                                        Rp 100.000
                                                </div>
                                                </div>
                                            </div>
                                            <div className="align-self-center copy">
                                                Salin
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col-lg-6 py-2">
                                    <Link href="/donasi/list">
                                        <a type="button" className="btn btn-dh-outline-2 w-100 shadow">Donasi Lagi</a>
                                    </Link>
                                </div>
                                <div className="col-lg-6 py-2">
                                    <button className="btn btn-dh-secondary w-100 shadow rounded">Cek status pembayaran</button>
                                </div>
                            </div>
                            <div className="py-3 how-to">Cara pembayaran</div>
                            <div className="accordion" id="accordionPaymentStep">
                                {
                                    getPaymentStep('bca').map((step: any, i: number) => {
                                        return (
                                            <div className="card step-card" key={i}>
                                                <div className="card-header" id={'heading' + i}>
                                                    <div className="d-flex flex-row justify-content-between xol collapsed" data-toggle="collapse" data-target={'#collapse' + i} aria-expanded="true" aria-controls={'collapse' + i}>
                                                        <div className="title-step">
                                                            {step.title}
                                                        </div>
                                                        <div className="arrow col-auto">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id={'collapse' + i} className="collapse" aria-labelledby={'heading' + i} data-parent="#accordionPaymentStep">
                                                    <div className="card-body">
                                                        <ol className="list bottom px-3 px-3 pb-3 border-bottom">
                                                            {
                                                                step.list.map((li: string, i: number) => {
                                                                    return (
                                                                        <li key={i} className="py-1">{li}</li>
                                                                    )
                                                                })
                                                            }
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
            }
        </React.Fragment>
    )
}

export default Step;