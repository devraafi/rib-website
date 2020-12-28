import React, { useEffect, useState } from "react";
import { Checkbox } from 'primereact/checkbox';
import { ErrorMessage, Field, FieldArray, Form, Formik, useFormik } from "formik";
import { InputNumber } from 'primereact/inputnumber';
import _ from "lodash";
import { Controller, useForm } from "react-hook-form";

const checkDefault = [
    {
        label: "Penghasilan (Maal)",
        isShow: false,
        disabled: false,
        description: "Enter the amount of cash you have including money in your bank account(s), whatever the source (e.g. salary, rental income, benefits etc.).",
        initialForm: "zakatMall",
        forms: [
            {
                label: 'Penghasilan (Maal)',
                type: 'number',
                name: 'monthlyIncome'
            },
            {
                label: 'Penghasilan lain-lain saya perbulan',
                type: 'number',
                name: 'otherIncome'
            },
            {
                label: 'Uang Tunai',
                type: 'number',
                name: 'cashIncome'
            },
            {
                label: 'Tabungan',
                type: 'number',
                name: 'savings'
            },
            {
                label: 'Giro',
                type: 'number',
                name: 'giro'
            },
            {
                label: 'Bonus',
                type: 'number',
                name: 'bonus'
            },
            {
                label: 'THR',
                type: 'number',
                name: 'thr'
            },
            {
                label: 'Deposito',
                type: 'number',
                name: 'deposito'
            },
        ]
    },
    {
        label: "Pertanian",
        isShow: false,
        disabled: true,
        description: "",
        initialForm: "zakatPertanian",
    },
    {
        label: "Pertambangan",
        isShow: false,
        disabled: true,
        description: "",
        initialForm: "zakatPertambangan",
    },
    {
        label: "Emas dan Perak",
        isShow: false,
        disabled: false,
        description: "If you’re not sure how much your gold and silver is worth you can enter the weight in grams. One tola is equal to 11.7 grams.",
        initialForm: "zakatEmas",
        forms: [
            {
                label: 'Emas',
                type: 'number',
                name: 'gold'
            },
            {
                label: 'Perak',
                type: 'number',
                name: 'silver'
            },
        ]
    },
    {
        label: "Kendaraan, rumah, aset lain",
        isShow: false,
        disabled: false,
        description: "For long-term debts (e.g. mortgage), payments and bills, only enter amounts that are either due now or overdue (e.g. arrears). For businesses, any tax liabilities in relation to a prior financial year that are still to be paid can also be deducted.",
        initialForm: "zakatKendaraan",
        forms: [
            {
                label: 'Kendaraan',
                type: 'number',
                name: 'vehicle'
            },
            {
                label: 'Rumah',
                type: 'number',
                name: 'home'
            },
            {
                label: 'Aset lainnya',
                type: 'number',
                name: 'otherAssets'
            },
        ]
    },
    {
        label: "Jumlah hutang/cicilan",
        isShow: false,
        disabled: false,
        customForm: true,
        description: "For long-term debts (e.g. mortgage), payments and bills, only enter amounts that are either due now or overdue (e.g. arrears). For businesses, any tax liabilities in relation to a prior financial year that are still to be paid can also be deducted.",
        initialForm: "perhutangan",
        forms: [
            {
                label: 'Mortgage',
                type: 'number',
                name: 'mortgage'
            },
            {
                label: 'Personal Loans',
                type: 'number',
                name: 'personalLoans'
            },
            {
                label: 'creditCard',
                type: 'number',
                name: 'creditCard'
            },
            {
                label: 'Utility bills',
                type: 'number',
                name: 'utilityBills'
            },
            {
                label: 'Overdraft',
                type: 'number',
                name: 'overDraft'
            },
            {
                label: 'Liabilities',
                type: 'number',
                name: 'liabilities'
            },
        ]
    },
];

