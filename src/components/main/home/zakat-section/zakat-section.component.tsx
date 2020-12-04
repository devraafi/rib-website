import React from 'react';
import moment from 'moment';
import data from './fake-data.json'

export default class ZakatSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: data
        }
    }

    render() {
        return (
            <>
                <div className="container zakat-section p-3 p-lg-5">
                    <img src="/images/backgrounds/islamic-bg.svg" alt="" className="islamic-bg"/>
                    <div className="col-lg-4 m-auto header">
                        Helping you bring Zakat
                        to life where you live
                    </div>
                    <div className="row m-auto py-4">
                        {
                            this.state.data.menu.map((data: any, i: number) => {
                                return (
                                    <div className="col-12 col-lg-4 py-2" key={i}>
                                        <div className="card-zakat">
                                            <div className="d-flex">
                                                <div className="card-child">
                                                    <img src={data.imgUrl} alt="" />
                                                </div>
                                                <div className="label align-self-center ml-3">
                                                    {data.title}
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