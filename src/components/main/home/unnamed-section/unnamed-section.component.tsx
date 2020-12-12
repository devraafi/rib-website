import React from 'react';
import moment from 'moment';
import data from './file.json'

export default class UnnamedSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: data
        }
    }

    render() {
        return (
            <>
                <div className="container unnamed-section py-5">
                    <div className="col-lg-6 col-auto m-auto">
                        <div className="header">
                            Program Lazis DH
                        </div>
                    </div>
                    <div className="col-auto py-3 m-auto">
                        <div className="description">
                            Amet vitae, risus fringilla convallis lorem metus .
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {
                            this.state.data.list.map((list: any, i: number) => {
                                return (
                                    <div key={i} className={i == 0 || i == 4 ? 'col-lg-6 col-12 px-1 py-3' : 'col-lg-3 px-1 col-12 py-3'}>
                                        <div className="wrapper-img-unnamed">
                                            <img src={list.imageUrl} alt="" className="lazyload blur-up lazyloaded" />
                                            <div className="title p-4">
                                                {list.title}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="row justify-content-center py-4 unnamed-footer mx-5">
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