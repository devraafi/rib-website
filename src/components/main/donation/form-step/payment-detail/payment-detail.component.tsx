import _ from "lodash";
import React, { useEffect } from "react"
import { Spin } from "antd";
import { Loading } from "@Components/basics/loading/loading.component";
import { CommonServices } from "services/common/common.service";
import { NextSeo } from "next-seo";
import { PaymentDetailManualComponent } from "./payment-detail-manual";
import { PaymentDetailVAComponent } from "./payment-detail-va";
import { PaymentDetailEwalletComponent } from "./payment-detail-ewallet";
import { PaymentDetailRetailComponent } from "./payment-detail-retail";
const { getPaymentImageSrc } = new CommonServices;
export const DonasiPaymentDetail = (props: { res: any }) => {
    const { res } = props;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <NextSeo
                title={'Intruksi Pembayaran'}
            />
            <Spin spinning={!res} indicator={<Loading />}>
                {
                    res?.type === 'manual' ?
                        <PaymentDetailManualComponent res={res} />
                        : res?.type === 'va' ?
                            <PaymentDetailVAComponent res={res} /> : res?.type === 'ewallet' ? <PaymentDetailEwalletComponent res={res} /> : res?.type === 'other' ? <PaymentDetailRetailComponent res={res} /> : ''
                }
            </Spin>
        </>
    )
}