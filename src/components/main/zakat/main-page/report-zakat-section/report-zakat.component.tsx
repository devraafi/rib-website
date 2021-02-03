import React, { useState } from "react";
const donateSummary = [
    {
        amount: 265,
        label: "Donasi Tersalurkan"
    },
    {
        amount: 89,
        label: "Donasi Terkumpul"
    },
    {
        amount: 70,
        label: "Total Campaign"
    },
]
const ReportZakatSection = () => {
    const [summary, onSummaryChanges] = useState(donateSummary);
    return (
        <div className="container-fluid py-5 content-zakat-report">
            <div className="container-lg">
                <div className="header text-center pb-4 col-lg-6 m-auto">
                    Dengan dukungan dan kemurahan hati Anda, kami dapat membantu meringankan beban mereka
                    </div>
                <div className="row justify-content-center">
                    {
                        summary.map((sum, i) => (
                            <div className="col-lg-3 px-3 col-6 py-2" key={i}>
                                <div className="card-report-zakat">
                                    <div className="d-flex flex-column justify-content-center align-items-center text-center">
                                        <img src="/images/icons/card-donate.svg" alt="" className="img-fluid mb-3" />
                                        <div className="amount">
                                            {sum.amount}
                                            <span className="currency">
                                                ribu
                                                </span>
                                        </div>
                                        <div className="label-amount">
                                            {
                                                sum.label
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default ReportZakatSection;