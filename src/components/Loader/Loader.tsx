import {Flex, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const Loader = () => {
    return (
        <Flex align={"center"} justify={"center"} style={{ height: '100vh' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Flex>
    );
};

export default Loader;
