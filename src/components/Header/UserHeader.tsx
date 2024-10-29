import React from "react";
import TopBar from "./UserTopbar";
import MiddleBar from "./UserMiddle";
import NavBar from "./UserNavbar";

const UserHeader: React.FC = () => {
    return (
        <header className="header shop">
            <TopBar />
            <MiddleBar />
            <NavBar />
        </header>
    );
};

export default UserHeader;