import React from 'react';
import _ from 'lodash';
import data from './file.json'

export default class NewInfoDonation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            active: 1,
            data: data
        }
    }

    render() {
        return (
            <div className="d-flex flex-column new-info">
                {
                    this.state.data.infoList.map((data: any, i: number) => {
                        return (
                            <div className="box-info my-3" key={i}>
                                <div className="date-info py-2">{data.dateInfo}</div>
                                <div className="title py-2">{data.title}</div>
                                <div className="image-wrap my-3">
                                    <img src={data.imageUrl} alt="" />
                                </div>
                                <div className="desc py-2">{data.desc}</div>
                                <div className="read-more py-2">
                                    <button className="btn btn-dh-outline-2">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}