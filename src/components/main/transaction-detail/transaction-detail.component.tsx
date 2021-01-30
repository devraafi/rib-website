import MainComponent from "@Components/layout/main/main-layout.component";
import { withRouter } from "next/router"
import React from "react";

const TransactionDetail = (props: any) => {
    const { query } = props.router;


    return <MainComponent
        title="Detail Transaksi"
        description="Detail Transaksi Darul Hikam"
        pageId="transaction-detail-page-dh"
    >
        <div className="container">
            <div className="header">Detail Transaksi</div>
            <div className="row">
                <div className="col-lg-8 col-12 align-self-start">
                    <div className="card-transaction p-2">
                        <div className="d-flex flex-column w-100">
                            <div className="field">
                                <div className="label">Transaksi</div>
                                <div className="value"></div>
                            </div>
                            <div className="field">
                                <div className="label">Nama</div>
                                <div className="value"></div>
                            </div>
                            <div className="field">
                                <div className="label">Transaksi</div>
                                <div className="value"></div>
                            </div>
                            <div className="field">
                                <div className="label">Transaksi</div>
                                <div className="value"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12 align-self-start">
                    <div className="card-transaction p-2">
                        <div className="d-flex flex-column w-100">
                            <div className="field">
                                <div className="label">Bank</div>
                                <div className="value"></div>
                            </div>
                            <div className="field">
                                <div className="label">Nomor virtual account</div>
                                <div className="value"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </MainComponent>
}

export default withRouter(TransactionDetail);