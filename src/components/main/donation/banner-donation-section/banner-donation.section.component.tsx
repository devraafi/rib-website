import React, { useState } from 'react';
import _ from 'lodash';

const BannerDonationSection = (props: any) => {
    const { data } = props;
    const [newData, setData] = useState(data)
    return (
        <div className="container-fluid banner-section">
            <div className="banner-img-wrapper" style={{
                background: `linear-gradient(360deg, #515151 0%, rgba(255, 255, 255, 0) 100%) ${(data && (data.fileUrl && data.fileUrl !== '-')) ? `, url(${data.fileUrl})` : ', url(.jpg);'}`
            }}>
                {/* {(data && (data.fileUrl && data.fileUrl !== '-')) ?
                    <img src={data ? data.fileUrl : ''} alt="" className="imooge" srcSet="" />
                    : <div className="imooge"></div>
                } */}
                <div className="title p-4">
                    {data.name || 'Program'}
                </div>
            </div>
        </div>
    )
}

export default BannerDonationSection;