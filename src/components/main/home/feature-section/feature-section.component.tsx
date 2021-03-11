import React from 'react';
import AOS from 'aos';
import _ from 'lodash';
import Link from 'next/link';

const features = [
    {
        title: 'Kepercayaan',
        subtitle: 'Menjalankan aktivitas lembaga dengan profesional, transparan, dan terpercaya',
        description: 'Menjalankan aktivitas lembaga dengan profesional, transparan, dan terpercaya.',
        img: '/images/feature/1.svg',
        altImg: '',
        href: { link: '/', as: '/' }
    },
    {
        title: 'Kolaborasi Aktif',
        subtitle: 'Bergotong royong saling membantu demi menciptakan kondisi masyarakat yang lebih baik',
        description: 'Bergotong royong saling membantu demi menciptakan kondisi masyarakat yang lebih baik.',
        img: '/images/feature/2.svg',
        altImg: '',
        href: { link: '/', as: '/' }
    },
    {
        title: 'Pemberdayaan',
        subtitle: 'Program bentuk kepedulian terhadap seluruh umat, utamanya adalah umat muslim',
        description: 'Memberikan akses kepada masyarakat untuk menciptakan dan meningkatkan kemandirian demi kehidupan lebih baik.',
        img: '/images/feature/3.svg',
        altImg: '',
        href: { link: '/', as: '/' }
    },
    {
        title: 'Universal dan Menyeluruh',
        subtitle: 'Tidak membeda-bedakan latar belakang penerima maupun pemberi dan bergerak secara bebas tanpa terikat oleh organnisasi, komunitas tertentu maupun partai tertentu.  ',
        description: 'Tidak membeda-bedakan latar belakang penerima maupun pemberi dan bergerak secara bebas tanpa terikat oleh organnisasi, komunitas tertentu maupun partai tertentu.  ',
        img: '/images/feature/4.svg',
        altImg: '',
        href: { link: '/', as: '/' }
    },
    // {
    //     title: 'Berbagi Program Khusus',
    //     subtitle: 'Program berbagi yang bersifat khusus tergantung waktu dan kebutuhan.',
    //     description: 'Contoh program khusus adalah program khusus Ramadhan yang meliputi paket Lebaran yatim dan dhuafa, bingkisan untuk lansia dan ifthor Ramadhan; program khusus penanganan Covid-19, dan hari Raya Idul Adha.',
    //     img: '/images/feature/5.svg',
    //     altImg: '',
    //     href: { link: '/', as: '/' }
    // },
]

class FeatureSection extends React.Component<any, any> {
    interval: any;
    animateTimeout: any;
    progressBarPercentage = 0;

    constructor(p: any) {
        super(p);

        this.state = {
            hovering: false,
            currentHoverId: features.length - 1,
            animationFrames: 0,
            noReinitiate: false,
            currentImageSrc: '',
            currentDesc: '',
            currentImageAlt: '',
            pauseTransition: false,
        }
    }

    componentDidMount() {
        AOS.init({
            duration: 800
        });

        this.initiateTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.animateTimeout);
    }

    initiateTimer() {
        clearInterval(this.interval);
        this.setCurrentHoverId(0);
        this.interval = setInterval(this.setCurrentHoverId, 5000);
    }

    unHover() {
        if (!this.state.noReinitiate) {
            this.initiateTimer();
        }
        this.setState(() => ({
            noReinitiate: false,
            hovering: false
        }));
    }

    setHovered(id: any) {
        if (this.state.currentHoverId === id) {
            this.setState({ noReinitiate: true });
        }
        this.setState(() => ({ hovering: true }));
        this.setCurrentHoverId(id);
    }

    isHovered(id: any) {
        return this.state.currentHoverId == id ? '__hovered' : '';
    }

    setCurrentHoverId = (hoverId: any) => {
        if (!this.state.hovering && !this.state.pauseTransition) {
            let id = 0;
            if (typeof (hoverId) === 'number') {
                id = hoverId;
            }
            else if (this.state.currentHoverId !== (features.length - 1)) {
                id = this.state.currentHoverId + 1;
            }

            this.setState(() => ({
                currentHoverId: id,
                currentImageSrc: features[id].img,
                currentDesc: features[id].description,
                currentImageAlt: features[id].altImg,
            }));

            this.animateItemTransition();
        }
    }

    animateItemTransition() {
        const animatedEl = document.getElementById('wrapper-img-ft');
        if (!this.state.noReinitiate) {
            clearTimeout(this.animateTimeout);
            this.addClass(animatedEl, 'animating');
            this.addClass(animatedEl, 'zoomIn');
            setTimeout(() => {
                this.removeClass(animatedEl, 'animating');
                this.removeClass(animatedEl, 'zoomIn');
            }, 650);
        }
    }

    addClass(el: any, className: any) {
        if (!_.isNil(el)) {
            el.classList.add(className);
        }
    }

    removeClass(el: any, className: any) {
        if (!_.isNil(el)) {
            el.classList.remove(className);
        }
    }

    renderListItem = (data: any, key: any) => (
        <Link href={data.href.link} as={data.href.as} passHref key={key}>
            <a className="featured-section-list-link" key={key}>
                <div
                    className={"feature-section-list " + this.isHovered(key)}
                    onMouseEnter={() => this.setHovered(key)}
                    onMouseLeave={() => this.unHover()}
                >
                    <div className="d-flex align-items-center">
                        <div className={"feature-section-list-title " + this.isHovered(key)}>{data.title}</div>
                    </div>
                    <p className={'feature-section-list-desc ' + this.isHovered(key)}>{data.subtitle}</p>
                    <div className={"feature-section-list-loading-bar " + this.isHovered(key)}></div>
                </div>
            </a>
        </Link>
    )

    renderListItemImage = () => {
        return (
            <div className="wrapper-img p-2 row" id="wrapper-img-ft" data-aos="zoom-in"
                onClick={() => { this.setState((state: any) => ({ pauseTransition: !state.pauseTransition })) }}>
                <div className="feature-img align-self-start col-lg-auto col-12">
                    <img
                        key={this.state.currentImageSrc}
                        className="p-3 img lazyload blur-up lazyloaded"
                        src={this.state.currentImageSrc}
                        alt={this.state.currentImageAlt}
                    />
                </div>
                <div className="desc align-self-center align-self-lg-start col-lg-auto col-12">
                    <div className="p-3">
                        {this.state.currentDesc}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={"container-fluid feature-section py-5"}>
                <div className="container-lg">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-6 prder-1 py-2">
                            <div className="feature-section-lists">
                                {features.map((val, i) => (
                                    this.renderListItem(val, i)
                                ))}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 d-flex align-items-center align-self-center order-2 py-2">
                            {this.renderListItemImage()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FeatureSection;
