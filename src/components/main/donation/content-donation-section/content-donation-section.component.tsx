import React from 'react';
import _ from 'lodash';
import NewInfoDonation from './new-info/new-info.component';
import { stat } from 'fs/promises';
import DonaturListDonation from './donatur/donatur.component';
// import data from './file.json'

export default class ContentDonationSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            active: 1
        }
    }

    render() {
        return (
            <div className="container-fluid py-2 content-section">
                <div className="d-flex flex-row my-4">
                    <div className="d-flex">
                        <button onClick={() => this.setState({ active: 1 })} className={'btn btn-dh-basic ' + (this.state.active == 1 ? 'active' : '')}>
                            Detail
                        </button>
                    </div>
                    <div className="d-flex px-4">
                        <button onClick={() => this.setState({ active: 2 })} className={'btn btn-dh-basic ' + (this.state.active == 2 ? 'active' : '')}>
                            Info Terbaru
                        </button>
                    </div>
                    <div className="d-flex">
                        <button onClick={() => this.setState({ active: 3 })} className={'btn btn-dh-basic ' + (this.state.active == 3 ? 'active' : '')}>
                            Donatur
                        </button>
                    </div>
                </div>
                <div>
                    {
                        this.state.active == 1 ?
                            <div className="detail-program-desc" dangerouslySetInnerHTML={{ __html: this.props.data ? this.props.data.description : '' }}></div>
                            :
                            this.state.active == 2 ?
                                < NewInfoDonation />
                                :
                                <DonaturListDonation />
                    }
                </div>
            </div>
        )
    }
}