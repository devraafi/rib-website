import React, { useState } from 'react';
import _ from 'lodash';
import data from './file.json'

const BannerDonationSection = () => {
    const [newData, setData] = useState(data)
    return (
        <div className="container-fluid banner-section">
            <div className="banner-img-wrapper">
                <img src={newData.imageUrl} alt="" srcSet="" />
                <div className="title p-4">
                    {newData.title}
                </div>
            </div>
        </div>
    )
}

export default BannerDonationSection;