import Title from "antd/lib/typography/Title";
import SalesStatistics from "./SalesStatistics";
import StatisticChart from "./StatisticChart";
import StatisticTables from "./StatisticTables";

const StatisticalComponent = () => {
    return (
        <div>
            <Title level={2} className="py-4 text-center">Thống kê</Title>
            <SalesStatistics />
            <div
                className=" flex bg-white rounded-lg p-3"
                style={{
                    width: '100%',
                    marginTop: 15
                }}
            >
                <StatisticChart />
            </div>
            <StatisticTables />
        </div>
    );
};

export default StatisticalComponent;
