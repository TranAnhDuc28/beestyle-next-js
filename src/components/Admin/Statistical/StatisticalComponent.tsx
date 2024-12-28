import Title from "antd/lib/typography/Title";
import StatisticalDateFilter from "./StatisticalDateFilter";
import SalesStatistics from "./SalesStatistics";
import StatisticChart from "./StatisticChart";

const StatisticalComponent = () => {
    return (
        <div>
            <Title level={2} className="py-4 text-center">Thống kê</Title>
            <SalesStatistics />
            <div className="flex justify-between">
                <StatisticalDateFilter />
                <div
                    style={{
                        width: '75%',
                        height: '520px',
                        marginTop: 10
                    }}
                >
                    <StatisticChart />
                </div>
            </div>
        </div>
    );
};

export default StatisticalComponent;
