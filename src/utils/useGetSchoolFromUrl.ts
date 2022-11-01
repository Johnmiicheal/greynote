import { useGetString } from "./useGetString";
import { useGetSchoolByNameQuery } from "../gql/graphql";

export const useGetSchoolFromUrl = () => {
    const useGStr = useGetString();
    return useGetSchoolByNameQuery({
        variables: {
            schoolName: useGStr
        }
    })
}