import React, { } from 'react';
import HeaderComponent from '@Components/layout/header/header-layout.component';
import NavbarComponent from '@Components/layout/navbar/navbar-layout.component';
import FooterComponent from '@Components/layout/footer/footer-layout.component';
import { NextSeo } from 'next-seo';
import { MainProps } from './main';

const MainComponent = (props: MainProps) => (
    <React.Fragment>
        <div className="container-fluid p-0">
            <HeaderComponent />
            <NextSeo
                title={props.title || 'Lazis Darul Hikam'}
                description={props.description || 'Lazis Darul Hikam'}
            />
            <NavbarComponent />
            <div className="main-container" id={props.pageId}>
                <div className="content-wrapper container-fluid p-0" >
                    {props.children}
                </div>
                <FooterComponent />
            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
    </React.Fragment>
)

export default MainComponent;