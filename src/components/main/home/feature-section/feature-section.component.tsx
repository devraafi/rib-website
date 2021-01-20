import React from 'react';
import AOS from 'aos';
import _ from 'lodash';
import Link from 'next/link';

const features = [
    {
        title: 'Berbagi Untuk Pendidikan',
        subtitle: 'Program untuk membantu pendidikan generasi-generasi penerus bangsa',
        description: 'Bantuan dapat berupa uang pendidikan maupun alat penunjang pendidikan. Wilayah sebaran program pendidikan yaitu di seluruh Indonesia, terutama di daerah-daerah pelosok yang membutuhkan bantuan pendidikan. ',
        img: '/images/feature/1.svg',
        altImg: '',
        href: { link: '/', as: '/' }
    },
    {
        title: 'Berbagi Untuk Lingkungan',
        subtitle: 'Merupakan sebuah program kepedulian terhadap daerah/lingkungan sekitar',
        description: 'Mebantu lungkungan yang membutuhkan baik manusia ataupun hewan. Dalam program berbagi lingkungan ini ada beberapa program yang telah dilakukan diantaranya siaga bencana, kerelawanan, dan lainnya.',
        img: '/images/feature/2.svg',
        altImg: '',
        href: { link: '/', as: '/' }
    },
    {
        title: 'Berbagi Untuk Umat',
        subtitle: 'Program bentuk kepedulian terhadap seluruh umat, utamanya adalah umat muslim',
        description: 'Wilayah sebarannya tidak hanya di Indonesia saja tapi di seluruh dunia termasuk di negara-negara konflik seperti Palestina, Suriah dan Rohingya.',
        img: '/images/feature/3.svg',
        altImg: '',
        href: { link: '/', as: '/' }
    },
    {
        title: 'Berbagi Untuk Kesehatan',
        subtitle: 'Program berbagi yang diberikan kepada para pejuang tangguh yang sedang di uji kesehatannya.',
        description: 'Bentuk kepedulian yang diberikan beragam, disesuaikan dengan kebutuhan dan kondisi yang ada seperti pengobatan kesehatan dhuafa, program pengobatan gratis dan pelayanan ambulance.',
        img: '/images/feature/4.svg',
        altImg: '',
        href: { link: '/', as: '/' }
    },
    {
        title: 'Berbagi Program Khusus',
        subtitle: 'Program berbagi yang bersifat khusus tergantung waktu dan kebutuhan.',
        description: 'Contoh program khusus adalah program khusus Ramadhan yang meliputi paket Lebaran yatim dan dhuafa, bingkisan untuk lansia dan ifthor Ramadhan; program khusus penanganan Covid-19, dan hari Raya Idul Adha.',
        img: '/images/feature/5.svg',
        altImg: '',
        href: { link: '/', as: '/' }
    },
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
            <div className="wrapper-img p-2 d-flex flex-row" id="wrapper-img-ft" data-aos="zoom-in"
                onClick={() => { this.setState((state: any) => ({ pauseTransition: !state.pauseTransition })) }}>
                <div className="feature-img align-self-start">
                    <img
                        key={this.state.currentImageSrc}
                        className="p-3 img lazyload blur-up lazyloaded"
                        src={this.state.currentImageSrc}
                        alt={this.state.currentImageAlt}
                    />
                </div>
                <div className="desc align-self-center align-self-lg-start">
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
