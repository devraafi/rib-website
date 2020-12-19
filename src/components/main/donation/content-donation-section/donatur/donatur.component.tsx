import React from 'react';
import _ from 'lodash';
import data from './file.json'

export default class DonaturListDonation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            active: 1,
            data: data
        }
    }

    render() {
        return (
            <div className="d-flex flex-column donatur">
                {
                    this.state.data.donaturList.map((data: any, i: number) => {
                        return (
                            <div className="list justify-content-between">
                                <div className="d-flex flex-row">
                                    <div className="profile-img align-self-center mr-2">
                                        <img src={data.profileInfo.imageUrl || '/images/icons/profile.svg'} alt="" />
                                    </div>
                                    <div className="d-flex flex-column align-self-center">
                                        <div className="user-name">
                                            {data.profileInfo.name || 'Anonim'}
                                        </div>
                                        <div className="date-info">
                                            {data.date}
                                        </div>
                                        <div className="comment">
                                            {data.comment}
                                        </div>
                                    </div>
                                </div>
                                <div className="amount">
                                   Rp. {(data.amount).toLocaleString()}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}