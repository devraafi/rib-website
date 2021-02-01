import React, { useEffect, useState } from "react";
import _, { values } from "lodash";
import { Checkbox, Form, Input, InputNumber } from "antd";

const CalculateZakat = (props: {
    step: number,
    stepChanges?: (to: number) => void,
    onChangesForm?: (form: any) => void,
    manualChange: (isManual: boolean) => void
    zakatList?: {
        description?: string;
        checked?: boolean;
        name?: string;
        rate?: number;
        _id: string;
        lines: {
            description?: string;
            isRequired?: string;
            itemName?: string;
        }[]
    }[];
    isManual: boolean;
    checkListChange: (val: any) => void
}) => {
    const { step } = props;
    const [zakatList, setZakatList] = useState(props.zakatList || []);
    const [checkList, setChecklist] = useState<any>([]);
    const [errorInfos, setErrorInfos] = useState<any>([]);
    const [forms, setForms] = useState<any>({});
    const [isManual, setIsManual] = useState(false);
    const [start, setStart] = useState(false);
    const [form] = Form.useForm();
    const [currentStepForm, setCurrent] = useState(0)
    const onChangeCheck = (obj: any, val: boolean, i: number) => {
        console.log(val);
        if (currentStepForm > i) {
            setCurrent(i);
        }

        let newZakatList = [...zakatList]
        const theKey = _.camelCase(newZakatList[i].name);
        const newForm = { ...forms };

        newZakatList[i].checked = val;
        setZakatList(newZakatList);

        if (!val) {
            form.setFieldsValue({
                [theKey]: [
                    {

                    }
                ]
            });
            delete newForm[theKey];
        }

        setForms(newForm);

    };

    const onStepChange = (to: number) => {
        props.stepChanges ? props.stepChanges(to) : null;
    }

    function onSubmitStep(key: string, form: any, isLast: boolean, i: number) {
        setForms({ ...forms, [_.camelCase(key)]: form });
        !isLast ? scrollTo(i, 'next') : scrollTo(0, 'skip');
    }



    const scrollTo = (i: number, type: string) => {
        let el;
        if (type !== 'skip') {
            setCurrent(i + 1)
            if (type == 'back') {
                el = document.getElementById(`vvvv${i - 1}`) || document.getElementById(`vvvv${i - 2}`) || document.getElementById(`vvvv${i - 3}`) || document.getElementById(`vvvv${i - 4}`) || document.getElementById(`vvvv${i - 5}`) || document.getElementById(`vvvv${i - 6}`) || onStepChange(step - 1);
            } else {
                el = document.getElementById(`vvvv${i + 1}`) || document.getElementById(`vvvv${i + 2}`) || document.getElementById(`vvvv${i + 3}`) || document.getElementById(`vvvv${i + 4}`) || document.getElementById(`vvvv${i + 5}`) || document.getElementById(`vvvv${i + 6}`) || onStepChange(step + 1);
            }
            if (el) {
                window.scrollTo(0, (el.offsetTop));
            }
        } else {
            onStepChange(step + 1)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    useEffect(() => {
        setChecklist(_.filter(zakatList, function (list) { return list.checked; }));
    }, [zakatList])

    useEffect(() => {
        if (props.zakatList && !zakatList.length) {
            setZakatList(props.zakatList);
        }
    }, [props]);

    useEffect(() => {
        (forms && props.onChangesForm) ? props.onChangesForm(forms) : '';
    }, [forms]);


    useEffect(() => {
        props.manualChange && props.manualChange(isManual)
    }, [isManual]);


    useEffect(() => {
        props.checkListChange && props.checkListChange(checkList)
    }, [checkList])

    return (
        <div className="calculate-zakat-form py-2">
            <div className="the-card mb-3 animate__animated animate__bounceIn" id="vvvv-1">
                <div className="text-center py-3 px-2">
                    <div className="header">
                        Pilih Zakat Anda
                    </div>
                    <div className="description">
                        Pilih jenis zakat yang ingin ditunaikan atau dibayarkan (dapat memilih lebih dari satu).
                    </div>
                </div>
                <div className="row w-100">
                    {
                        zakatList && zakatList.map((list, i) => (
                            <div className="col-lg-6 col-12" key={i}>
                                <Checkbox
                                    id={i + 'checkboxxxx'}
                                    checked={list.checked}
                                    value={list}
                                    onChange={(e) => onChangeCheck(list, e.target.checked, i)}
                                    className="checkbox-dh text">
                                    {list.name}
                                </Checkbox>
                            </div>
                        ))
                    }
                </div>
                <div className="the-card-footer text-center">
                    <button className="btn btn-dh-primary mr-2" onClick={() => { scrollTo(-1, 'next'); setStart(true) }}>MULAI HITUNG</button>
                    <button className="btn btn-dh-outline" onClick={() => { scrollTo((checkList.length - 1), 'next'); setIsManual(true); setStart(false) }}>LANGSUNG BAYAR</button>
                </div>
            </div>
            <Form.Provider>
                {
                    checkList.map((list: any, i: number) => {
                        const first = i == 0 ? true : false;
                        const isLast = i == (checkList.length - 1) ? true : false;
                        return (
                            <Form
                                scrollToFirstError
                                onFinish={(values) => {
                                    const form = {
                                        id: list?._id,
                                        rate: list?.rate,
                                        name: list?.name,
                                        values,
                                        total: 0,
                                        totalWithRate: 0,
                                        totalDebit: 0,
                                        totalCredit: 0,
                                    };
                                    for (const key in values) {
                                        const notKey = ['id', 'rate'];
                                        if (!notKey.includes(key)) {
                                            if (key.includes('CREDIT')) {
                                                form.totalCredit += values[key];
                                            }
                                            if (key.includes('DEBIT')) {
                                                form.totalDebit += values[key];
                                            }
                                        }
                                    }
                                    form.total = form.totalDebit - form.totalCredit;
                                    form.totalWithRate = form.total * (form.rate || 1);
                                    onSubmitStep(list?.name, form, isLast, i)
                                }}
                                name={list.name}
                                className={"the-card my-3 -v animate__animated animate__bounceIn " + (!start ? 'd-none' : '')}
                                id={`vvvv${i}`}
                                key={i}
                            >
                                <div className="text-left w-100 py-3 px-2">
                                    <div className="header">
                                        {list ? list.name : ''}
                                    </div>
                                    <div className="description text-left">
                                        {list ? list.description : ''}
                                    </div>
                                </div>
                                {
                                    (list.lines && list.lines.length) &&
                                    <>
                                        <FormSection
                                            initialForm={list.name}
                                            customForm={false}
                                            lines={list.lines}
                                        />
                                        <div className={`the-card-footer d-flex justify-content-${first ? 'between' : 'end'} flex-row`}>
                                            {
                                                first &&
                                                <button className="btn color-back" onClick={() => scrollTo(i, 'back')} type="button">Kembali</button>
                                            }
                                            <button title={((currentStepForm < i) && list.checked) ? 'Harap Selesaikan langkah sebelumnya' : ''} className="btn btn-dh-basic color-next" type="submit" disabled={((currentStepForm < i) && list.checked)} >
                                                Selanjutnya
                                            {
                                                    isLast ?
                                                        <span className="ml-2">
                                                            <img src="/images/icons/forward-2.svg" alt="" />
                                                        </span> :
                                                        <span className="ml-2">
                                                            <img src="/images/icons/down.svg" alt="" />
                                                        </span>
                                                }
                                            </button>
                                        </div>
                                    </>
                                }
                            </Form>
                        )
                    }
                    )
                }
            </Form.Provider>
        </div>
    )

}

interface PropsFormSection {
    lines: {
        description?: string;
        isRequired?: string;
        itemName?: string;
    }[];
    customForm: boolean;
    initialForm?: string;
}

const FormSection = (props: PropsFormSection) => {
    const { lines } = props;

    return (
        <div className="row px-3">
            {
                lines.map((line: any, i: number) => {
                    return <React.Fragment key={i}>
                        <div key={i} className={"px-2 py-2 align-self-center " + (props.customForm ? 'col-lg-3 ' : 'col-lg-6 ')}>
                            <label className={"input-label w-100 " + (line.isRequired ? 'field-required' : ' ')} htmlFor={`${_.camelCase(line.itemName)}${i}`}>{line.itemName}</label>
                        </div>
                        <div className={"px-2 py-2 align-self-center " + (props.customForm ? 'col-lg-3' : 'col-lg-6')}>
                            <Form.Item
                                className="m-0"
                                name={_.camelCase(line.itemName) + line.type}
                                rules={[{
                                    required: line.isRequired || false,
                                    message: 'Kolom ini wajib diisi!'
                                }]}
                            >
                                <InputNumber
                                    className="w-100 input-number-dh"
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                    parser={value => value ? value.replace(/\$\s?|(\.*)/g, '') : ''}
                                    id={_.camelCase(line.itemName)}
                                    placeholder="Rp 0"
                                    size="large"
                                />
                            </Form.Item>
                        </div>
                    </React.Fragment>
                })
            }
        </div>
    )
}

export default CalculateZakat;