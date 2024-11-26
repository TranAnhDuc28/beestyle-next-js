"use client";
import { getCategories, URL_API_CATEGORY } from "@/services/CategoryService";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

const Category = () => {
  const { data, error, isLoading } = useSWR(
    URL_API_CATEGORY.get,
    getCategories,
    { revalidateOnFocus: false }
  );

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const categories = data?.data?.items || [];

  // Hàm xử lý khi người dùng click vào danh mục
  const onCategoryClick = (categoryId: string) => {
    if (categoryId) {
      params.set("category", categoryId); // Set category vào query params
      params.set("page", "1"); // Reset về page 1
    } else {
      params.delete("category"); // Xóa query nếu không có category
    }
    replace(`${pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="single-widget category">
        <h3 className="title">Danh mục</h3>
        <p>Đang tải danh mục...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="single-widget category">
        <h3 className="title">Danh mục</h3>
        <p>Không thể tải danh mục. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  return (
    <div className="single-widget category">
      <h3 className="title">Danh mục</h3>
      <ul className="categor-list">
        <li
          key={null}
          style={{ cursor: "pointer" }}
          onClick={() => onCategoryClick("")}
        >
          <Link className="link-no-decoration" href={""}>
            Tất cả
          </Link>
        </li>
        {categories.map((category: any) => (
          <li
            key={category.id}
            style={{ cursor: "pointer" }}
            onClick={() => onCategoryClick(category.id)}
          >
            <Link className="link-no-decoration" href={""}>
              {category.categoryName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
