import Link from 'next/link';
import React, { Component } from 'react';
import _ from 'lodash';
import AOS from 'aos';
import data from './file.json';
let dt: any = data;
const list: any = dt.list;
export default class FeatureSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            interval: null,
            animateTimeout: 0,
            progressBarPercentage: 0,
            data: data,
            hovering: false,
            currentHoverId: list.length - 1,
            animationFrames: 0,
            noReinitiate: false,
            currentImageSrc: '',
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
        clearInterval(this.state.interval);
        clearInterval(this.state.animateTimeout);
    }

    initiateTimer() {
        clearInterval(this.state.interval);
        this.setCurrentHoverId(0);
        this.setState( {
            interval: setInterval(this.setCurrentHoverId, 5000)
        })
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

    isHovered(id: number) {
        return this.state.currentHoverId == id ? '__hovered' : '';
    }

    setHovered(id: number) {
        if (this.state.currentHoverId === id) {
            this.setState({ noReinitiate: true });
        }
        this.setState(() => ({ hovering: true }));
        this.setCurrentHoverId(id);
    }

    setCurrentHoverId(hoverId: number) {
        if (!this.state.hovering && !this.state.pauseTransition) {
            let id = 0;
            if (typeof (hoverId) === 'number') {
                id = hoverId;
            }
            else if (this.state.currentHoverId !== (list.length - 1)) {
                id = this.state.currentHoverId + 1;
            }

            this.setState(() => ({
                currentHoverId: id,
                currentImageSrc: list[id].imageUrl,
                currentImageAlt: list[id].desc,
            }));

            this.animateItemTransition();
        }
    }

    animateItemTransition() {
        const animatedEl = document.getElementById('feature-img');
        if (!this.state.noReinitiate) {
            clearTimeout(this.state.animateTimeout);
            this.addClass(animatedEl, 'animating');
            this.addClass(animatedEl, 'fadeInLeft');
            setTimeout(() => {
                this.removeClass(animatedEl, 'animating');
                this.removeClass(animatedEl, 'fadeInLeft');
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

    renderListItem(data: any, key: number) {
        return (
            <React.Fragment>
                <Link href={''} as={''} passHref>
                    <a className="featured-section-list-link" key={key}>
                        <div
                            className={"feature-section-list " + this.isHovered(key)}
                            onMouseEnter={() => this.setHovered(key)}
                            onMouseLeave={() => this.unHover()}
                        >
                            <div className="d-flex align-items-center">
                                <div className={"feature-section-list-title " + this.isHovered(key)}>{data.title}</div>
                                <img src="/img/icon/Arrow.png" className={'feature-section-list-arrow ' + this.isHovered(key)} />
                            </div>
                            <p className={'feature-section-list-desc ' + this.isHovered(key)}>{data.description}</p>
                            <div className={"feature-section-list-loading-bar " + this.isHovered(key)}></div>
                        </div>
                    </a>
                </Link>
            </React.Fragment>
        )
    }

    render() {
        return (
            <>
                <div className="container-fluid feature-section py-5">
                    <div className="row container-lg jusify-content-center m-auto">
                        <div className="col-5">
                            <div className="feature-section-lists">
                                {this.state.data.list.map((val: any, i: number) => (
                                    this.renderListItem(val, i)
                                ))}
                            </div>
                        </div>
                        <div className="col-5 d-flex align-items-center align-self-center">

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
