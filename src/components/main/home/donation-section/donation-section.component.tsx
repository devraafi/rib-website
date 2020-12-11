import React from 'react';
import moment from 'moment';
import data from './fake-data.json'

export default class DonationSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: data
        }
    }

    render() {
        return (
            <>
                <div className="container-fluid donation-section py-5">
                    <div className="col-lg-4 m-auto header">
                        Thank you for your support,
                        Because we had currently help more than
                    </div>
                    <div className="row container-lg container-fluid m-auto py-4">
                        {
                            this.state.data.donationSummary.map((data: any, i: number) => {
                                return (
                                    <div className="col-12 col-lg-4 py-2" key={i}>
                                        <div className="card-donation">
                                            <div className="d-flex">
                                                <div className="card-child">
                                                    <img src="/images/icons/infaq.svg" alt="" className="lazyload blur-up lazyloaded" />
                                                </div>
                                                <div className="d-flex flex-column ml-4">
                                                    <div className="value">{data.amount}
                                                        <span className="currency ml-2">{data.currency}</span>
                                                    </div>
                                                    <div className="value-label">
                                                        {data.title}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}