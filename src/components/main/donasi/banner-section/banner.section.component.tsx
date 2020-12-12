import React from 'react';
import _ from 'lodash';
import data from './file.json'

export default class BannerDonationSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: data
        }
    }

    render() {
        return (
            <div className="container-fluid banner-section">
                <div className="banner-img-wrapper">
                    <img src={this.state.data.imageUrl} alt="" srcSet="" />
                    <div className="title p-4">
                        {this.state.data.title}
                    </div>
                </div>
            </div>
        )
    }
}