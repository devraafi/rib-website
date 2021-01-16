import React from 'react';
import moment from 'moment';
import data from './file.json'

export default class NewsSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: data
        }
    }

    render() {
        return (
            <>
                <div className="container news-section py-5">
                    <div className="col-lg-6 col-auto m-auto">
                        <div className="header">
                            Artikel dan Cerita
                        </div>
                    </div>
                    <div className="col-auto py-3 m-auto">
                        <div className="description">
                        </div>
                    </div>
                    <div className="row justify-content-center py-3">
                        {
                            this.state.data.list.map((list: any, i: number) => {
                                return (
                                    <div className="col-lg-4 col-12 py-3 px-3" key={i}>
                                        <div className="card-news">
                                            <div className="d-flex flex-column">
                                                <div className="news-image">
                                                    <img src={list.imageUrl} alt="" className="lazyload blur-up lazyloaded" />
                                                </div>
                                                <div className="news-info p-3">
                                                    <div className="d-flex flex-row justify-content-between py-2">
                                                        <div className="news-date">{moment(list.newsDate).format('DD MMMM YYYY')}</div>
                                                        <div className="category">{list.category}</div>
                                                    </div>
                                                    <div className="d-flex pt-1 pb-3">
                                                        <div className="title">
                                                            {list.title}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row profile-info">
                                                        <div className="profile-img">
                                                            <img src={list.user.imgUrl} alt="" className="lazyload blur-up lazyloaded" />
                                                        </div>
                                                        <div className="ml-3 profile-name">
                                                            {list.user.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="row justify-content-center py-4 news-footer mx-5">
                        <div className="col-auto">
                            <button className="btn btn-dh-outline">
                                Lihat Semua
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}