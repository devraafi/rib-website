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

export function PaymentDetailEwalletComponent(props: { res: any }) {
    const { res } = props;
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    function copy(text: string) {
        navigator && navigator.clipboard.writeText(text);
        message.success('Copied')
    }
    function onPay() {
        setLoading(true);
        new RequestService().handleRequest({
            obs: new DonationRestServices().transactionOvo(res?.lines[0].transactionId),
            successMessage: 'Pembayaran berhasil',
            onDone: () => {
                setLoading(false);
                router.push(`/detail-transaksi?id=${res?.lines[0].transactionId}`);
            },
            onError: () => {
                setLoading(false);
            }
        })
    }
    return (
        <>
            <div className="container py-3" id="donation-payment-detail">
                <div className="subtitle text-center py-2">
                    Instruksi pembayaran
                    </div>
                <div className="text-center title mb-3">
                    E Wallet - {res?.paymentName}
                </div>
                <div className="card-section-2 mb-2">
                    <div className="p-2 text-center">
                        <strong>Harap membuka aplikasi OVO untuk melanjutkan pembayaran dengan klik tombol bayar dibawah</strong>
                    </div>
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
                            E-wallet
                        </div>
                        <div className="value col-lg-auto text-center text-lg-right col-12 p-2">
                            <img style={{
                                maxWidth: '100px'
                            }} src={`/images/logos/payment-method/${res?.code}.svg`} />
                        </div>
                    </div>
                    <div className="row w-100 justify-content-between m-auto mb-2 py-3">
                        <div className="col-lg-6 p-2">
                            <Link href={`/detail-transaksi?id=${res?.lines[0].transactionId}`}>
                                <button className="btn btn-dh-outline-3 btn-block">Cek Status Pembayaran</button>
                            </Link>
                        </div>
                        <div className="col-lg-6 p-2">
                            <Spin spinning={loading}>
                                <button className="btn btn-dh-edit o btn-block" onClick={onPay}>Bayar</button>
                            </Spin>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}