const CalculateZakat = (props: { step: number, stepChanges?: (to: number) => void, zakatAmount: number, onChangeZakatAmount?: (amount: number) => void }) => {
    const [step, onChangeStep] = useState(props.step);
    const [defaultChecked, onChange] = useState(checkDefault);
    const [amount, synZakatAmount] = useState(props.zakatAmount);

    const onChangeCheck = (obj: any, val: boolean, i: number) => {
        if (defaultChecked.length) {
            let newState = [...defaultChecked]
            newState[i].isShow = val;
            onChange(newState);
        }
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
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
    }, [])

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
                        defaultChecked.map((check, i) => (
                            <div className="col-lg-6 col-12" key={i}>
                                <div className="d-flex flex-row">
                                    <Checkbox
                                        disabled={check.disabled}
                                        inputId={`Checkbox${i}`}
                                        checked={check.isShow}
                                        onChange={(e) => onChangeCheck(check, e.checked, i)}
                                        className="checkbox-dh"
                                    />
                                    <label htmlFor={`Checkbox${i}`} className="p-checkbox-label align-self-center ml-2 input-label">{check.label}</label>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="the-card-footer text-center">
                    <button className="btn btn-dh-primary" onClick={() => scrollTo(-1, 'next')}>MULAI HITUNG</button>
                </div>
            </div>
            {
                _.filter(defaultChecked, function (o: any) { return o.isShow; }).map((check: any, i: number) => {
                    const firts = i == 0 ? true : false;
                    const last = i == (_.filter(defaultChecked, function (o: any) { return o.isShow; }).length - 1) ? true : false;
                    return (
                        <div className="the-card my-3 -v animate__animated animate__bounceIn" id={`vvvv${i}`} key={i}>
                            <div className="text-left w-100 py-3 px-2">
                                <div className="header">
                                    {check.label}
                                </div>
                                <div className="description text-left">
                                    {check.description}
                                </div>
                            </div>
                            {
                                (check.forms && check.forms.length) && <FormSection initialForm={check.initialForm} onChangeZakatAmount={(val) => props.onChangeZakatAmount ? props.onChangeZakatAmount(val) : console.log(val)
                                } first={firts} last={last} customForm={check.customForm || false} onScroll={(i, type) => scrollTo(i, type)} form={check.forms} index={i} />
                            }
                        </div>
                    )
                }
                )
            }
        </div>
    )

}

const mapingForm = (forms: any) => {
    const newForms = forms;
    const initialFormValues: any = {

    };
    _.forEach(newForms, function (value: any) {
        initialFormValues[value.name] = null
    });

    return initialFormValues;
};

interface FormSection {
    first: boolean;
    last: boolean;
    index: number;
    form: any;
    customForm: boolean;
    onScroll?: (i: number, type: string) => void;
    onChangeZakatAmount?: (amount: number) => void;
    initialForm?: string;
}

const FormSection = (props: FormSection) => {
    const key: any = props.initialForm;
    const form = mapingForm(props.form);
    const [summary, setSummary] = useState({});
    const index = props.index;
    const { register, handleSubmit, control } = useForm<any>();

    useEffect(() => {
        console.log('changes');

    }, [summary])

    const onSubmit = (data: any) => {
        
        props.onScroll ? props.onScroll(index, 'next') : null;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <div className="row px-3">
                {
                    props.form.map((form: any, i: number) => {
                        register({
                            name: form.name
                        });
                        return <>
                            <div key={i} className={"px-2 py-2 align-self-center " + (props.customForm ? 'col-lg-3' : 'col-lg-6')}>
                                <label className="input-label w-100" htmlFor={`${form.name}${i}`}>{form.label}</label>
                            </div>
                            <div className={"px-2 py-2 align-self-center " + (props.customForm ? 'col-lg-3' : 'col-lg-6')}>
                                <Controller
                                    name={form.name}
                                    control={control}
                                    render={f =>
                                        <InputNumber
                                            inputClassName="input-dh text-right w-100"
                                            className="w-100"
                                            value={f.value}
                                            onChange={e => f.onChange(e.value)}
                                            mode="currency"
                                            locale="id-ID"
                                            placeholder="Rp 0,00"
                                            currency="IDR"
                                        />}
                                />
                            </div>
                        </>
                    }
                    )
                }
            </div>
            <div className={`the-card-footer d-flex justify-content-${props.first ? 'between' : 'end'} flex-row`}>
                {
                    props.first &&
                    <button className="btn color-back" onClick={() => props.onScroll ? props.onScroll(index, 'back') : null} type="button">Kembali</button>
                }
                <button className="btn btn-dh-basic color-next" type="submit">
                    Selanjutnya
                    {
                        props.last ?
                            <span className="ml-2">
                                <img src="/images/icons/forward-2.svg" alt="" />
                            </span> :
                            <span className="ml-2">
                                <img src="/images/icons/down.svg" alt="" />
                            </span>
                    }
                </button>
            </div>
        </form>
    )
}

export default CalculateZakat;