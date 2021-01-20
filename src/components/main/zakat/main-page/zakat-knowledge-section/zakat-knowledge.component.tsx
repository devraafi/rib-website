import React from 'react';

const ZakatKnowledgeSection = () => (
    <div className="container-fluid p-0 content-zakat py-5">
        <div className="container-lg container-fluid">
            <div className="row">
                <div className="col-lg-6 order-lg-2 order-2 align-self-center">
                    <div className="d-flex flex-column">
                        <div className="header mb-3 text-center text-lg-left">
                            Kenali Berbagai Macam Zakat
                            </div>
                        <div className="description px-md-5 px-lg-0 px-0 mb-5 text-center text-lg-left">
                            Yuk, kenali jenis dan macam-macam Zakat bagi umat Muslim disini!
                            </div>
                        <div className="action text-center text-lg-left d-flex flex-row justify-content-center justify-content-lg-start">
                            <button className="btn btn-dh-outline-4 px-5">
                                Baca Selengkapnya
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
);

export default ZakatKnowledgeSection;