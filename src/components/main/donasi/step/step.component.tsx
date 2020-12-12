import Link from 'next/link';
import React, { useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
const Step = (props: { step: number }) => {
    console.log(props);

    const [step, setStep] = useState(props.step);
    const [anonim, setAnonim] = useState(true);
    return (
        <React.Fragment>
            <div className="container step py-5">
                <div className="header">
                    Isi Data Diri
                </div>
                <div className="sub-header py-3 text-center">
                    <Link href="/">
                        <a href="" className="mr-1">
                            <span className="link">Masuk</span>
                        </a>
                    </Link>
                            atau lengkapi data di bawah ini
                </div>
                <div>
                    <div className="form-group">
                        <input type="text" disabled={anonim} placeholder="Nama Lengkap" name="" id="" className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="text" disabled={anonim} placeholder="Nomor ponsel atau email" name="" id="" className="form-control" />
                    </div>
                    <div className="form-group">
                        <div className="d-flex flex-row justify-content-between">
                            <label className="label-input">Sembunyikan nama saya (Anonim)</label>
                            <div className="">
                                <InputSwitch className="dh-switch" checked={anonim} onChange={(e) => setAnonim(e.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label-input" htmlFor="">Tulis catatan (opsional)</label>
                        <textarea className="form-control" placeholder="Beri doa, dan dukunganmu disini" name="" id="" cols={30} rows={10}></textarea>
                    </div>
                    <div className="form-group w-50 m-auto">
                        <button className="btn btn-dh-secondary rounded w-100">Lanjutkan</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Step;