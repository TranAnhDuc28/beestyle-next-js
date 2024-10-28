import '@/app/(user)/beestyle/styles/globals.css';

const UserLoader = () => {
    return (
        <div className="preloader">
            <div className="preloader-inner">
                <div className="preloader-icon">
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default UserLoader;