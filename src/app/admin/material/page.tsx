import MaterialComponent from "@/components/Admin/MaterialComponent";
import {OptionsParams} from "@/utils/HttpInstance";
import {Suspense} from "react";
import Loader from "@/components/Loader/Loader";

const MaterialPage = (props: any) => {
    const size: number = (props?.searchParams?.size && !isNaN(props.searchParams.size)) ?
        Number(props.searchParams.size) : 10; // Ensure conversion to number is checked

    const page: number = (props?.searchParams?.page && !isNaN(props.searchParams.page)) ?
        Number(props.searchParams.page) : 1;

        const options: OptionsParams = {
            params: {
                page: page,
                size: size
            }
        };

    return (
        <Suspense fallback={<Loader/>}>
            <MaterialComponent options={options}/>
        </Suspense>
    );
}
export default MaterialPage;