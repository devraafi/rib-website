import React, { useEffect, useState } from 'react';
import moment from 'moment';
import message from 'antd/lib/message';
import { formatMoney } from 'accounting';
import Link from 'next/link';
import { CommonServices } from '../../../../../services/common/common.service';
import { RequestService } from '../../../../../services/request.services';
import { DonationRestServices } from '../../donation-rest.service';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import { Loading } from '../../../../basics/loading/loading.component';

export function PaymentDetailRetailComponent(props: { res: any }) {
    const { res } = props;
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [countDownValue, setCountDownValue] = useState('');
    const DynamicComponent = dynamic(() => import('./payment-intructions/retail').then((mod: any) => mod[res?.code]))
    function copy(text: string) {
        navigator && navigator.clipboard.writeText(text);
        message.success('Copied')
    }

    function countDown() {
        const diffTime = moment(res?.expiredDate).unix() - moment().add(7, 'hours').unix();
        if (diffTime < 0) {
            setLoading(true);
            return new RequestService().handleRequest({
                obs: new DonationRestServices().void(res?.lines[0].transactionId),
                onDone: () => {
                    setLoading(false);
                    router.push(`/detail-transaksi?id=${res?.lines[0].transactionId}`);
                },
                onError: () => {
                    setLoading(false);
                    router.push(`/detail-transaksi?id=${res?.lines[0].transactionId}`);
                }
            })
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
    }, [])
    return (
        <Spin spinning={loading} indicator={<Loading />}>
            <div className="container py-3" id="donation-payment-detail">
                <div className="subtitle text-center py-2">
                    Instruksi pembayaran
                    </div>
                <div className="text-center title mb-3">
                    {res?.paymentName}
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
                        <div className=" col-lg-auto col-12 p-2 align-self-center">
                            Batas akhir pembayaran
                        </div>
                        <div className="value col-lg-auto text-center text-lg-right col-12 p-2 align-self-center">
                            {res?.expiredDate ? moment(res.expiredDate).format('dddd, DD MMMM YYYY  HH:mm') : '-'}
                        </div>
                    </div>
                </div>
                <div className="card-section-2 mb-2">
                    <div className="p-2">
                        Detail pembayaran
                    </div>
                    <div className="row w-100 justify-content-between m-auto mb-2">
                        <div className=" align-self-center col-lg-auto col-12 p-2">
                            Total Pembayaran
                        </div>
                        <div className="value col-lg-auto text-center text-lg-right col-12 p-2 total">
                            {formatMoney(res?.total || 0, { symbol: "Rp ", precision: 0, thousand: ".", decimal: "," })}
                        </div>
                    </div>
                    <div className="row w-100 justify-content-between m-auto mb-2">
                        <div className=" align-self-center col-lg-auto col-12 p-2">
                            Nomor virtual account
                        </div>
                        <div className="value col-lg-auto text-center text-lg-right col-12 p-2">
                            {res?.vaNumber}
                            <span className="copy ml-1" onClick={() => copy((res?.vaNumber).toString() || '')}>
                                <img src="/images/icons/copy.svg" alt="" />
                            </span>
                        </div>
                    </div>
                    <div className="row w-100 justify-content-between m-auto mb-2">
                        <div className=" align-self-center col-lg-auto col-12 p-2">
                            Retail
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
                <div className="card-section-3">
                    <div className="p-2 firasans">
                        <h5 className='firasans'>
                            Instruksi pembayaran Retail
                        </h5>
                        {
                            res?.code === 'FT' && <ol className='px-3 intructions'>
                                <li className='firasans'>Catat dan <b>simpan kode pembayaran</b> Anda</li>
                                <li className="firasans">Datang ke Gerai Retail <b>(Alfamart, Kantor Pos, Pegadaian, & Dan-Dan)</b></li>
                                <li className="firasans">Informasikan kepada kasir akan melakukan <b>“Pembayaran Finpay”</b></li>
                                <li className="firasans">Tunjukkan dan <b>berikan Kode Pembayaran</b> ke kasir</li>
                                <li className="firasans">Lakukan pembayaran <b>sesuai nominal</b> yang diinformasikan dan <b>tunggu proses selesai</b></li>
                                <li className="firasans">Minta dan <b>simpan struk</b> sebagai <b>bukti pembayaran</b></li>
                                <li className="firasans">Pembayaran Anda kan langsung <b>terdeteksi secara otomatis</b></li>
                            </ol>
                        }
                    </div>
                </div>
            </div>
        </Spin>
    )
}