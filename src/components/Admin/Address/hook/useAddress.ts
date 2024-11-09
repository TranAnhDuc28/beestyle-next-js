// useAddress.ts
import { useState, useEffect } from "react";

const useAddress = () => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  // Fetch danh sách tỉnh
  const fetchProvinces = async () => {
    const response = await fetch(
      "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
    );
    const data = await response.json();
    setProvinces(data.data.data);
  };

  // Fetch danh sách huyện theo tỉnh
  const fetchDistricts = async (provinceCode: string) => {
    const response = await fetch(
      `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`
    );
    const data = await response.json();
    setDistricts(data.data.data);
  };

  // Fetch danh sách xã theo huyện
  const fetchWards = async (districtCode: string) => {
    const response = await fetch(
      `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`
    );
    const data = await response.json();
    setWards(data.data.data);
  };


 

  // Khởi tạo dữ liệu tỉnh khi hooks khởi tạo
  useEffect(() => {
    fetchProvinces();
  }, []);

  return {
    provinces,
    districts,
    wards,
    fetchDistricts,
    fetchWards,
  };
};

export default useAddress;
