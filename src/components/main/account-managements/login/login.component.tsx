import Link from 'next/link';
import React from 'react';
const LoginComponent = () => {

    return <div id="login-page-dh">
        <div className="login-wrapper">
            <div className="header-section">
                <img src="/images/logos/dh-logo.svg" alt="" className="img-fluid mb-2" />
                <div className="title my-2">Welcome back,</div>
                <div className="text">Doesn’t have an account yet?
                    <Link href="#">
                        <a href="" className="text link"> Sign up</a>
                    </Link>
                </div>
            </div>
            <div className="form-section">
            </div>
            <div className="footer-section">
                <div className="d-flex flex-row justify-content-between">
                    <div className="brd"></div>
                    <div className="text">Or Login with</div>
                    <div className="brd"></div>
                </div>
                <div className="action d-flex flex-row justify-content-between my-2">
                    <button className="btn btn-dh-g mr-2">
                        <img src="/images/logos/g.svg" className="mr-2" alt="" />
                            Google
                        </button>
                    <button className="btn btn-dh-fb">
                        <img src="/images/logos/fb.svg" className="mr-2" alt="" />
                            Facebook
                        </button>

                </div>
            </div>
        </div>
    </div>
}

export default LoginComponent;