"use client";
import useSWR from "swr";
import axios from "axios";
import useAppNotifications from "@/hooks/useAppNotifications";

const transformData = (data: any[]) => {
    return data.map((item) => ({
        key: item.code.toString() as React.Key,
        value: item.code,
        label: item.name_with_type,
        title: item.name_with_type,
    }));
};

const AddressAPIUrls  = {
    provinces: "https://vn-public-apis.fpo.vn/provinces/getAll?limit=100",
    districts: (provinceCode: string) => `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`,
    wards: (districtCode: string) => `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`,
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const useAddress = () => {
    const {showNotification} = useAppNotifications();
    const fetchApiAdress = (key: string | null, description: string) => {
        const {data, error, isLoading, mutate} = useSWR(key, fetcher, {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        });

        if (error) {
            showNotification("error", {
                message: error?.message, description: error?.response?.data?.message || `Error fetching ${description}`,
            });
        }

        return {data, error, isLoading, mutate};
    }


    const handleGetProvinces = () => {
        const {data, error, isLoading, mutate} =
            fetchApiAdress(AddressAPIUrls.provinces, 'provinces');

        const dataProvinces = !isLoading && data?.data?.data ? data.data.data : [];
        const dataOptionProvinces = !isLoading && data?.data?.data ? transformData(data.data.data) : [];

        return {dataProvinces, dataOptionProvinces, error, isLoading, mutate};
    }

    const handleGetDistricts = (provinceCode: string | null) => {
        const {data, error, isLoading, mutate} =
            fetchApiAdress(provinceCode ? AddressAPIUrls.districts(provinceCode) : null, 'districts');

        const dataDistricts = !isLoading && data?.data?.data ? data.data.data : [];
        const dataOptionDistricts = !isLoading && data?.data?.data ? transformData(data.data.data) : [];

        return {dataDistricts, dataOptionDistricts, error, isLoading, mutate};
    }

    const handleGetWards = (districtCode: string | null) => {
        const {data, error, isLoading, mutate} =
            fetchApiAdress(districtCode ? AddressAPIUrls.wards(districtCode) : null, 'wards');

        const dataWards = !isLoading && data?.data?.data ? data.data.data : [];
        const dataOptionWards = !isLoading && data?.data?.data ? transformData(data.data.data) : [];

        return {dataWards, dataOptionWards, error, isLoading, mutate};
    }

    return {handleGetProvinces, handleGetDistricts, handleGetWards};
};

export default useAddress;
