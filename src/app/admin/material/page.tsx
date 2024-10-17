import MaterialComponent from "@/components/Admin/Material/MaterialComponent";
import { OptionsParams } from "@/utils/HttpInstance";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

const MaterialPage = (props: any) => {
    let size: any = props?.searchParams?.size;
    size = (!isNaN(size) && Number(size) > 0) ? Number(size) : 10;

    let page: any = props?.searchParams?.page;
    page = (!isNaN(page) && Number(page) > 0) ? Number(page) : 1;

    const options: OptionsParams = {
        params: {
            size: size,
            page: page,
        }
    };

    return (
        <Suspense fallback={<Loader />}>
            <MaterialComponent options={options} />
        </Suspense>
    );
}
export default MaterialPage;