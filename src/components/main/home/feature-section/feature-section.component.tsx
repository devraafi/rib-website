import React from 'react';
import AOS from 'aos';
import _ from 'lodash';
import Link from 'next/link';

const features = [
    {
        title: 'You can get help through our four funds',
        description: 'Sem sed lorem ut odio at. Pretium aliquam quis mauris sagittis fusce vestibulum. Purus ante amet lectus mauris pretium nulla fermentum at.',
        img: '/images/feature/1.jpg',
        altImg: '',
        href: { link: '/', as: '/' }
    },
    {
        title: 'Donec venenatis lectus scelerisque',
        description: 'Donec venenatis lectus scelerisque',
        img: '/images/feature/2.jpg',
        altImg: '',
        href: { link: '/', as: '/' }
    },
    {
        title: 'Justo, fringilla non ornare',
        description: 'Condimentum laoreet semper varius enim tristique',
        img: '/images/feature/3.jpg',
        altImg: '',
        href: { link: '/', as: '/' }
    },
    {
        title: 'Sit enim ac sagittis',
        description: 'Sit enim ac sagittis',
        img: '/images/feature/4.jpg',
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
                    <p className={'feature-section-list-desc ' + this.isHovered(key)}>{data.description}</p>
                    <div className={"feature-section-list-loading-bar " + this.isHovered(key)}></div>
                </div>
            </a>
        </Link>
    )

    renderListItemImage = () => {
        return (
            <React.Fragment>
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
            </React.Fragment>
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
