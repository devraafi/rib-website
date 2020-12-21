import React from 'react';

const ZakatKnowledgeSection = () => (
    <React.Fragment>
        <div className="container-fluid p-0 content-zakat py-5">
            <div className="container-lg container-fluid">
                <div className="row">
                    <div className="col-lg-6 order-lg-2 order-2 align-self-center">
                        <div className="d-flex flex-column">
                            <div className="header mb-3 text-center text-lg-left">
                                Pengetahuan tentang Zakat
                            </div>
                            <div className="description px-md-5 px-lg-0 px-0 mb-5 text-center text-lg-left">
                                Working out your Zakat isn’t always easy. Use our step-by-step calculator to make sure you get it right. Or if you know how much to give already, just 'Skip to Give Zakat'
                            </div>
                            <div className="action text-center text-lg-left d-flex flex-row justify-content-center justify-content-lg-start">
                                <button className="btn btn-dh-outline-4 px-5">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 order-lg-1 order-1">
                        <div className="d-flex w-100 justify-content-center align-item-center text-center pb-3">
                            <img src="/images/zakat/4.png" className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
);

export default ZakatKnowledgeSection;