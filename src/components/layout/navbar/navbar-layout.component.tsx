import React from 'react';
import dataMenu from 'src/files/menus.json';
import Link from 'next/link';

export default class NavbarComponent extends React.Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">DH Logo</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">

                            {
                                dataMenu.menus.map((menu, i) => {
                                    return <>
                                        {
                                            (menu.subMenu && menu.subMenu.length)
                                                ?
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        {menu.label}
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
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
                                                <li className="nav-item">
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
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}