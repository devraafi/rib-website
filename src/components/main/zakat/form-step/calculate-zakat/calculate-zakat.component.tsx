import React, { useEffect, useState } from "react";
import { Checkbox } from 'primereact/checkbox';
import Link from "next/link";

const checkDefault = [
    {
        label: "Penghasilan (Maal)",
        isShow: false,
        disabled: false,
        description: "Enter the amount of cash you have including money in your bank account(s), whatever the source (e.g. salary, rental income, benefits etc.)."
    },
    {
        label: "Pertanian",
        isShow: false,
        disabled: false,
        description: ""
    },
    {
        label: "Pertambangan",
        isShow: false,
        disabled: false,
        description: ""
    },
    {
        label: "Emas dan Perak",
        isShow: false,
        disabled: false,
        description: "If you’re not sure how much your gold and silver is worth you can enter the weight in grams. One tola is equal to 11.7 grams."
    },
    {
        label: "Kendaraan, rumah, aset lain",
        isShow: false,
        disabled: false,
        description: "For long-term debts (e.g. mortgage), payments and bills, only enter amounts that are either due now or overdue (e.g. arrears). For businesses, any tax liabilities in relation to a prior financial year that are still to be paid can also be deducted."
    },
    {
        label: "Jumlah hutang/cicilan",
        isShow: false,
        disabled: false,
        description: "For long-term debts (e.g. mortgage), payments and bills, only enter amounts that are either due now or overdue (e.g. arrears). For businesses, any tax liabilities in relation to a prior financial year that are still to be paid can also be deducted."
    },
];
const CalculateZakat = () => {
    const [defaultChecked, onChange] = useState(checkDefault);

    const onChangeCheck = (obj: any, val: boolean, i: number) => {
        // if (val) {
        //     document.getElementsByClassName('the-card')?.classList.remove('animate__bounceOut');
        //     document.getElementsByClassName('the-card')?.classList.add('animate__bounceIn');
        // } else {
        //     document.getElementsByClassName('the-card')?.classList.remove('animate__bounceIn');
        //     document.getElementsByClassName('the-card')?.classList.add('animate__bounceOut');
        // }
        if (defaultChecked.length) {
            let newState = [...defaultChecked]
            newState[i].isShow = val;
            onChange(newState);
        }
    };

    const scrollTo = (i: number, type: string) => {
        let el;
        if (type == 'back') {
            el = document.getElementById(`vvvv${i - 1}`) || document.getElementById(`vvvv${i - 2}`) || document.getElementById(`vvvv${i - 3}`) || document.getElementById(`vvvv${i - 4}`) || document.getElementById(`vvvv${i - 5}`) || document.getElementById(`vvvv${i - 6}`);
        } else {
            el = document.getElementById(`vvvv${i + 1}`) || document.getElementById(`vvvv${i + 2}`) || document.getElementById(`vvvv${i + 3}`) || document.getElementById(`vvvv${i + 4}`) || document.getElementById(`vvvv${i + 5}`) || document.getElementById(`vvvv${i + 6}`);
        }
        if (el) {
            window.scrollTo(0, (el.offsetTop + 80));
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className="calculate-zakat-form py-2">
            <div className="the-card mb-3" id="vvvv-1">
                <div className="text-center py-3 px-2">
                    <div className="header">
                        Pilih zakat mu
                    </div>
                    <div className="description">
                        Please select the options that you think may apply to you. If you're not sure about an option, select it anyway and more information will follow to help you decide.
                    </div>
                </div>
                <div className="row">
                    {
                        defaultChecked.map((check, i) => (
                            <div className="col-lg-6 col-12">
                                <div className="d-flex flex-row">
                                    <Checkbox
                                        disabled={check.disabled}
                                        inputId={`Checkbox${i}`}
                                        checked={check.isShow}
                                        onChange={(e) => onChangeCheck(check, e.checked, i)}
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
                defaultChecked.map((check, i) => {
                    return (
                        check.isShow && <div className="the-card my-3 -v" id={`vvvv${i}`}>
                            <div className="text-left w-100 py-3 px-2">
                                <div className="header">
                                    {check.label}
                                </div>
                                <div className="description text-left">
                                    {check.description}
                                </div>
                            </div>
                            <div className="the-card-footer d-flex justify-content-between flex-row">
                                <button className="btn" onClick={() => scrollTo(i, 'back')}>Kembali</button>
                                <button className="btn btn-dh-outline" onClick={() => scrollTo(i, 'next')}>Next</button>
                            </div>
                        </div>
                    )
                }
                )
            }
        </div>
    )
}

export default CalculateZakat;