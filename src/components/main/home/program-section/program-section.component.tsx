import React from 'react';
import fakeData from './fake-data.json';
import { Slider } from 'primereact/slider';

export default class ProgramSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            fakeData: fakeData
        }
    }

    render() {
        return (
            <>
                <div className="container program-section py-5">
                    <div className="col-lg-4 col-9 m-auto header">
                        Helping you bring Zakat
                        to life where you live
                    </div>
                    <div className="col-lg-6 m-auto desc py-3">
                        Cursus at id imperdiet lectus quisque volutpat. Risus convallis et nunc, ipsum. Mauris posuere dolor, facilisis mauris, tortor malesuada.
                    </div>
                    <div className="row">
                        {
                            this.state.fakeData.programList.map((list: any, i: number) => {
                                return (

                                    <div className="col-lg-4 col-12 py-3" key={i}>
                                        <div className="card-program">
                                            <div className="d-flex flex-column">
                                                <div className="program-image">
                                                    <img src={list.imageUrl} alt="" />
                                                </div>
                                                <div className="program-info p-3">
                                                    <div className="title px-2">
                                                        {list.title}
                                                    </div>

                                                    <div className="profile-info py-3 px-2">
                                                        <div className="d-flex flex-row justify-content-between">
                                                            <div className="d-flex flex-row">
                                                                <div className="profile-img">
                                                                    <img src={list.userInfo.imageUrl} alt="" />
                                                                </div>
                                                                <div className="ml-3 profile-name">
                                                                    {list.userInfo.name}
                                                                </div>
                                                            </div>
                                                            <div className="is-certified">
                                                                {
                                                                    list.isCertified && (
                                                                        <img src="/images/program/is-cert.svg" className="img-fluid" alt="" />
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="target-info p-2">
                                                        <div className="py-2">
                                                            <Slider disabled className="slider-program-dh" value={list.amount} max={list.targetAmount} />
                                                        </div>
                                                        <div className="d-flex flex-row justify-content-between py-2">
                                                            <div className="amount">{'Rp. ' + (list.amount).toLocaleString()}</div>
                                                            <div className="target-amount">{`Target Rp. ${(list.targetAmount).toLocaleString()}`}</div>
                                                        </div>
                                                    </div>

                                                    <div className="donation-info p-2">
                                                        <div className="d-flex flex-row justify-content-between">
                                                            <div className="d-flex flex-row justify-content-arround">
                                                                <div className="donatur-icon">
                                                                    <img src="/images/icons/peoples.svg" alt="" />
                                                                </div>
                                                                <div className="donatur-amount px-2">
                                                                    {(list.donaturAmount).toLocaleString() || 0}
                                                                </div>
                                                                <div className="donasi">
                                                                    Donasi
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-row justify-content-arround">
                                                                <div className="cart">
                                                                    <img src="/images/icons/cart.svg" alt="" />
                                                                </div>
                                                                <div className="days-amount px-2">
                                                                    {list.dayAmount}
                                                                </div>
                                                                <div className="days">
                                                                    Hari
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="row justify-content-center py-4 program-footer mx-5">
                        <div className="col-auto">
                            <button className="btn btn-dh-outline">
                                Lihat Semua
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}