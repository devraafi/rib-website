import { Loading } from "@Components/basics/loading/loading.component";
import MainComponent from "@Components/layout/main/main-layout.component";
import { Spin } from "antd";
import { capitalize } from "lodash";
import moment from "moment";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router"
import React, { useEffect, useState } from "react";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "services/auth/aut.service";
import { TransactionRestService } from "./transaction-rest.service";
const auth: AuthenticationService = new AuthenticationService;
const transactionRest: TransactionRestService = new TransactionRestService(process.env.staging || '', auth.axiosInterceptors);
const TransactionDetailComponent = (props: WithRouterProps) => {
    const query: any = props.router.query;
    const { manual } = query;
    const [data, setData] = useState<ITransactionDetail>();
    const [transactionID, setTransactionID] = useState<string>();
    const [loading, setLoading] = useState<boolean>();
    function loadData() {
        setLoading(true);
        transactionRest.loadData(transactionID || '').pipe(
            catchError(err => {
                return throwError(err);
            })).subscribe((res) => { setData(res); setLoading(false); });
    }


    useEffect(() => {
        const newtransactionID: string = query ? (query.merchantOrderId || query.id) : null;

        setTransactionID(newtransactionID);
    }, [query]);

    useEffect(() => {
        transactionID && loadData();
    }, [transactionID]);

    useEffect(() => {
        data && import("react-facebook-pixel")
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.init('809047500028527');
                ReactPixel.fbq('track', 'Lead');
                ReactPixel.fbq('track', 'Purchase', {
                    program_name: data?.lines[0].itemName || '-',
                    value: data?.amount,
                    currency: 'Rp '
                })
            });
    }, [data])

    return <MainComponent
        title="Detail Transaksi | Ruang Insan Berbagi"
        description="Detail Transaksi Ruang Insan Berbagi"
        pageId="transaction-detail-page-dh"
    >
        <Spin spinning={loading} indicator={<Loading />} >
            <div className="container transaction-detail-page my-5">
                <div className="title-detail m-3 text-center text-lg-left ">Detail Transaksi</div>
                <div className="row mb-lg-3">
                    <div className="col-lg-8 col-12 align-self-start">
                        {
                            data && data.lines.map((line, i: number) => (
                                <div className="card-transaction m-lg-3 mb-2">
                                    <div className="d-flex flex-column w-100">
                                        <div className="field">
                                            <div className="label">{capitalize(line.itemType) || 'Transaksi'}</div>
                                            <div className="value">{line.itemName || '-'}</div>
                                        </div>
                                        <div className="field">
                                            <div className="label">Nama</div>
                                            <div className="value">{line.donorName || '-'}</div>
                                        </div>
                                        <div className="field">
                                            <div className="label">ID Transaksi</div>
                                            <div className="value">{line.transactionId || '-'}</div>
                                        </div>
                                        <div className="field">
                                            <div className="label">Tanggal Transaksi</div>
                                            <div className="value">{line.transactionDate ? moment(line.transactionDate).format('DD MMMM YYYY') : '-'}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-lg-4 col-12 align-self-start">
                        <div className="card-transaction m-lg-3 mb-2 w-100">
                            <div className="d-flex flex-column w-100">
                                <div className="field">
                                    <div className="label">Metode Pembayaran</div>
                                    <div className="value">{data?.paymentName || ''}</div>
                                </div>
                                <div className="field">
                                    <div className="label">{manual && !data?.vaNumber ? 'Nomor Rekening' : 'Nomor virtual account'}</div>
                                    <div className="value">{data?.accountNumber || data?.vaNumber || '-'}</div>
                                </div>
                                <div className="field">
                                    <div className="label">Jumlah</div>
                                    <div className="value total">{'Rp ' + (data?.total || 0).toLocaleString() || 0}</div>
                                </div>
                                <div className="field">
                                    <div className="label">Status</div>
                                    <div className={"value " + (data?.status === 'PENDING' ? 'pending' : 'status')}>{capitalize(data?.status) || '-'}</div>
                                </div>
                            </div>
                        </div>
                        <div className="m-lg-3 mb-2 w-100">
                            <button className="btn btn-dh-primary btn-block" onClick={() => loadData()}>Cek Status Pembayaran</button>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>

    </MainComponent>
}

export default withRouter(TransactionDetailComponent);