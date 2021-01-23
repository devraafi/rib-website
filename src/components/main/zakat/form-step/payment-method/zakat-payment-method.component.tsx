import _ from "lodash";
import { InputSwitch } from "primereact/inputswitch";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";

const ZakatPaymetMethod = (props: {
    step: number;
    stepChanges?: (to: number) => void;
    onChangeCustomerInfo?: (val: {
        fullName: string,
        notes: string,
        phoneOrEmail: string,
        showAsAnonymous: boolean
    }) => void
}) => {
    let userInfo: any = typeof window !== 'undefined' ? localStorage.getItem('userinfo') : null;

    const { step } = props;
    const [paymentMethod, selectPayment] = useState('');
    const [messagesDoa, onChangeMsgDoa] = useState('');

    const [customerInfo, setCustomerInfo] = useState({
        fullName: _.get(localStorage.getItem('userinfo'), 'user.fullName'),
        notes: '',
        phoneOrEmail: _.get(localStorage.getItem('userinfo'), 'user.email'),
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

    const paymentMethods = [
        {
            type: 'Bank Virtual Account',
            list: ['BCA', 'Mandiri', 'BNI', 'BRI']
        },
        {
            type: 'e-Wallet',
            list: ['OVO', 'gopay', 'dana', 'shopeepay', 'linkaja']
        }
    ];

    useEffect(() => {
        props.onChangeCustomerInfo ? props.onChangeCustomerInfo(customerInfo) : null
    }, [customerInfo])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step])


    useEffect(() => {
        userInfo = JSON.parse(userInfo || '');
        setCustomerInfo({
            ...customerInfo,
            fullName: (userInfo && userInfo.user) ? userInfo.user.fullName : '',
            phoneOrEmail: (userInfo && userInfo.user) ? userInfo.user.email : ''
        })
    }, [userInfo])

    return (

        <div className="payment-method-zakat-form">
            <div className="the-card mb-3 -v animate__animated animate__bounceIn" id="gggg-1">
                <div className="personal-data text-center py-3 px-2 w-100">
                    <div className="header">
                        Isi data diri
                    </div>
                    <div className="description">
                        Masuk atau lengkapi data di bawah ini
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
                                placeholder="Nomor ponsel atau email"
                                name="" id=""
                                className="form-control"
                                value={customerInfo.phoneOrEmail}
                                onChange={(e: any) => { setCustomerInfo({ ...customerInfo, phoneOrEmail: e.target.value }); }}
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
                    <button className="btn btn-dh-basic color-next" onClick={() => scrollTo(2, 'next')} type="submit">
                        Selanjutnya
                    <span className="ml-2">
                            <img src="/images/icons/down.svg" alt="" />
                        </span>
                    </button>
                </div>
            </div>

            {/* <div className="the-card mb-3 -v animate__animated animate__bounceIn" id="gggg-2">
                <div className="text-left px-2">
                    <div className="header">
                        Pilih metode pembayaran
                    </div>
                </div>
                <div className="d-flex flex-column">
                    {
                        paymentMethods.map((pm, i) => {
                            return (
                                <div className="row" key={i}>
                                    <div className="col-12 sub-header py-2">
                                        {pm.type}
                                    </div>
                                    {
                                        pm.list.map((l, i) => {
                                            return (
                                                <div key={i} className="col-lg-4 col-6 p-2" onClick={() => selectPayment(l)}>
                                                    <div className={'payment-box ' + (paymentMethod == l ? 'active' : '')}>
                                                        <img src={`/images/logos/payment/${l.toLocaleLowerCase()}.svg`} className="img-fluid" alt="" />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className="the-card-footer border-0">
                    <button className="btn btn-dh-secondary rounded btn-block" onClick={() => scrollTo(3, 'next')}>
                        Lanjut ke pembayaran
                    </button>
                </div>
            </div> */}
        </div>
    )
}

export default ZakatPaymetMethod;