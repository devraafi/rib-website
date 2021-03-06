import React from 'react';
import moment from 'moment';
import data from './fake-data.json'
import Link from 'next/link';

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
                <div className="container-fluid zakat-section p-0">
                    <div className="bg"></div>
                    <div className="zakat-wrapper container p-2">
                        {/* <img src="/images/backgrounds/islamic.svg" className="islamic-bg" alt="" /> */}

                        <div className="col-lg-6 col-12 m-auto header py-2">
                            Salurkan Zakat Anda Bersama Kami
                    </div>
                        <div className="row m-auto py-2 justify-content-center">
                            {
                                this.state.data.menu.map((data: any, i: number) => {
                                    return (
                                        i === 0 && <div className="col-12 col-lg-4 py-2" key={i}>
                                            <Link href={data.link || '#'}>
                                                <div className="card-zakat">
                                                    <div className="d-flex">
                                                        <div className="card-child">
                                                            <img src={data.imgUrl} alt="" className="lazyload blur-up lazyloaded" />
                                                        </div>
                                                        <div className="label align-self-center ml-3">
                                                            {data.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}