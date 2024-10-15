import PromotionComponent from "@/components/Admin/PromotionComponent";
import {OptionsParams} from "@/utils/HttpInstance";
import {Suspense} from "react";
import Loader from "@/components/Loader/Loader";

const PromotionPage = (props: any) => {
    const size: number = (props?.searchParams?.size && !isNaN(props.searchParams.size)) ?
        Number(props.searchParams.size) : 6; // Ensure conversion to number is checked

    const page: number = (props?.searchParams?.page && !isNaN(props.searchParams.page)) ?
        Number(props.searchParams.page) : 0;

        const options: OptionsParams = {
            params: {
                page: page,
                size: size
            }
        };

    return (
        <Suspense fallback={<Loader/>}>
            <PromotionComponent options={options}/>
        </Suspense>
    );
}
export default PromotionPage;