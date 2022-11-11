import { useGetIntId } from "./useGetString";
import { useGetStudentByIdQuery } from "../gql/graphql";

export const useGetStudentById = () => {
    const getId = useGetIntId();
    return useGetStudentByIdQuery({
        variables: {
            id: getId
        }
    })
}