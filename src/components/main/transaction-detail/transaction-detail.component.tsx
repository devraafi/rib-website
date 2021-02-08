import { Loading } from "@Components/basics/loading/loading.component";
import MainComponent from "@Components/layout/main/main-layout.component";
import { Spin } from "antd";
import _ from "lodash";
import moment from "moment";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router"
import React, { useEffect, useState } from "react";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { TransactionRestService } from "./transaction-rest.service";

const transactionRest: TransactionRestService = new TransactionRestService;
const TransactionDetailComponent = (props: WithRouterProps) => {
    const query: any = props.router.query;
    const [data, setData] = useState<ITransactionDetail>();
    const [transactionID, setTransactionID] = useState<string>();
    function loadData() {
        transactionRest.loadData(transactionID || '').pipe(
            catchError(err => {
                return throwError(err);
            })).subscribe(setData);
    }
    useEffect(() => {
        const newtransactionID: string = query ? query.order_id : null;
        setTransactionID(newtransactionID);
    }, [query]);

    useEffect(() => {
        transactionID && loadData();
    }, [transactionID])

    return <MainComponent
        title="Detail Transaksi"
        description="Detail Transaksi Darul Hikam"
        pageId="transaction-detail-page-dh"
    >
        <Spin spinning={!data} indicator={<Loading />} >
            <div className="container transaction-detail-page my-5">
                <div className="title-detail m-3 text-center text-lg-left ">Detail Transaksi</div>
                <div className="row mb-3">
                    <div className="col-lg-8 col-12 align-self-start">
                        {
                            data && data.lines.map((line, i: number) => (
                                <div className="card-transaction m-3">
                                    <div className="d-flex flex-column w-100">
                                        <div className="field">
                                            <div className="label">{_.capitalize(line.itemType) || 'Transaksi'}</div>
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
                        <div className="card-transaction m-3">
                            <div className="d-flex flex-column w-100">
                                <div className="field">
                                    <div className="label">Metode Pembayaran</div>
                                    <div className="value">{data?.paymentName || ''}</div>
                                </div>
                                <div className="field">
                                    <div className="label">Nomor virtual account</div>
                                    <div className="value">{data?.vaNumber || '-'}</div>
                                </div>
                                <div className="field">
                                    <div className="label">Jumlah</div>
                                    <div className="value total">{'Rp ' + (data?.amount || 0).toLocaleString() || 0}</div>
                                </div>
                                <div className="field">
                                    <div className="label">Status</div>
                                    <div className={"value " + (data?.status === 'PENDING' ? 'pending' : '')}>{_.capitalize(data?.status) || '-'}</div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-dh-primary btn-block" onClick={() => loadData()}>Cek Status Pembayaran</button>
                    </div>
                </div>
            </div>
        </Spin>

    </MainComponent>
}

export default withRouter(TransactionDetailComponent);