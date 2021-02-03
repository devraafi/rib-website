import AccontManagementsComponent from "@Components/main/account-managements/account-managements.component";
import { Modal } from "antd";
import { IPaymentMethod } from "interfaces/payment-method";
import _ from "lodash";
import { InputSwitch } from "primereact/inputswitch";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { PaymentMethodRest } from "services/rest/payment-method.rest.service";
const paymentRest: PaymentMethodRest = new PaymentMethodRest;

const ZakatPaymetMethod = (props: {
    step: number;
    stepChanges?: (to: number) => void;
    onChangeCustomerInfo?: (val: {
        fullName: string,
        notes: string,
        phone: string,
        email: string,
        showAsAnonymous: boolean
    }) => void;
    done?: () => void;
    selectPayment?: (paymentMethod: IPaymentMethod) => void;
}) => {
    const local: any = (typeof window !== 'undefined') ? localStorage : null;
    function getItem() {
        const userInfo = local && local.getItem('userinfo');
        if (userInfo) {
            return JSON.parse(userInfo)
        } else {
            return null
        }
    }

    const { step } = props;
    const [messagesDoa, onChangeMsgDoa] = useState('');
    const [paymentMethod, selectPayment] = useState<IPaymentMethod>();
    const [paymentMethodList, setListPaymentMethods] = useState<IPaymentMethod[]>();
    const [modalLogin, setmodalLogin] = useState<boolean>();
    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        notes: '',
        phone: '',
        email: '',
        showAsAnonymous: false
    });

    const scrollTo = (i: number, type: string) => {
        let el;
        if (type == 'back') {
            el = document.getElementById(`gggg-${i}`) || onStepChange(step - 1);
        } else {
            el = document.getElementById(`gggg-${i}`) || onStepChange(4);
        }
        if (el) {
            window.scrollTo(0, (el.offsetTop));
        }
    }

    const onStepChange = (to: number) => {
        props.stepChanges ? props.stepChanges(to) : null;
    }

    useEffect(() => {
        props.onChangeCustomerInfo ? props.onChangeCustomerInfo(customerInfo) : null
    }, [customerInfo])

    useEffect(() => {
        window.scrollTo(0, 0);
        paymentRest.loadPayment().pipe(
            catchError((err) => throwError(err))
        )
            .subscribe((response: any) => setListPaymentMethods(response.data));
    }, [step]);


    useEffect(() => {
        paymentMethod && props.selectPayment ? props.selectPayment(paymentMethod) : '';
    }, [paymentMethod]);

    function patchFormLocal() {
        setCustomerInfo({
            ...customerInfo,
            fullName: (getItem() && getItem().user) ? getItem().user.fullName : '',
            email: (getItem() && getItem().user) ? getItem().user.email : ''
        });
    }

    useEffect(() => {
        patchFormLocal();
    }, [local]);

    return (

        <div className="payment-method-zakat-form">
            <div className="the-card mb-3 -v animate__animated animate__bounceIn" id="gggg-1">
                <div className="personal-data text-center py-3 px-2 w-100">
                    <div className="header">
                        Isi data diri
                    </div>
                    <div className="description">
                        {
                            ((getItem() && !getItem().user)) &&
                            <span className="mr-1">
                                <a className="mr-1" onClick={() => setmodalLogin(true)}>
                                    Masuk
                                </a>
                             atau
                        </span>
                        }
                        Lengkapi data di bawah ini
                    </div>
                    <div className="d-flex flex-column py-3">
                        <div className="form-group">
                            <input
                                type="text"
                                disabled={customerInfo.showAsAnonymous}
                                placeholder="Nama Lengkap"
                                name=""
                                id=""
                                className="form-control"
                                value={customerInfo.fullName}
                                onChange={(e: any) => { setCustomerInfo({ ...customerInfo, fullName: e.target.value }); }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text" disabled={customerInfo.showAsAnonymous}
                                placeholder="Nomor ponsel"
                                name="" id=""
                                className="form-control"
                                value={customerInfo.phone}
                                onChange={(e: any) => { setCustomerInfo({ ...customerInfo, phone: e.target.value }); }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text" disabled={customerInfo.showAsAnonymous}
                                placeholder="Email"
                                name="" id=""
                                className="form-control"
                                value={customerInfo.email}
                                onChange={(e: any) => { setCustomerInfo({ ...customerInfo, email: e.target.value }); }}
                            />
                        </div>
                        {/* <div className="form-group">
                            <div className="d-flex flex-row justify-content-between">
                                <label className="label-input">Sembunyikan nama saya (Anonim)</label>
                                <div className="">
                                    <InputSwitch className="dh-switch"
                                        checked={customerInfo.showAsAnonymous}
                                        onChange={(e: any) => { setCustomerInfo({ ...customerInfo, showAsAnonymous: e.target.value }); onChangeCustomerInfo() }}
                                    />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                {/* <div className="message-doa text-left py-3 px-2 w-100">
                    <div className="header">
                        Pesan dan Doa
                    </div>
                    <div className="description text-left">
                    </div>
                    <div className="row w-100">
                        <div className="col-12 py-2">
                            <InputTextarea placeholder="Tulis pesan, harapan atau do’a disini jika ada" className="input-dh w-100" rows={5} cols={30} value={messagesDoa} onChange={(e: any) => onChangeMsgDoa(e.target.value)} autoResize />
                        </div>
                    </div>
                </div> */}

                <div className="the-card-footer d-flex justify-content-between flex-row">
                    <button className="btn color-back" onClick={() => scrollTo(0, 'back')} type="button">Kembali</button>
                    <button className="btn btn-dh-basic color-next" disabled={(customerInfo.phone || customerInfo.email) ? false : true} onClick={() => scrollTo(2, 'next')} type="submit">
                        Selanjutnya
                    <span className="ml-2">
                            <img src="/images/icons/down.svg" alt="" />
                        </span>
                    </button>
                </div>
            </div>

            <div className="the-card mb-3 -v animate__animated animate__bounceIn" id="gggg-2">
                <div className="text-left px-2">
                    <div className="header">
                        Pilih metode pembayaran
                    </div>
                </div>
                <div className="d-flex flex-column w-100">
                    {
                        // paymentMethods.map((pm, i) => {
                        //     return (
                        <div className="row" >
                            {/* <div className="col-12 sub-header py-2">
                                        {pm.type}
                                    </div> */}
                            {
                                (paymentMethodList && _.isLength(paymentMethodList.length)) ? paymentMethodList.map((l, i) => {
                                    return (
                                        <div key={i} className="col-lg-4 col-6 p-2" onClick={() => selectPayment(l)}>
                                            <div className={'payment-box ' + (paymentMethod == l ? 'active' : '')}>
                                                <img src={`/images/logos/payment/${l.code.toLocaleLowerCase()}.svg`} className="img-fluid" alt="" />
                                            </div>
                                        </div>
                                    )
                                }) :
                                    <div className="col-12 p-3 text-center">
                                        Maaf, belum ada pilihan metode pembayaran
                                    </div>
                            }
                        </div>
                        //     )
                        // })
                    }
                </div>
                <div className="the-card-footer border-0">
                    <button disabled={!paymentMethod} className="btn btn-dh-secondary rounded btn-block" onClick={() => props.done && props.done()}>
                        Lanjut ke pembayaran
                    </button>
                </div>
            </div>
            <Modal
                title=""
                footer={null}
                visible={modalLogin}
                className="modal-login"
                width="fit-content"
                onCancel={() => setmodalLogin(false)}
                closeIcon={<div className="close-circle">
                    <img src="/images/icons/close.svg" alt="" />
                </div>}
            >
                <AccontManagementsComponent className="m-h-auto" page="login" onSuccess={() => { patchFormLocal(); setmodalLogin(false) }} />
            </Modal>
        </div>
    )
}

export default ZakatPaymetMethod;