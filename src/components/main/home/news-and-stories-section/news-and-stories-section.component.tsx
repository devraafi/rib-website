import React from 'react';
import moment from 'moment';
import data from './file.json'
import Link from 'next/link';


export const NewsSectionComponent = (props: INewsArticleProps) => {

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
                        props.data && props.data.map((list, i: number) => {
                            return (
                                <div className="col-lg-4 col-12 py-3 px-3" key={i}>
                                    <Link href={`/news-article/detail?route=${list.route}&title=${list.title}`}>
                                        <div className="card-news">
                                            <div className="d-flex flex-column">
                                                <div className="news-image">
                                                    {
                                                        list.fileUrl ?
                                                            <img src={list.fileUrl} alt="" className="lazyload blur-up lazyloaded" />
                                                            : <div className="imooge"></div>
                                                    }
                                                </div>
                                                <div className="news-info p-3">
                                                    <div className="d-flex flex-row justify-content-between py-2">
                                                        <div className="news-date">{moment(list.createdAt).format('DD MMMM YYYY')}</div>
                                                        <div className="category">{list.articleCategory.name}</div>
                                                    </div>
                                                    <div className="d-flex pt-1 pb-3">
                                                        <div className="title">
                                                            {list.title}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row profile-info">
                                                        <div className="profile-img">
                                                            <img src={`/images/icons/people.svg`} alt="" className="lazyload blur-up lazyloaded" />
                                                        </div>
                                                        <div className="ml-3 profile-name">
                                                            {list.authorName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="row justify-content-center py-4 news-footer mx-5">
                    <div className="col-auto">
                        <Link href="news-article">
                            <button className="btn btn-dh-outline">
                                Lihat Semua
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}