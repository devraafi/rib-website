import _ from "lodash";
import Link from "next/link"
import React, { useEffect } from "react"
import payment_step from './payment-data.json';
import { Accordion, AccordionTab } from 'primereact/accordion';


const getPaymentStep = (id: string) => {
    const stepData = payment_step;
    const paymentStep: any = _.find(_.get(stepData, 'data'), ['id', id]);
    console.log(paymentStep);
    return paymentStep.steps;
}


const ZakatPaymentDetail = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="zakat-payment-detail zakat-payment-detail-v container step p-5">
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
                    <Link href="/zakat">
                        <button type="button" className="btn btn-dh-outline rounded w-100 shadow">Selesai</button>
                    </Link>
                </div>
                <div className="col-lg-6 py-2">
                    <button className="btn btn-dh-secondary w-100 shadow rounded">Cek status pembayaran</button>
                </div>
            </div>
            <div className="py-3 how-to">Cara pembayaran</div>
            <Accordion multiple activeIndex={[0]} className="accordion-step-payment">
                {
                    getPaymentStep('bca').map((step: any, i: number) => (
                        <AccordionTab header={step.title}>
                            <ol className="list bottom px-3 px-3 pb-3 border-bottom">
                                {
                                    step.list.map((li: string, i: number) => (
                                        <li key={i} className="py-1">{li}</li>
                                    ))
                                }
                            </ol>
                        </AccordionTab>
                    ))
                }
            </Accordion>
        </div>
    )
}

export default ZakatPaymentDetail;