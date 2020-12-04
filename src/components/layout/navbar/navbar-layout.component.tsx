import React from 'react';
import dataMenu from 'files/menus.json';
import Link from 'next/link';
export default class NavbarComponent extends React.Component {

    render() {
        return (
            <div className="container-fluid container-lg dhv">
                <nav className="navbar navbar-expand-lg" id="navbar-dh">
                    <Link href="/">
                        <a className="navbar-brand" href="/">
                            <img src="/images/logos/dh-logo.svg" alt="" />
                        </a>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse navbar-collapse-dh" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto">

                            {
                                dataMenu.menus.map((menu, i) => {
                                    return <>
                                        {
                                            (menu.subMenu && menu.subMenu.length)
                                                ?
                                                <li key={i} className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        {menu.label}
                                                    </a>
                                                    <div className="dropdown-menu border-0 shadow dh" aria-labelledby="navbarDropdown">
                                                        {
                                                            menu.subMenu.map((sub, i) => {
                                                                return <>
                                                                    <Link href={sub.link}>
                                                                        <a className="dropdown-item">{sub.label}</a>
                                                                    </Link>
                                                                </>
                                                            })
                                                        }
                                                    </div>
                                                </li>
                                                :
                                                <li className="nav-item" key={i}>
                                                    <Link href={menu.link}>
                                                        <a className="nav-link">
                                                            {menu.label}
                                                        </a>
                                                    </Link>
                                                </li>
                                        }
                                    </>
                                })
                            }
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <Link href="">
                                <a className="sign-up">SIGN UP <img src="/images/icons/people.svg" className="ml-1 img-fluid" alt="" /> </a>
                            </Link>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}