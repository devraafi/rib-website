import { Loading } from '@Components/basics/loading/loading.component';
import MainComponent from '@Components/layout/main/main-layout.component';
import { Spin } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AuthenticationService } from 'services/auth/aut.service';
import { RequestService } from 'services/request.services';
import { NewsArticleRestService } from '../news-article-rest.service';

const auth: AuthenticationService = new AuthenticationService;
const newRestService: NewsArticleRestService = new NewsArticleRestService(process.env.staging || '', auth.axiosInterceptors);
const { handleRequest } = new RequestService;
export const NewsArticleListComponent = () => {
    const [news, setNews] = useState<INews[]>();
    const [loading, setLoading] = useState(false);
    const [mainNews, setMainNews] = useState<INews>()
    const [params, setParams] = useState({
        take: 6,
        skip: 0
    });

    const maindate = mainNews ? moment(convertUtctoLocalTimezone(new Date(mainNews?.createdAt as any))) : moment(new Date);

    function loadNews() {
        setLoading(true)
        const obs = newRestService.loadNews(params)
        handleRequest({
            obs,
            onError: () => setLoading(false),
            onDone: (res) => { setNews(res.data); setLoading(false) }
        })
    };

    function convertUtctoLocalTimezone(dateUtc: any) {
        const offset = (new Date().getTimezoneOffset() * -1);
        dateUtc.setMinutes(dateUtc.getMinutes() + offset);
        return dateUtc;
    }

    function checkingIsWithinWeek(date: any) {
        const aWeekOld = moment().clone().subtract(8, 'days').startOf('day');

        return moment(date).isAfter(aWeekOld);
    }

    useEffect(() => {
        loadNews()
    }, []);

    useEffect(() => {
        if (news && news.length) {
            setMainNews(news[0])
        }
    }, [news]);

    return (
        <MainComponent
            title="Berita & Artikel"
            description="Ruang Insan Berbagi"
            pageId="news-article-page-dh"
        >
            <Spin spinning={loading} indicator={<Loading />}>
                <div className="container-lg container-fluid py-4 news-page">
                    {
                        news ? <>
                            <div className="row">
                                <div className="col-lg-12 p-2">
                                    <Link href={`/news-article/detail/?route=${mainNews?.route}&title=${mainNews?.title}`}>
                                        <div className="the-new pointer">
                                            <div className="news-wrapper">
                                                <div className="row">
                                                    <div className="col-lg-7">
                                                        <div className="news-img">
                                                            {
                                                                mainNews?.fileUrl && (mainNews?.fileUrl !== '-') ? <img src={mainNews.fileUrl} alt="" className="imooge" /> : <div className="imooge"></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-5">
                                                        {
                                                            (mainNews && mainNews?.articleCategory) &&
                                                            <div className="category-name">
                                                                {mainNews?.articleCategory?.name || ''}
                                                            </div>
                                                        }
                                                        <div className="title lg">
                                                            {mainNews?.title}
                                                        </div>
                                                        <div className="caption">{mainNews?.caption || '...'}</div>
                                                        {/* <div className="description main" dangerouslySetInnerHTML={{ __html: mainNews?.description || '' }}></div> */}
                                                        <div className="time">
                                                            {checkingIsWithinWeek(maindate) ? (maindate).fromNow() : (maindate as any).format('MMM D, YYYY, H:mm:ss A')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                {/* <div className="col-lg-6">
                            <div className="the-recent">
                                { }
                            </div>
                        </div> */}
                            </div>
                            <div className="row my-4">
                                {
                                    news && news.map(nw => {
                                        const newsDate = nw.createdAt ? moment(convertUtctoLocalTimezone(new Date(nw.createdAt as any))) : moment(new Date);
                                        return (
                                            <div className="col-lg-4 p-2">
                                                <Link href={`/news-article/detail?route=${nw.route}&title=${nw.title}`}>
                                                    <div className="news-wrapper h-100 pointer">
                                                        <div className="news-img sm">
                                                            {
                                                                nw?.fileUrl && (nw?.fileUrl !== '-') ? <img src={nw.fileUrl} alt="" className="imooge" /> : <div className="imooge"></div>
                                                            }
                                                        </div>
                                                        {
                                                            (nw && nw?.articleCategory) &&
                                                            <div className="category-name sm">
                                                                {nw?.articleCategory?.name || ''}
                                                            </div>
                                                        }
                                                        <div className="title sm">
                                                            {nw?.title}
                                                        </div>
                                                        <div className="caption">{nw?.caption || 'Aenean consectetur morbi id vel purus neque elit, morbi. In non turpis ut elit orci, aliquet. Cursus eu faucibus mattis dapibus arcu nec. Mattis eget eu velit, sed sit mattis. Urna adipiscing phasellus odio eget. Nec augue enim sodales ut feugi.....'}</div>
                                                        {/* <div className="description main" dangerouslySetInnerHTML={{ __html: mainNews?.description || '' }}></div> */}
                                                        <div className="time">
                                                            {checkingIsWithinWeek(newsDate) ? (newsDate).fromNow() : (newsDate as any).format('MMM D, YYYY, H:mm:ss A')}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </> : <div className="row">
                            <div className="col-12 text-center">
                                Tidak Ada Data
                            </div>
                        </div>
                    }
                </div>
            </Spin>
        </MainComponent>
    )
}