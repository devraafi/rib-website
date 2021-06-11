import React, { useEffect, useState } from 'react';
import moment from 'moment';
import message from 'antd/lib/message';
import { formatMoney } from 'accounting';
import Link from 'next/link';

export function PaymentDetailVAComponent(props: { res: any }) {
    const { res } = props;
    const [countDownValue, setCountDownValue] = useState('');
    function copy(text: string) {
        navigator && navigator.clipboard.writeText(text);
        message.success('Copied')
    }

    function countDown() {
        const diffTime = moment(res?.expiredDate).unix() - moment().add(7, 'hours').unix();
        if (diffTime < 0) {
            return console.log('beak')
        }
        let duration = moment.duration(diffTime * 1000, 'milliseconds');
        const interval = 1000;
        setInterval(function () {
            duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
            setCountDownValue(`${duration.hours()}:${duration.minutes()}:${duration.seconds()}`);
        }, interval);

    }
    useEffect(() => {
        countDown()
    })
    return (
        <>
            <div className="container py-3" id="donation-payment-detail">
                <div className="subtitle text-center py-2">
                    Instruksi pembayaran
                    </div>
                <div className="text-center title mb-3">
                    Transfer bank - Virtual Account
                    </div>
                <div className="card-section-1 mb-2">
                    {
                        countDownValue &&
                        <div className="row w-100 justify-content-between m-auto">
                            <div className="col-lg-auto col-12 p-2 field align-self-center">
                                Selesaikan pembayaran dalam
                            </div>
                            <div className="counter col-lg-auto col-12 p-2">
                                <div className="value">
                                    {countDownValue || '-'}
                                </div>
                            </div>
                        </div>
                    }

                    <div className="row w-100 justify-content-between m-auto">
                        <div className="field col-lg-auto col-12 p-2 align-self-center">
                            Batas akhir pembayaran
                        </div>
                        <div className="value col-lg-auto text-center text-lg-right col-12 p-2 align-self-center">
                            {res?.expiredDate ? moment(res.expiredDate).format('dddd, DD MMMM YYYY  HH:mm') : '-'}
                        </div>
                    </div>
                </div>
                <div className="card-section-2 mb-2">
                    <div className="p-2 field t">
                        Detail pembayaran
                    </div>
                    <div className="row w-100 justify-content-between m-auto mb-2">
                        <div className="field align-self-center col-lg-auto col-12 p-2">
                            Total Pembayaran
                        </div>
                        <div className="value col-lg-auto text-center text-lg-right col-12 p-2 total">
                            {formatMoney(res?.total || 0, { symbol: "Rp ", precision: 0, thousand: ".", decimal: "," })}
                        </div>
                    </div>
                    <div className="row w-100 justify-content-between m-auto mb-2">
                        <div className="field align-self-center col-lg-auto col-12 p-2">
                            Nomor virtual account
                        </div>
                        <div className="value col-lg-auto text-center text-lg-right col-12 p-2">
                            {res?.vaNumber}
                            <span className="copy ml-1" onClick={() => copy((res?.total).toString() || '')}>
                                <img src="/images/icons/copy.svg" alt="" />
                            </span>
                        </div>
                    </div>
                    <div className="row w-100 justify-content-between m-auto mb-2">
                        <div className="field align-self-center col-lg-auto col-12 p-2">
                            {res?.paymentName}
                        </div>
                        <div className="value col-lg-auto text-center text-lg-right col-12 p-2">
                            <img style={{
                                maxWidth: '100px'
                            }} src={`/images/logos/payment-method/${res?.code}.svg`} />
                        </div>
                    </div>
                    <div className="row w-100 justify-content-between m-auto mb-2 py-3">
                        <div className="col-lg-6 p-2">
                            <Link href="/donasi">
                                <button className="btn btn-dh-outline-3 o btn-block">Donasi Lagi</button>
                            </Link>
                        </div>
                        <div className="col-lg-6 p-2">
                            <Link href={`/detail-transaksi?id=${res?.lines[0].transactionId}`}>
                                <button className="btn btn-dh-edit o btn-block">Cek Status Pembayaran</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}