import { AuthenticationService } from "services/auth/aut.service";
import { NewsArticleRestService } from "../news-article-rest.service";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { RequestService } from "services/request.services";
import _ from "lodash";
import MainComponent from "@Components/layout/main/main-layout.component";
import { Spin } from "antd";
import { Loading } from "@Components/basics/loading/loading.component";
import moment from "moment";
import Link from "next/link";
const auth: AuthenticationService = new AuthenticationService;
const newsRestService: NewsArticleRestService = new NewsArticleRestService(process.env.staging || '', auth.axiosInterceptors);
const { handleRequest } = new RequestService;

export const NewsArticleDetailComponent = () => {
    const { query }: any = useRouter();
    const [news, setNews] = useState<INews>();
    const [others, setothers] = useState<INews[]>();
    const [params, setParams] = useState({
        take: 4,
        skip: 0
    });

    function loadNews() {
        const obs = newsRestService.loadNews(params)
        handleRequest({
            obs,
            onDone: (res) => {
                const data: INews[] = res.data;
                _.remove(data, function (n) {
                    return n.route == query.route
                });
                setothers(data);
            }
        })
    };

    function loadNewsByRoute() {
        const obs = newsRestService.loadNewsByRoute(_.get(query, 'route'));
        handleRequest({
            obs,
            onTap: loadNews,
            onDone: setNews
        })
    }
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
        loadNewsByRoute()
    }, [query])
    return (
        <MainComponent
            title={`Berita & Artikel | ${news?.title}`}
            description={`${news?.title}`}
            pageId="news-article-page-dh"
        >
            <Spin spinning={!news} indicator={<Loading />}>
                <div className="container-fluid p-0 news-page">
                    <div className="p-lg-5 p-3 container">
                        <div className="news-wrapper">
                            <div className="label-spec">
                                {moment(news?.createdAt).format('MMMM DD, YYYY')}
                            </div>
                            <div className="title lg">
                                {news?.title}
                            </div>
                            <div className="label-spec">
                                <span className="mr-3">By {news?.authorName}</span>
                                <span>{news?.articleCategory.name}</span>
                            </div>
                            <div className="news-img">
                                {
                                    news?.fileUrl ? <img src={news.fileUrl} alt="" className="imooge" /> : <div className="imooge"></div>
                                }
                            </div>
                            <div className="description my-5" dangerouslySetInnerHTML={{ __html: news?.description || '' }}></div>
                            <div className="share-author mb-4">
                                <span className="my-2">
                                    Share
                                </span>
                                <div className="d-flex pt-3">
                                    <div className="sosmed-wrap pointer">
                                        <img src="/images/icons/sosmed/active/wa.svg" className="img-fluid" alt="" srcSet="" />
                                    </div>
                                    <div className="sosmed-wrap pointer">
                                        <img src="/images/icons/sosmed/active/fb.svg" className="img-fluid" alt="" srcSet="" />
                                    </div>
                                    <div className="sosmed-wrap pointer">
                                        <img src="/images/icons/sosmed/active/tw.svg" className="img-fluid" alt="" srcSet="" />
                                    </div>
                                    <div className="sosmed-wrap pointer">
                                        <img src="/images/icons/sosmed/active/wf.svg" className="img-fluid" alt="" srcSet="" />
                                    </div>
                                    <div className="sosmed-wrap pointer">
                                        <img src="/images/icons/sosmed/active/mail.svg" className="img-fluid" alt="" srcSet="" />
                                    </div>
                                </div>
                            </div>
                            <div className="share-author">
                                <div className="my-2">
                                    Author
                                </div>
                                <div className="d-flex">
                                    <div className="author-img align-self-center mr-3">
                                        <img className="imooge" src="/images/icons/people.svg" alt=""/>
                                        {/* <div className="imooge"></div> */}
                                    </div>
                                    <div className="align-self-center name">
                                        {news?.authorName}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="other-article py-3">
                            <div className="w-100 border-bottom pb-2">
                                Berita dan artikel lainnya
                            </div>
                            <div className="row my-3">
                                {
                                    others && others.map((other, i: number) => {
                                        const newsDate = other.createdAt ? moment(convertUtctoLocalTimezone(new Date(other.createdAt as any))) : moment(new Date);
                                        return (i <= 2) ? <div className="col-lg-4 p-2" key={other._id}>
                                            <Link href={`/news-article/detail?route=${other.route}&title=${other.title}`}>
                                                <div className="news-wrapper h-100 pointer">
                                                    <div className="news-img sm">
                                                        {
                                                            other?.fileUrl ? <img src={other.fileUrl} alt="" className="imooge" /> : <div className="imooge"></div>
                                                        }
                                                    </div>
                                                    <div className="category-name sm">
                                                        {other?.articleCategory?.name}
                                                    </div>
                                                    <div className="title sm">
                                                        {other?.title}
                                                    </div>
                                                    <div className="caption">{other?.caption || 'Aenean consectetur morbi id vel purus neque elit, morbi. In non turpis ut elit orci, aliquet. Cursus eu faucibus mattis dapibus arcu nec. Mattis eget eu velit, sed sit mattis. Urna adipiscing phasellus odio eget. Nec augue enim sodales ut feugi.....'}</div>
                                                    {/* <div className="description main" dangerouslySetInnerHTML={{ __html: mainNews?.description || '' }}></div> */}
                                                    <div className="time">
                                                        {checkingIsWithinWeek(newsDate) ? (newsDate).fromNow() : (newsDate as any).format('MMM D, YYYY, H:mm:ss A')}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div> : <div></div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </MainComponent>
    )
}