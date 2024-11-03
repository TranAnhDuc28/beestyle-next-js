import CheckoutForm from './CheckoutForm';
import OrderDetail from './OrderDetail';

const Checkout = () => {
    return (
        <section className="shop checkout section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-12">
                        <CheckoutForm/>
                    </div>
                    <div className="col-lg-4 col-12">
                        <OrderDetail/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
