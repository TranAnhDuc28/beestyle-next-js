import { useState, useEffect } from "react";

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

  // Fetch danh sách tỉnh
  const fetchProvinces = async () => {
    setLoading((prev) => ({ ...prev, provinces: true }));
    setError(null);
    try {
      const response = await fetch(
        "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch provinces.");
      }
      const data = await response.json();
      setProvinces(data.data.data);
    } catch (err) {
      setError("Unable to load provinces. Please try again.");
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, provinces: false }));
    }
  };

  // Fetch danh sách huyện theo tỉnh
  const fetchDistricts = async (provinceCode: string) => {
    setLoading((prev) => ({ ...prev, districts: true }));
    setError(null);
    try {
      const response = await fetch(
        `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch districts.");
      }
      const data = await response.json();
      setDistricts(data.data.data);
    } catch (err) {
      setError("Unable to load districts. Please try again.");
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, districts: false }));
    }
  };

  // Fetch danh sách xã theo huyện
  const fetchWards = async (districtCode: string) => {
    setLoading((prev) => ({ ...prev, wards: true }));
    setError(null);
    try {
      const response = await fetch(
        `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch wards.");
      }
      const data = await response.json();
      setWards(data.data.data);
    } catch (err) {
      setError("Unable to load wards. Please try again.");
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, wards: false }));
    }
  };

  // Khởi tạo dữ liệu tỉnh khi hook khởi tạo
  useEffect(() => {
    fetchProvinces();
  }, []);

  return {
    provinces,
    districts,
    wards,
    loading,
    error,
    fetchDistricts,
    fetchWards,
  };
};

export default useAddress;
