import Link from "next/link";

const Login = () => {
    return (
        <section className="shop login section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-12">
                        <div className="login-form">
                            <h2>Login</h2>
                            <p>Please register in order to checkout more quickly</p>
                            <form className="form" method="post" action="#">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Your Email<span>*</span></label>
                                            <input type="email" name="email" placeholder="" required="required"/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Your Password<span>*</span></label>
                                            <input type="password" name="password" placeholder="" required="required"/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group login-btn">
                                            <button className="btn" type="submit">Login</button>
                                            <Link href="#" className="btn">Register</Link>
                                        </div>
                                        <div className="checkbox">
                                            <label className="checkbox-inline" form="2">
                                                <input name="news" id="2" type="checkbox"/>Remember me</label>
                                        </div>
                                        <Link href="#" className="lost-pass">Lost your password?</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;