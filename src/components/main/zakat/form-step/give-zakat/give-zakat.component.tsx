
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import _ from 'lodash';
import { isFormat } from './math.service';
import { Checkbox, Form, InputNumber } from 'antd';
import { IZakat } from '../../zakat';

const GiveZakat = (props: {
    step: number;
    subtotalAmount: number;
    stepChanges?: (to: number) => void;
    onFidyahChanges?: (amount: number) => void;
    onShodaqohChanges?: (amount: number) => void;
    roundUpChanges?: (amount: number) => void;
    onChangesTotal: (amount: number) => void;
    onChangesZakatManuals: (zakatManuals: IZakat[]) => void;
    manualReset: (manual: boolean) => void;
    isManual: boolean;
    checkList: any;
}) => {
    const { step, subtotalAmount, checkList } = props;
    const sodaqohValueList = [25000, 40000, 100000, 250000, 500000];
    const [fidyah, setFidyah] = useState(false);
    const [sodaqoh, setSodaqoh] = useState(false);
    const [roundValue, setRoundVal] = useState(0);
    const [valuesRoundUp, setValuesRoundUp] = useState([0, 0, 0])
    const [fidyahAmount, setFidyahAmount] = useState(0);
    const [shodaqohAmount, setShodaqohAmount] = useState(0);
    const [total, setTotal] = useState<number>(0);
    const [zakatManuals, setZakatManuals] = useState<IZakat[]>()
    const onChangesCheck = (i: number) => {
    }

    function onStepChange(to: number) {
        props.stepChanges ? props.stepChanges(to) : null;
    }
    const scrollTo = (i: number, type: string) => {
        let el;
        if (type == 'back') {
            el = document.getElementById(`zzzz-${i}`) || onStepChange(step - 1); props.manualReset && props.manualReset(false);
        } else {
            el = document.getElementById(`zzzz-${i}`) || onStepChange(step + 1);
        }
        if (el) {
            window.scrollTo(0, (el.offsetTop));
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step])

    useEffect(() => {
        // props.roundUpChanges ? props.roundUpChanges(roundValue) : '';
    }, [roundValue]);

    useEffect(() => {
        props.onFidyahChanges ? props.onFidyahChanges(fidyahAmount) : '';
    }, [fidyahAmount]);

    useEffect(() => {
        props.onShodaqohChanges ? props.onShodaqohChanges(shodaqohAmount) : '';
    }, [shodaqohAmount]);

    useEffect(() => {
        const newVal: any = [];
        setRoundVal(subtotalAmount);
        const log = _.round(isFormat(subtotalAmount));
        newVal.push(_.ceil(subtotalAmount, -(log - 2)));
        newVal.push(_.floor(subtotalAmount, -(log - 2)));
        setValuesRoundUp(newVal);
    }, [subtotalAmount]);

    function onChangeAllFields(field: any, fields: any[]) {
        const zakatManuals: IZakat[] = [];
        let total = 0;
        fields.forEach(field => {
            if (_.isNumber(field.value)) {
                total = total + field.value;
            } else {
                total = 0;
            }
            let zakatManual: IZakat = {
                zakatId: field.name[0],
                amount: _.isNumber(field.value) ? field.value : 0,
                items: []
            }
            zakatManuals.push(zakatManual);
        });
        setZakatManuals(zakatManuals);
        setTotal(total);
    }

    useEffect(() => {
        props.onChangesTotal && props.onChangesTotal(total)
    }, [total]);

    useEffect(() => {
        props.onChangesZakatManuals && props.onChangesZakatManuals(zakatManuals || [])
    }, [zakatManuals])

    return (
        <div className="give-zakat-form py-2">

            {/* <div className="the-card mb-3 -v animate__animated animate__bounceIn" id="zzzz-1">
                <div className="row w-100 py-3">
                    <div className="col-12 px-0">
                        <div className="the-total">
                            <div className="label">Total Zakat</div>
                            <div className="amount">Rp {(subtotalAmount).toLocaleString()}</div>
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

                <div className="row pb-3 w-100">
                    {valuesRoundUp && valuesRoundUp.map((val, i: number) => (
                        <div className="col-12 py-2" key={i}>
                            <div className="p-inputgroup input-group-dh">
                                <span className="p-inputgroup-addon py-3">
                                    <Checkbox
                                        id={val + 'lo'}
                                        checked={roundValue == val}
                                        onChange={() => {
                                            setRoundVal(val);
                                        }} className="checkbox-dh text">
                                    </Checkbox>
                                </span>
                                <InputNumber
                                    readonly
                                    className="w-100"
                                    inputClassName="py-3"
                                    value={val}
                                    locale="id-ID"
                                    placeholder="Rp 0"
                                    currency="IDR"
                                />
                            </div>
                        </div>
                    ))}
                    <div className="col-12 py-2">
                        <div className="p-inputgroup input-group-dh">
                            <span className="p-inputgroup-addon py-3">
                                <Checkbox
                                    className="checkbox-dh"
                                    checked={roundValue == subtotalAmount}
                                    onChange={() =>
                                        setRoundVal(subtotalAmount)
                                    } />
                            </span>
                            <InputText
                                readOnly
                                className="w-100 py-3"
                                value={`No, Keep my Zakat value as Rp ${(subtotalAmount).toLocaleString()}`}
                                locale="id-ID"
                                placeholder="Rp 0"
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
            </div> */}

            {props.isManual && <Form
                className="the-card mb-3 -v animate__animated animate__bounceIn"
                id="zzzz-1"
                onFieldsChange={(field, fields) => onChangeAllFields(field, fields)}
            >
                <div className="row w-100 py-3">

                    {
                        (checkList && _.isLength(checkList.length)) && checkList.map((list: any, i: number) => {

                            return <React.Fragment key={i}>
                                <div className={"px-2 py-2 align-self-center col-lg-6"}>
                                    <label className={"input-label w-100 field-required"}>
                                        {list.name}
                                    </label>
                                </div>
                                <div className={"px-2 py-2 align-self-center col-lg-6"}>
                                    <Form.Item
                                        className="m-0"
                                        name={_.camelCase(list._id)}
                                        rules={[{
                                            required: true,
                                            message: 'Kolom ini wajib diisi!'
                                        }]}
                                    >
                                        <InputNumber
                                            className="w-100 input-number-dh"
                                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                            parser={value => value ? value.replace(/\$\s?|(\.*)/g, '') : ''}
                                            id={_.camelCase(list._id)}
                                            placeholder="Rp 0"
                                            size="large"
                                        />
                                    </Form.Item>
                                </div>
                            </React.Fragment>
                        })
                    }
                </div>
                <div className="row w-100 py-3">
                    <div className="col-12 px-0">
                        <div className="the-total">
                            <div className="label">Total Zakat</div>
                            <div className="amount">Rp {(total).toLocaleString()}</div>
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
            </Form>}


            <div className="the-card mb-3 -v animate__animated animate__bounceIn" id={"zzzz-" + (props.isManual ? 2 : 1)}>
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
                                className="w-100 input-number-dh"
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                parser={value => value ? value.replace(/\$\s?|(\.*)/g, '') : ''}
                                placeholder="Rp 0"
                                size="large"
                                value={fidyahAmount}
                                onChange={(e: any) => setFidyahAmount(e)}
                            /> :
                                <div className="add-plus" onClick={() => setFidyah(!fidyah)}>
                                    Add +
                            </div>
                        }
                    </div>
                </div>

                <div className="text-left  px-2 w-100">
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
                                        <div onClick={() => { setShodaqohAmount(val) }} className={"card-sodaqoh " + (val == shodaqohAmount ? 'active' : '')}>
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
                                    className="w-100 input-number-dh"
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                    parser={value => value ? value.replace(/\$\s?|(\.*)/g, '') : ''}
                                    placeholder="Rp 0"
                                    size="large"
                                    value={shodaqohAmount}
                                    onChange={(e: any) => { setShodaqohAmount(e) }}
                                    readOnly
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

                <div className={"the-card-footer d-flex flex-row " + (!props.isManual ? 'justify-content-between' : 'justify-content-end')}>
                    {!props.isManual && <div >
                        <button className="btn color-back" onClick={() => scrollTo(0, 'back')} type="button">Kembali</button>
                    </div>}
                    <div>
                        <button className="btn color-back" onClick={() => { scrollTo(3, 'next'); setFidyahAmount(0); setShodaqohAmount(0) }} type="button">Lewati</button>
                        <button className="btn btn-dh-basic color-next" onClick={() => scrollTo(3, 'next')} type="submit">
                            Selanjutnya
                    <span className="ml-2">
                                <img src="/images/icons/forward-2.svg" alt="" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default GiveZakat;