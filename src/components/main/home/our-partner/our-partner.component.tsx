import React from 'react';
import moment from 'moment';
import data from './our-partner.json'

export default class OurPartnersSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: data
        }
    }

    render() {
        return (
            <>
                <div className="container-fluid our-partner-section py-5">
                    <div className="col-lg-6 m-auto">
                        <div className="header">
                            Partner Kami
                        </div>
                    </div>
                    <div className="col-auto py-3 m-auto">
                        <div className="description">
                            Kami bekerjasama dengan pihak-pihak yang terpercaya, amanah dan berpengalaman dalam mendistribusikan dana bantuan
                        </div>
                    </div>
                    <div className="row container-lg container-fluid m-auto py-4 justify-content-center">
                        {
                            this.state.data.ourPartners.map((partner: any, i: number) => {
                                return (
                                    <div key={i} className="col-auto align-self-center mx-3 py-3">
                                        <img src={partner.imageUrl} alt="" className="img-fluid lazyload blur-up lazyloaded" />
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