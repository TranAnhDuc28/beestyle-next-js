import Link from "next/link";

const Category = () => {
    return (
        <div className="single-widget category">
            <h3 className="title">Categories</h3>
            <ul className="categor-list">
                <li><Link className="link-no-decoration" href="#">T-shirts</Link></li>
                <li><Link className="link-no-decoration" href="#">jacket</Link></li>
                <li><Link className="link-no-decoration" href="#">jeans</Link></li>
                <li><Link className="link-no-decoration" href="#">sweatshirts</Link></li>
                <li><Link className="link-no-decoration" href="#">trousers</Link></li>
                <li><Link className="link-no-decoration" href="#">kitwears</Link></li>
                <li><Link className="link-no-decoration" href="#">accessories</Link></li>
            </ul>
        </div>
    );
};

export default Category;
