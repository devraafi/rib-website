import MainComponent from '@Components/layout/main/main-layout.component';
import React from 'react';
import kb from './faq.json';
const { description } = kb;
const FaqComponent = () => (
    <MainComponent
        title="FAQ | Ruang Insan Berbagi"
        description="Ruang Insan Berbagi"
        pageId="sk-page-dh"
    >
        <div className="container-lg sk-wrapper py-lg-5 py-4">
            <div className="title col-lg-5 m-auto text-center">
                FAQ
            </div>
            <div className="py-3 col-lg-3 m-auto">
                <div className="separatore"></div>
            </div>
            <div className="content py-3" dangerouslySetInnerHTML={{ __html: description ? description : '' }}>
            </div>
        </div>
    </MainComponent>
)

export default FaqComponent;