import { useGetClass } from "./useGetString";
import { useGetStudentFromClassQuery } from "../gql/graphql";

export const useGetClassFromUrl = () => {
    const useClass = useGetClass();
    return useGetStudentFromClassQuery({
        variables: {
            gradeClass: useClass
        }
    })
}