import React from 'react';
import data from './fake-data.json';
import moment from 'moment';

export default class BannerSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            bannerData: data
        }
    }

    render() {
        let bannerList = [];
        bannerList = this.state.bannerData.bannerList;
        return (
            <>
                <div className="container banner-section py-5 px-4">
                    <div className="row justify-content-center justify-content-lg-start">
                        <div className="text-date col-12 text-center text-lg-left">
                            {moment(this.state.bannerData).format('M YY')}
                        </div>
                        <div className="title col-lg-9 col-12 text-center text-lg-left">
                            {this.state.bannerData.title}
                        </div>
                        <div className="description col-lg-5 col-12 text-center text-lg-left py-3">
                            {this.state.bannerData.description}
                        </div>
                        <div className="to col-12 py-4 text-center text-lg-left">
                            <button className="btn btn-dh-primary">
                                {this.state.bannerData.to.label}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}