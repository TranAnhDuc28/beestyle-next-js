'use client';

import React from 'react';
import Select from 'react-select';

const countryOptions = [
    { value: 'AF', label: 'Afghanistan' },
    { value: 'AX', label: 'Aland Islands' },
    { value: 'US', label: 'United Kingdom' }, // Set default option here
];


const CheckoutForm = () => {
    return (
        <div className="checkout-form">
            <h2>Make Your Checkout Here</h2>
            <p>Please register in order to checkout more quickly</p>
            <form className="form" method="post" action="#">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-group">
                            <label>First Name<span>*</span></label>
                            <input type="text" name="name" placeholder="" required="required"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-group">
                            <label>Last Name<span>*</span></label>
                            <input type="text" name="name" placeholder="" required="required"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-group">
                            <label>Email Address<span>*</span></label>
                            <input type="email" name="email" placeholder="" required="required"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-group">
                            <label>Phone Number<span>*</span></label>
                            <input type="number" name="number" placeholder="" required="required"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-group">
                            <label>Country<span>*</span></label>
                            <Select
                                options={countryOptions}
                                placeholder="Select a country"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-group">
                            <label>State / Division<span>*</span></label>
                            <Select
                                options={countryOptions}
                                placeholder="Select a country"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-group">
                            <label>Address Line 1<span>*</span></label>
                            <input type="text" name="address" placeholder="" required="required"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-group">
                            <label>Address Line 2<span>*</span></label>
                            <input type="text" name="address" placeholder="" required="required"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-group">
                            <label>Postal Code<span>*</span></label>
                            <input type="text" name="post" placeholder="" required="required"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-group">
                            <label>Company<span>*</span></label>
                            <Select
                                options={countryOptions}
                                // defaultValue={defaultCountry}
                                // onChange={handleChange}
                                placeholder="Select a country"
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group create-account">
                            <input id="cbox" type="checkbox"/>
                            <label>Create an account?</label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
