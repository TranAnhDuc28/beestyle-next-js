import Link from "next/link";

const Manufacturers = () => {
    return (
        <div className="single-widget category">
            <h3 className="title">Manufacturers</h3>
            <ul className="categor-list">
                <li><Link className="link-no-decoration" href="#">Forever</Link></li>
                <li><Link className="link-no-decoration" href="#">giordano</Link></li>
                <li><Link className="link-no-decoration" href="#">abercrombie</Link></li>
                <li><Link className="link-no-decoration" href="#">ecko united</Link></li>
                <li><Link className="link-no-decoration" href="#">zara</Link></li>
            </ul>
        </div>
    );
};

export default Manufacturers;
