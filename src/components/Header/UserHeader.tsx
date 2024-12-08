import React from "react";
import TopBar from "./UserTopbar";
import NavBar from "./UserNavbar";
import {Layout} from "antd";

const {Header} = Layout;

const UserHeader: React.FC = () => {
    return (
        <header className="header shop">
            <TopBar />
            <NavBar />
        </header>
    );
};

export default UserHeader;