import React, { HtmlHTMLAttributes, RefObject } from 'react';
import dataMenu from 'files/menus.json';
import Link from 'next/link';
export default class NavbarComponent extends React.Component<any, any> {
    navbarRef: any;
    dhvRef: any;
    constructor(props: any) {
        super(props);
        this.navbarRef = React.createRef();
        this.dhvRef = React.createRef();
        this.handleScroll = this.handleScroll.bind(this);
        this.getItem = this.getItem.bind(this);
        this.state = {
            userInfo: null
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (window.pageYOffset > (this.navbarRef.offsetHeight * (50 / 100))) {
            this.navbarRef.classList.add('fixed-top')
        } else {
            this.navbarRef.classList.remove('fixed-top')
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    getItem() {
        const local = localStorage;
        const userInfo = local.getItem('userinfo');
        if (userInfo) {
            return JSON.parse(userInfo)
        } else {
            return null
        }
    }

    render() {
        return (
            <div className="container-fluid dhv p-0" ref={a => this.navbarRef = a}>
                <div className="d-lg-flex d-none flex-row justify-content-center dhv-child p-2" ref={el => this.dhvRef = el}>
                    <div className="text-1 px-2">WA</div>
                    <div className="text-2 px-2">0812 3456 7890</div>
                    <div className="text-1 px-2">Phone</div>
                    <div className="text-2 px-2">022 - 2505375</div>
                    <div className="text-1 px-2">Email</div>
                    <div className="text-2 px-2">lazisdarulhikam@gmail.com</div>
                </div>
                { (this.props && this.props.customNav) ?
                    <>
                        {this.props.customNav}
                        <div id="navbar-dh" className="d-md-none">
                            <nav className="navbar navbar-expand-lg container-lg container-fluid navbar-light">
                                <Link href="/">
                                    <a className="navbar-brand" href="/">
                                        <img src="/images/logos/dh-logo.svg" alt="" />
                                    </a>
                                </Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#customNavbar" aria-controls="customNavbar" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse navbar-collapse-dh" id="customNavbar">
                                    <ul className="m-auto navbar-nav py-3 text-right">

                                        {
                                            dataMenu.menus.map((menu, i) => {
                                                return <div key={i}>
                                                    {
                                                        (menu.subMenu && menu.subMenu.length)
                                                            ?
                                                            <li key={i} className="nav-item dropdown">
                                                                <a className="nav-link px-4 dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    {menu.label}
                                                                </a>
                                                                <div className="dropdown-menu border-0 shadow dh text-center text-lg-left" aria-labelledby="navbarDropdown">
                                                                    {
                                                                        menu.subMenu.map((sub: any, i) => {
                                                                            return <Link href={sub.link} key={i}>
                                                                                <a className="dropdown-item">{sub.label}</a>
                                                                            </Link>
                                                                        })
                                                                    }
                                                                </div>
                                                            </li>
                                                            :
                                                            <li className="nav-item" key={i}>
                                                                <Link href={menu.link}>
                                                                    <a className="nav-link px-4">
                                                                        {menu.label}
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                    }
                                                </div>
                                            })
                                        }
                                    </ul>
                                    <form className="form-inline my-2 my-lg-0 px-4 d-flex justify-content-end">
                                        <Link href="/signup">
                                            <a className="sign-up">SIGN UP <img src="/images/icons/people.svg" className="ml-1 img-fluid" alt="" /> </a>
                                        </Link>
                                    </form>
                                </div>
                            </nav>
                        </div>
                    </>
                    :
                    <div id="navbar-dh">
                        <nav className="navbar navbar-expand-lg container-lg container-fluid navbar-light">
                            <Link href="/">
                                <a className="navbar-brand" href="/">
                                    <img src="/images/logos/dh-logo.svg" alt="" />
                                </a>
                            </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse navbar-collapse-dh" id="navbarSupportedContent">
                                <ul className="m-auto navbar-nav py-3 text-right">

                                    {
                                        dataMenu.menus.map((menu, i) => {
                                            return <div key={i}>
                                                {
                                                    (menu.subMenu && menu.subMenu.length)
                                                        ?
                                                        <li key={i} className="nav-item dropdown">
                                                            <a className="nav-link px-4 dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                {menu.label}
                                                            </a>
                                                            <div className="dropdown-menu border-0 shadow dh text-center text-lg-left" aria-labelledby="navbarDropdown">
                                                                {
                                                                    menu.subMenu.map((sub: any, i) => {
                                                                        return <Link href={sub.link} key={i}>
                                                                            <a className="dropdown-item">{sub.label}</a>
                                                                        </Link>
                                                                    })
                                                                }
                                                            </div>
                                                        </li>
                                                        :
                                                        <li className="nav-item" key={i}>
                                                            <Link href={menu.link}>
                                                                <a className="nav-link px-4">
                                                                    {menu.label}
                                                                </a>
                                                            </Link>
                                                        </li>
                                                }
                                            </div>
                                        })
                                    }
                                </ul>
                                <div style={{
                                    zIndex: 1
                                }} className="z-index-yow form-inline my-2 my-lg-0 px-4 d-flex justify-content-end">
                                    {
                                        (typeof window !== 'undefined' && this.getItem()) ?
                                            < Link href="/login">
                                                <a className="sign-up">{this.getItem().user.fullName} <img src="/images/icons/people.svg" className="ml-1 img-fluid" alt="" /> </a>
                                            </ Link>
                                            :
                                            < Link href="/signup">
                                                <a className="sign-up">SIGN UP <img src="/images/icons/people.svg" className="ml-1 img-fluid" alt="" /> </a>
                                            </Link>
                                    }
                                </div>
                            </div>
                        </nav>
                    </div>
                }
            </div>
        )
    }
}