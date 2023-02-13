import { dedupExchange, fetchExchange, gql, } from "urql";
import {
  MeQuery,
  MeDocument,
  LoginAdminMutation,
  LogoutUserMutation,
  RegisterAdminMutation,
  RegisterStudentMutation,
  RegisterSchoolMutation,
} from "../gql/graphql";

import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange, Cache } from "@urql/exchange-graphcache";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "https://162.243.186.78:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        AdminResponse: () => null,
        StudentResponse: () => null,
        SchoolResponse: () => null,
        GrayCaseResponse: () => null,
      },
      updates: {
        Mutation: {
          logoutUser: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutUserMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },

          loginAdmin: (_result, args, cache, info) => {
            betterUpdateQuery<LoginAdminMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.loginAdmin.errors) {
                  return query;
                } else {
                  return {
                    me: result.loginAdmin.admin,
                    callme: result.loginAdmin.admin,
                  };
                }
              }
            );
          },

          registerAdmin: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterAdminMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.registerAdmin.errors) {
                  return query;
                } else {
                  return {
                    me: result.registerAdmin.admin,
                  };
                }
              }
            );
          },

          registerSchool: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterSchoolMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.registerSchool.school) {
                  return query;
                } else {
                  return {
                    school: result.registerSchool.school,
                  };
                }
              }
            );
          },

          registerStudent: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterStudentMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.registerStudent.student) {
                  return query;
                } else {
                  return {
                    student: result.registerStudent.student,
                  };
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
    ssrExchange,
  ],
});
