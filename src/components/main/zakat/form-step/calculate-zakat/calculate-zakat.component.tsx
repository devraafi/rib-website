import React, { useEffect, useState } from "react";
import { Checkbox } from 'primereact/checkbox';
import _, { values } from "lodash";
import { Form, Input, InputNumber } from "antd";

const CalculateZakat = (props: {
    step: number,
    stepChanges?: (to: number) => void,
    zakatAmount: number,
    onChangeZakatAmount?: (amount: number) => void,
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
    }[]
}) => {
    const { step } = props;
    const [zakatList, setZakatList] = useState(props.zakatList || []);
    const [errorInfos, setErrorInfos] = useState<any>([]);
    const [forms, setForms] = useState<any>({});
    const onChangeCheck = (obj: any, val: boolean, i: number) => {
        if (zakatList.length) {
            let newState = [...zakatList]
            newState[i].checked = val;
            setZakatList(newState);
        }
    };

    const onStepChange = (to: number) => {
        props.stepChanges ? props.stepChanges(to) : null;
    }

    const scrollTo = (i: number, type: string) => {
        let el;
        if (type == 'back') {
            el = document.getElementById(`vvvv${i - 1}`) || document.getElementById(`vvvv${i - 2}`) || document.getElementById(`vvvv${i - 3}`) || document.getElementById(`vvvv${i - 4}`) || document.getElementById(`vvvv${i - 5}`) || document.getElementById(`vvvv${i - 6}`) || onStepChange(step - 1);
        } else {
            el = document.getElementById(`vvvv${i + 1}`) || document.getElementById(`vvvv${i + 2}`) || document.getElementById(`vvvv${i + 3}`) || document.getElementById(`vvvv${i + 4}`) || document.getElementById(`vvvv${i + 5}`) || document.getElementById(`vvvv${i + 6}`) || onStepChange(step + 1);
        }
        if (el) {
            window.scrollTo(0, (el.offsetTop));
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (props.zakatList && !zakatList.length) {
            setZakatList(props.zakatList);
        }
    }, [props])

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
                <div className="row">
                    {
                        zakatList && zakatList.map((list, i) => (
                            <div className="col-lg-6 col-12" key={i}>
                                <div className="d-flex flex-row">
                                    <Checkbox
                                        inputId={`Checkbox${i}`}
                                        checked={list.checked}
                                        onChange={(e) => onChangeCheck(list, e.checked, i)}
                                        className="checkbox-dh"
                                    />
                                    <label htmlFor={`Checkbox${i}`} className="p-checkbox-label align-self-center ml-2 input-label">{list.name}</label>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="the-card-footer text-center">
                    <button className="btn btn-dh-primary" onClick={() => scrollTo(-1, 'next')}>MULAI HITUNG</button>
                </div>
            </div>
            <Form.Provider
                onFormFinish={(name, info) => {
                    let errs: any = [...errorInfos];
                    for (const key in info.forms) {
                        let fail: boolean = false;
                        info.forms[key].validateFields()
                            .then(val => {
                                const form = {
                                    name,
                                    values: val,
                                    total: 0
                                };
                                for (const key in val) {
                                    form.total += val[key];
                                }
                                setForms({ ...forms, [_.camelCase(name)]: form });
                            }).catch(errorInfo => {
                                fail = true;
                                console.log('error', key);
                                errs = [...errs, key];
                                setErrorInfos(errs);
                            }).finally(() => {
                                if (!fail) {
                                    console.log('final', key);
                                    errs = [...errs]
                                    _.remove(errs, function (err) {
                                        return err == key;
                                    });
                                    setErrorInfos(errs);
                                }
                            })
                    }

                    if (!errs.length) {
                        const last: any = _.last(_.filter(zakatList, function (list) { return list.checked; }));
                        if (last && (last.name == name)) {
                            scrollTo(100, 'next');
                        }
                    }
                }}
            >
                {
                    zakatList.map((list, i: number) => {
                        const first = i == 0 ? true : false;
                        const isLast = i == (_.filter(zakatList, function (list) { return list.checked; }).length - 1) ? true : false;

                        return list.checked && (
                            <Form
                                onFinish={(values) => !isLast ? scrollTo(i, 'next') : ''}
                                name={list.name}
                                className={"the-card my-3 -v animate__animated animate__bounceIn "}
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
                                            <button className="btn btn-dh-basic color-next" type="submit">
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
                                name={_.camelCase(line.itemName)}
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