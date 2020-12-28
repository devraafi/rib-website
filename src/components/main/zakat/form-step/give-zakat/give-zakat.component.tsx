import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import _ from 'lodash';

const GiveZakat = (props: { step: number, stepChanges?: (to: number) => void, shodaqohChanges?: (amount: number) => void, fidyahChanges?: (amount: number) => void, roundUpChanges?: (amount: number) => void }) => {
    const [step, onChangeStep] = useState(props.step);
    const [checkList, onSetChecklist] = useState({
        1: false,
        2: false,
        3: false,
        4: true
    });
    const sodaqohValueList = [25000, 40000, 100000, 250000, 500000];
    const [fidyahAmount, onChangeFidyah] = useState(0);
    const [shodaqohAmount, onChangeSodaqoh] = useState(0);
    const [fidyah, setFidyah] = useState(false);
    const [sodaqoh, setSodaqoh] = useState(false);
    const [roundValue, setRoundVal] = useState(5425300);

    const valueRoundUps = [
        0, 5500000, 5400000, 5600000
    ];

    const onChangesCheck = (i: number) => {
        const forLoop = [1, 2, 3, 4]
        const newCheck: any = checkList;
        newCheck[i] = !newCheck[i];
        _.forEach(forLoop, function (lop, key) {
            if (lop !== i) {
                newCheck[lop] = false;
            }
            if (newCheck[lop]) {
                setRoundVal(valueRoundUps[lop]);
                props.roundUpChanges ? props.roundUpChanges(valueRoundUps[lop]) : '';
            }
        });

        onSetChecklist(newCheck)
    }

    const onStepChange = (to: number) => {
        props.stepChanges ? props.stepChanges(to) : null;
    }
    const scrollTo = (i: number, type: string) => {
        let el;
        if (type == 'back') {
            el = document.getElementById(`zzzz-${i}`) || onStepChange(step - 1);
        } else {
            el = document.getElementById(`zzzz-${i}`) || onStepChange(step + 1);
        }
        if (el) {
            window.scrollTo(0, (el.offsetTop));
        }
    }

    useEffect(() => {
        props.roundUpChanges ? props.roundUpChanges(roundValue) : '';
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="give-zakat-form py-2">

            <div className="the-card mb-3 -v animate__animated animate__bounceIn" id="zzzz-1">
                <div className="row w-100 py-3">
                    <div className="col-12 px-0">
                        <div className="the-total">
                            <div className="label">Total Zakat</div>
                            <div className="amount">Rp 5.320.000</div>
                        </div>
                    </div>
                </div>
                <div className="text-left py-3 px-2 w-100">
                    <div className="header">
                        Bulatkan perhitungan Zakat
                    </div>
                    <div className="description text-left">
                        Anda dapat memilih satu jumlah pembulatan Zakat dari beberapa opsi dibawah ini.
                    </div>
                </div>

                <div className="row pb-3">
                    <div className="col-12 py-2">
                        <div className="p-inputgroup input-group-dh">
                            <span className="p-inputgroup-addon py-3">
                                <Checkbox className="checkbox-dh" checked={checkList[1]} onChange={() => onChangesCheck(1)} />
                            </span>
                            <InputNumber
                                readonly
                                className="w-100"
                                inputClassName="py-3"
                                value={valueRoundUps[1]}
                                mode="currency"
                                locale="id-ID"
                                placeholder="Rp 0,00"
                                currency="IDR"
                            />
                        </div>
                    </div>
                    <div className="col-12 py-2">
                        <div className="p-inputgroup input-group-dh">
                            <span className="p-inputgroup-addon py-3">
                                <Checkbox className="checkbox-dh" checked={checkList[2]} onChange={() => onChangesCheck(2)} />
                            </span>
                            <InputNumber
                                readonly
                                className="w-100"
                                inputClassName="py-3"
                                value={valueRoundUps[2]}
                                mode="currency"
                                locale="id-ID"
                                placeholder="Rp 0,00"
                                currency="IDR"
                            />
                        </div>
                    </div>
                    <div className="col-12 py-2">
                        <div className="p-inputgroup input-group-dh">
                            <span className="p-inputgroup-addon py-3">
                                <Checkbox className="checkbox-dh" checked={checkList[3]} onChange={() => onChangesCheck(3)} />
                            </span>
                            <InputNumber
                                readonly
                                className="w-100"
                                inputClassName="py-3"
                                value={valueRoundUps[3]}
                                mode="currency"
                                locale="id-ID"
                                placeholder="Rp 0,00"
                                currency="IDR"
                            />
                        </div>
                    </div>
                    <div className="col-12 py-2">
                        <div className="p-inputgroup input-group-dh">
                            <span className="p-inputgroup-addon py-3">
                                <Checkbox className="checkbox-dh" checked={checkList[4]} onChange={() => onChangesCheck(4)} />
                            </span>
                            <InputText
                                readOnly
                                className="w-100 py-3"
                                value={`No, Keep my Zakat value as Rp 5,425,300`}
                                mode="currency"
                                locale="id-ID"
                                placeholder="Rp 0,00"
                                currency="IDR"
                            />
                        </div>
                    </div>
                </div>

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


            <div className="the-card mb-3 -v animate__animated animate__bounceIn" id="zzzz-2">
                <div className="text-left px-2 w-100">
                    <div className="header">
                        Fidyah/Kaffarah
                    </div>
                    <div className="description text-left w-100">
                    Tambah pembayaran Fidyah maupun Kaffarah Anda disini
                    </div>
                </div>

                <div className="d-flex flex-row justify-content-between w-100 px-2 py-3  my-3 fidyah-section">
                    <div className="align-self-center">
                        Fidyah/Kaffarah
                    </div>
                    <div className="align-self-center">
                        {
                            fidyah ? <InputNumber
                                inputClassName="input-dh"
                                readonly
                                className="w-100"
                                value={fidyahAmount}
                                onChange={(e) => { onChangeFidyah(e.value); props.fidyahChanges ? props.fidyahChanges(e.value) : '' }}
                                mode="currency"
                                locale="id-ID"
                                placeholder="Rp 0,00"
                                currency="IDR"
                            /> :
                                <div className="add-plus" onClick={() => setFidyah(!fidyah)}>
                                    Add +
                            </div>
                        }
                    </div>
                </div>

                <div className="text-left  px-2">
                    <div className="header">
                        Sadaqah
                    </div>
                    <div className="description text-left">
                       Tambah pembayaran Sodaqoh Anda disini
                    </div>
                </div>

                {
                    sodaqoh ?
                        <div className="d-flex flex-row flex-wrap justify-content-between w-100 my-3 px-2 py-2">
                            {
                                sodaqohValueList.map((val, key) => (
                                    <div className="px-2" key={key}>
                                        <div onClick={() => { onChangeSodaqoh(val); props.shodaqohChanges ? props.shodaqohChanges(val) : ''; }} className={"card-sodaqoh " + (val == shodaqohAmount ? 'active' : '')}>
                                            <div className="d-flex flex-column">
                                                <div className="align-self-start mb-2">
                                                    <div className="circle-rp">Rp</div>
                                                </div>
                                                <div className="align-self-end pl-3">
                                                    {(val).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="w-100 mt-3">
                                <InputNumber
                                    inputClassName="input-dh input-dh-sodaqoh py-3 text-right"
                                    readonly
                                    className="w-100"
                                    value={shodaqohAmount}
                                    onChange={e => { onChangeSodaqoh(e.value); props.shodaqohChanges ? props.shodaqohChanges(e.value) : ''; }}
                                    mode="currency"
                                    locale="id-ID"
                                    placeholder="enter amount"
                                    currency="IDR"
                                />
                            </div>
                        </div>
                        :
                        <div className="d-flex flex-row justify-content-between w-100 my-3 px-2 py-2">
                            <div className="align-self-center">
                                Shadaqah
                            </div>
                            <div className="align-self-center">
                                <div className="add-plus" onClick={() => setSodaqoh(!sodaqoh)}>
                                    Add +
                                </div>
                            </div>
                        </div>
                }

                <div className="the-card-footer d-flex justify-content-end flex-row">
                    <button className="btn color-back" onClick={() => scrollTo(3, 'next')} type="button">Lewati</button>
                    <button className="btn btn-dh-basic color-next" onClick={() => scrollTo(3, 'next')} type="submit">
                        Selanjutnya
                    <span className="ml-2">
                            <img src="/images/icons/forward-2.svg" alt="" />
                        </span>
                    </button>
                </div>
            </div>


        </div>
    )
}

export default GiveZakat;