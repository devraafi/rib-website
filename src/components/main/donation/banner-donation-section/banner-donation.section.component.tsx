import React, { useState } from 'react';
import _ from 'lodash';

const BannerDonationSection = (props: any) => {
    const { data } = props;
    const [newData, setData] = useState(data)
    return (
        <div className="container-fluid banner-section">
            <div className="banner-img-wrapper">
                {(data && data.fileUrl) ?
                    <img src={data ? data.fileUrl : ''} alt="" className="imooge" srcSet="" />
                    : <div className="imooge"></div>
                }
                <div className="title p-4">
                    {data.name || 'Program'}
                </div>
            </div>
        </div>
    )
}

export default BannerDonationSection;