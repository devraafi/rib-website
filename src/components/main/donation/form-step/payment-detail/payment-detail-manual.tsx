import React from 'react';
import moment from 'moment';
import message from 'antd/lib/message';
import { formatMoney } from 'accounting';
import Link from 'next/link';

export function PaymentDetailManualComponent(props: { res: any }) {
    const { res } = props;
    function transactionDates(date: any) {
        const newDate = moment(date);
        const endDate = moment(date);
        const diff = moment(endDate.diff(newDate));

        let countDown;
        const transactionDate = {
            deadLine: endDate.format('dddd, DD MMMM YYYY  HH:mm'),
            countDown
        }
        return transactionDate
    };

    function copy(text: string) {
        navigator && navigator.clipboard.writeText(text);
        message.success('Copied')
    }
    return (
        <>
            <div className="container py-3" id="donation-payment-detail">
                <div className="subtitle text-center py-2">
                    Instruksi pembayaran
                    </div>
                <div className="text-center title mb-3">
                    Transfer bank - Manual Transfer
                    </div>
                <div className="card-section-1 mb-2">
                    {/* 
                        <div className="row w-100 justify-content-between m-auto">
                            <div className="col-lg-auto col-12 p-2 field align-self-center">
                                Selesaikan pembayaran dalam
                            </div>
                            <div className="counter col-lg-auto col-12 p-2">
                                <div className="value">
                                    {transactionDates(res.transactionDate) ? transactionDates(res.transactionDate)?.countDown : '-'}
                                </div>
                            </div>
                        </div>
                    */}
                    <div className="row w-100 justify-content-between m-auto">
                        <div className="field col-lg-auto col-12 p-2 align-self-center">
                            Batas akhir pembayaran
                        </div>
                        <div className="value col-lg-auto text-center text-lg-right col-12 p-2 align-self-center">
                            {transactionDates(res.createdAt) ? transactionDates(res.createdAt)?.deadLine : '-'}
                        </div>
                    </div>
                </div>
                <div className="card-section-2 mb-2">
                    <div className="p-2  t">
                        CARA PEMBAYARAN
                        </div>
                    <div className="row w-100 justify-content-between m-auto mb-2">
                        <div className=" align-self-center col-lg-auto col-12 p-2">
                            Total Pembayaran
                        </div>
                        <div className="value col-lg-auto text-center text-lg-right col-12 p-2 total">
                            {formatMoney(res?.total || 0, { symbol: "Rp ", precision: 0, thousand: ".", decimal: "," })} <span className="copy" onClick={() => copy((res?.total).toString() || '')}>
                                <img src="/images/icons/copy.svg" alt="" />
                            </span>
                        </div>
                    </div>
                    <div className="row w-100 m-auto mb-2 child-card">
                        <div className="align-self-center col-lg-6 col-12 p-2">
                            Jumlah Donasi
                        </div>
                        <div className="value text-lg-right text-center align-self-center col-lg-6 col-12 p-2">
                            {formatMoney(res?.amount || 0, { symbol: "Rp ", precision: 0, thousand: ".", decimal: "," })}
                        </div>
                        <div className="align-self-center col-lg-6 col-12 p-2">
                            Kode Unik
                        </div>
                        <div className="value text-lg-right text-center align-self-center col-lg-6 col-12 p-2">
                            {formatMoney(res?.uniqueCode || 0, { symbol: "Rp ", precision: 0, thousand: ".", decimal: "," })}
                        </div>
                        <div className="text-lg-right text-center align-self-center col-12 p-2">
                            * Mohon transfer tepat dengan nominal yang telah ditambahkan kode unik
                        </div>
                    </div>
                </div>
                <div className="card-section-2 mb-2">
                    <div className="row w-100 justify-content-between m-auto mb-2">
                        <div className="field align-self-center col-lg-6 col-12 p-2">
                            Pembayaran dilakukan ke rekening:
                            </div>
                        <div className="field col-lg-auto text-lg-right col-12 p-2">
                            <div className="d-flex">
                                <span>
                                    Atas Nama
                                    </span>
                                <span className="value ml-2">
                                    {res?.paymentMethod?.accountName}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row w-100 justify-content-between m-auto mb-2">
                        <div className="value align-self-center col-lg-auto text-center text-lg-right col-12 p-2">
                            <img style={{
                                maxWidth: '100px'
                            }} src={`/images/logos/payment-method/${res?.paymentMethod?.code}.svg`} />
                        </div>
                        <div className="value align-self-center col-lg-auto text-left text-lg-right col-6 p-2">
                            {res?.paymentMethod?.accountNumber}
                        </div>
                        <div className="value align-self-center col-lg-auto text-right col-6 p-2">
                            <span className="copy" onClick={() => copy(res?.paymentMethod?.accountNumber || '')}>
                                <img src="/images/icons/copy.svg" alt="" />
                            </span>
                        </div>
                    </div>
                    <div className="row w-100 m-auto mb-2 child-card">
                        <div className="value col-lg-auto align-self-center col-auto p-2 mr-2">
                            <img src="/images/icons/WarningCircle.svg" alt="" />
                        </div>
                        <div className="col align-self-center p-2">
                            Kirim Bukti Pembayaran via WhatsApp Ruang Insan Berbagi: <span className="v">+62 81218547953</span>
                        </div>
                    </div>
                    <div className="row w-100 justify-content-between m-auto mb-2 py-3">
                        <div className="col-lg-6 p-2">
                            <Link href="/donasi">
                                <button className="btn btn-dh-outline-3 o btn-block">Donasi Lagi</button>
                            </Link>
                        </div>
                        <div className="col-lg-6 p-2">
                            <Link href={`/detail-transaksi?id=${res?._id}&manual=true`}>
                                <button className="btn btn-dh-edit o btn-block">Cek Status Pembayaran</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}