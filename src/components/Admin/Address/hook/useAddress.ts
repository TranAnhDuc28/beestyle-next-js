import {useState, useEffect, useCallback} from "react";

const useAddress = () => {
    const [provinces, setProvinces] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);
    const [loading, setLoading] = useState({
        provinces: false,
        districts: false,
        wards: false,
    });
    const [error, setError] = useState<string | null>(null);

    // Hàm delay
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Hàm fetch với retry khi gặp lỗi 429 và delay mặc định
    const fetchWithRetry = async (url: string, retries = 3, delayMs = 1000) => {
        await delay(500); // Đặt độ trễ mặc định 500ms trước mỗi lần gọi API
        try {
            const response = await fetch(url);
            if (response.status === 429 && retries > 0) {
                // Thử lại nếu gặp lỗi 429
                await delay(delayMs);
                return fetchWithRetry(url, retries - 1, delayMs * 2); // Tăng thời gian chờ mỗi lần thử lại
            }
            if (!response.ok) {
                throw new Error(`Lỗi khi tải dữ liệu từ ${url}`);
            }
            return response.json();
        } catch (error) {
            throw error;
        }
    };

    // Fetch danh sách tỉnh
    const fetchProvinces = useCallback(async () => {
        if (provinces.length > 0) return;
        setLoading((prev) => ({...prev, provinces: true}));
        setError(null);

        try {
            const data = await fetchWithRetry("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1");
            setProvinces(data?.data?.data);
        } catch (err) {
            setError("Không thể tải danh sách tỉnh. Vui lòng thử lại.");
        } finally {
            setLoading((prev) => ({...prev, provinces: false}));
        }
    }, [provinces.length]);

    // Fetch danh sách huyện theo tỉnh
    const fetchDistricts = useCallback(
        async (provinceCode: string) => {
            if (!provinceCode) return;
            setDistricts([]);
            setWards([]);
            setLoading((prev) => ({...prev, districts: true}));
            setError(null);

            try {
                const data = await fetchWithRetry(
                    `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`
                );
                setDistricts(data.data.data);
            } catch (err) {
                setError("Không thể tải danh sách huyện. Vui lòng thử lại.");
                setDistricts([]);
            } finally {
                setLoading((prev) => ({...prev, districts: false}));
            }
        },
        []
    );

    // Fetch danh sách xã theo huyện
    const fetchWards = async (districtCode: string) => {
        const response = await fetch(
            `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`
        );
        const data = await response.json();
        setWards(data.data.data);
    };


    // Khởi tạo dữ liệu tỉnh khi hook khởi tạo
    useEffect(() => {
        fetchProvinces();
    }, [fetchProvinces]);

    const resetAddressData = () => {
        setDistricts([]);
        setWards([]);
    };

    return {provinces, districts, wards, loading, error, fetchDistricts, fetchWards, resetAddressData};
};

export default useAddress;
