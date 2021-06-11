import _ from "lodash";
import Link from "next/link"
import React, { useEffect } from "react"
import payment_step from './payment-data.json';
import { IPaymentDetail } from "interfaces/payment-detail";
import moment from "moment";
import { message, Spin } from "antd";
import { Loading } from "@Components/basics/loading/loading.component";
import { CommonServices } from "services/common/common.service";
import { formatMoney } from 'accounting';
import { NextSeo } from "next-seo";
import { PaymentDetailManualComponent } from "./payment-detail-manual";
import { PaymentDetailVAComponent } from "./payment-detail-va";
import { PaymentDetailEwalletComponent } from "./payment-detail-ewallet";
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
                            <PaymentDetailVAComponent res={res} /> : res?.type === 'ewallet' ? <PaymentDetailEwalletComponent res={res} /> : ''
                }
            </Spin>
        </>
    )
}