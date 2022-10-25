import { useRouter } from "next/router";

export const useGetString = () => {
    const router = useRouter();
    const useStr = typeof router.query.name === "string" ? (router.query.name).toString() : "";
    return useStr
}


export const useGetIntId = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  return intId;
};