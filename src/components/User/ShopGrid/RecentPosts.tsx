import Image from "next/image";
import Link from "next/link";
import {Rate} from "antd";

const posts = [
    {
        id: 1,
        title: "Girls Dress",
        price: "$99.50",
        imageUrl: "https://via.placeholder.com/75x75",
        rating: 3,
    },
    {
        id: 2,
        title: "Women Clothings",
        price: "$99.50",
        imageUrl: "https://via.placeholder.com/75x75",
        rating: 4,
    },
    {
        id: 3,
        title: "Man Tshirt",
        price: "$99.50",
        imageUrl: "https://via.placeholder.com/75x75",
        rating: 5,
    },
];

const RecentPosts = () => {
    return (
        <div className="single-widget recent-post">
            <h3 className="title">Recent post</h3>
            {posts.map((post) => (
                <div key={post.id} className="single-post first">
                    <div className="image">
                        <Image width={75} height={75} src={post.imageUrl} alt={post.title}/>
                    </div>
                    <div className="content">
                        <h5>
                            <Link className="link-no-decoration" href="#">
                                {post.title}
                            </Link>
                        </h5>
                        <p className="price">{post.price}</p>
                        <div className="reviews">
                            <Rate disabled defaultValue={post.rating} style={{fontSize: 14}}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentPosts;
