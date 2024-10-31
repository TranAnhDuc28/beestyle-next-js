import { useState, useEffect } from 'react';

interface AddressNames {
  provinceName?: string;
  districtName?: string;
  wardName?: string;
}

const useAddressName = (provinceCode?: string, districtCode?: string, wardCode?: string) => {
  const [addressNames, setAddressNames] = useState<AddressNames>({
    provinceName: '',
    districtName: '',
    wardName: '',
  });

  useEffect(() => {
    const fetchProvinceName = async () => {
      try {
        const response = await fetch(
          `https://vn-public-apis.fpo.vn/provinces/getAll?q=${provinceCode}&cols=code`
        );
        const data = await response.json();
        if (data.exitcode === 1 && data.data && data.data.data.length > 0) {
          setAddressNames((prev) => ({ ...prev, provinceName: data.data.data[0].name }));
        } else {
          console.log("Không tìm thấy tỉnh");
        }
      } catch (error) {
        console.error("Lỗi khi lấy tên tỉnh:", error);
      }
    };

    const fetchDistrictName = async () => {
      try {
        const response = await fetch(
          `https://vn-public-apis.fpo.vn/districts/getAll?q=${districtCode}&cols=code`
        );
        const data = await response.json();
        if (data.exitcode === 1 && data.data && data.data.data.length > 0) {
          setAddressNames((prev) => ({ ...prev, districtName: data.data.data[0].name }));
        } else {
          console.log("Không tìm thấy huyện");
        }
      } catch (error) {
        console.error("Lỗi khi lấy tên huyện:", error);
      }
    };

    const fetchWardName = async () => {
      try {
        const response = await fetch(
          `https://vn-public-apis.fpo.vn/wards/getAll?q=${wardCode}&cols=code`
        );
        const data = await response.json();
        if (data.exitcode === 1 && data.data && data.data.data.length > 0) {
          setAddressNames((prev) => ({ ...prev, wardName: data.data.data[0].name }));
        } else {
          console.log("Không tìm thấy xã");
        }
      } catch (error) {
        console.error("Lỗi khi lấy tên xã:", error);
      }
    };

    if (provinceCode) fetchProvinceName();
    if (districtCode) fetchDistrictName();
    if (wardCode) fetchWardName();
  }, [provinceCode, districtCode, wardCode]);

  return addressNames;
};

export default useAddressName;
