import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Admin = {
  __typename?: 'Admin';
  adminName: Scalars['String'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  isDisabled: Scalars['Boolean'];
  phoneNumber: Scalars['String'];
  profileImgUrl: Scalars['String'];
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  admin?: Maybe<Admin>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GrayCase = {
  __typename?: 'GrayCase';
  ageInput: Scalars['Float'];
  category: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: AdminResponse;
  firstName: Scalars['String'];
  gender: Scalars['String'];
  gradeClass: Scalars['String'];
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  lastName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  voteCount: Scalars['Float'];
  wasEdited: Scalars['Boolean'];
};

export type GrayCaseResponse = {
  __typename?: 'GrayCaseResponse';
  errors?: Maybe<Array<FieldError>>;
  grayCase?: Maybe<GrayCase>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addGrayCase: GrayCaseResponse;
  archiveGrayCase: Scalars['Boolean'];
  changePassword: AdminResponse;
  createNewGrayCase: GrayCaseResponse;
  deleteGrayCase: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  loginAdmin: AdminResponse;
  logoutUser: Scalars['Boolean'];
  registerAdmin: AdminResponse;
  registerSchool: SchoolResponse;
  registerStudent: StudentResponse;
  transferStudent: Scalars['Boolean'];
  updateGrayCase: GrayCaseResponse;
  updateSchoolDetails: Scalars['Boolean'];
  updateStudentDetails: Scalars['Boolean'];
};


export type MutationAddGrayCaseArgs = {
  category: Scalars['String'];
  studentId: Scalars['Float'];
};


export type MutationArchiveGrayCaseArgs = {
  id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateNewGrayCaseArgs = {
  ageInput: Scalars['Float'];
  category: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  gradeClass: Scalars['String'];
  lastName: Scalars['String'];
};


export type MutationDeleteGrayCaseArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginAdminArgs = {
  adminNameOrEmail: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterAdminArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegisterSchoolArgs = {
  address: Scalars['String'];
  country: Scalars['String'];
  rcnumber: Scalars['Float'];
  schoolName: Scalars['String'];
  state: Scalars['String'];
};


export type MutationRegisterStudentArgs = {
  academicResult: Scalars['String'];
  ageInput: Scalars['Float'];
  birthDay: Scalars['String'];
  birthMonth: Scalars['String'];
  birthYear: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  gradeClass: Scalars['String'];
  homeAddress: Scalars['String'];
  lastName: Scalars['String'];
  lgaOrigin: Scalars['String'];
  parentEmail: Scalars['String'];
  parentName: Scalars['String'];
  parentNumber: Scalars['String'];
  profileImgUrl: Scalars['String'];
  state: Scalars['String'];
};


export type MutationTransferStudentArgs = {
  schoolId: Scalars['Float'];
  studentId: Scalars['Float'];
};


export type MutationUpdateGrayCaseArgs = {
  ageInput: Scalars['Float'];
  category: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  gradeClass: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
};


export type MutationUpdateSchoolDetailsArgs = {
  address: Scalars['String'];
  bannerImgUrl?: InputMaybe<Scalars['String']>;
  country: Scalars['String'];
  logoImgUrl?: InputMaybe<Scalars['String']>;
  rcnumber: Scalars['Float'];
  schoolId: Scalars['Float'];
  schoolName: Scalars['String'];
  state: Scalars['String'];
};


export type MutationUpdateStudentDetailsArgs = {
  address: Scalars['String'];
  bannerImgUrl?: InputMaybe<Scalars['String']>;
  country: Scalars['String'];
  firstName: Scalars['String'];
  logoImgUrl?: InputMaybe<Scalars['String']>;
  rcnumber: Scalars['Float'];
  state: Scalars['String'];
  studentId: Scalars['Float'];
};

export type PaginatedGrayCase = {
  __typename?: 'PaginatedGrayCase';
  cursor: Scalars['Float'];
  grayCase?: Maybe<Array<GrayCase>>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  admin?: Maybe<AdminResponse>;
  getAdminGrayCases: Array<GrayCase>;
  getAdminSchool: Array<School>;
  getAdminStudents: Array<Student>;
  getAdmins: Array<Admin>;
  getGrayCase: GrayCaseResponse;
  getSchoolByName: SchoolResponse;
  getSchoolStudentsCount: Scalars['Float'];
  getSchools: Array<School>;
  getStudent: Array<Student>;
  getStudentByName: StudentResponse;
  getStudentFromSchool: Array<Student>;
  me?: Maybe<AdminResponse>;
  schoolCases: PaginatedGrayCase;
  trendingCases: PaginatedGrayCase;
};


export type QueryAdminArgs = {
  adminName: Scalars['String'];
};


export type QueryGetGrayCaseArgs = {
  id: Scalars['Float'];
};


export type QueryGetSchoolByNameArgs = {
  schoolName: Scalars['String'];
};


export type QueryGetSchoolStudentsCountArgs = {
  schoolId: Scalars['Float'];
};


export type QueryGetStudentByNameArgs = {
  firstName: Scalars['String'];
};


export type QueryGetStudentFromSchoolArgs = {
  schoolId: Scalars['Float'];
};


export type QuerySchoolCasesArgs = {
  cursor?: InputMaybe<Scalars['Float']>;
  limit: Scalars['Float'];
  sortBy?: InputMaybe<Scalars['String']>;
};


export type QueryTrendingCasesArgs = {
  cursor: Scalars['Int'];
  limit: Scalars['Int'];
  sortBy?: InputMaybe<Scalars['String']>;
};

export type School = {
  __typename?: 'School';
  address: Scalars['String'];
  bannerImgUrl: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
  logoImgUrl: Scalars['String'];
  rcnumber: Scalars['Float'];
  schoolName: Scalars['String'];
  state: Scalars['String'];
};

export type SchoolResponse = {
  __typename?: 'SchoolResponse';
  errors?: Maybe<Array<FieldError>>;
  school?: Maybe<School>;
};

export type Student = {
  __typename?: 'Student';
  ageInput: Scalars['Float'];
  birthDay: Scalars['String'];
  birthMonth: Scalars['String'];
  birthYear: Scalars['String'];
  createdAt: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  gradeClass: Scalars['String'];
  id: Scalars['Float'];
  isArchived: Scalars['Boolean'];
  lastName: Scalars['String'];
  owner: Scalars['String'];
  profileImgUrl: Scalars['String'];
};

export type StudentResponse = {
  __typename?: 'StudentResponse';
  errors?: Maybe<Array<FieldError>>;
  student?: Maybe<Student>;
};

export type UsernamePasswordInput = {
  adminName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type LoginAdminMutationVariables = Exact<{
  password: Scalars['String'];
  adminNameOrEmail: Scalars['String'];
}>;


export type LoginAdminMutation = { __typename?: 'Mutation', loginAdmin: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, isDisabled: boolean, profileImgUrl: string, email: string } | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type RegisterAdminMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterAdminMutation = { __typename?: 'Mutation', registerAdmin: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, isDisabled: boolean, profileImgUrl: string, email: string } | null } };

export type RegisterSchoolMutationVariables = Exact<{
  country: Scalars['String'];
  state: Scalars['String'];
  address: Scalars['String'];
  rcnumber: Scalars['Float'];
  schoolName: Scalars['String'];
}>;


export type RegisterSchoolMutation = { __typename?: 'Mutation', registerSchool: { __typename?: 'SchoolResponse', school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, state: string, country: string, description: string, logoImgUrl: string, bannerImgUrl: string, creator: string } | null } };

export type RegisterStudentMutationVariables = Exact<{
  profileImgUrl: Scalars['String'];
  academicResult: Scalars['String'];
  lgaOrigin: Scalars['String'];
  state: Scalars['String'];
  homeAddress: Scalars['String'];
  parentEmail: Scalars['String'];
  parentNumber: Scalars['String'];
  parentName: Scalars['String'];
  birthYear: Scalars['String'];
  birthMonth: Scalars['String'];
  birthDay: Scalars['String'];
  ageInput: Scalars['Float'];
  gradeClass: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
}>;


export type RegisterStudentMutation = { __typename?: 'Mutation', registerStudent: { __typename?: 'StudentResponse', student?: { __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, birthDay: string, birthMonth: string, birthYear: string, isArchived: boolean, profileImgUrl: string, owner: string } | null } };

export type GetAdminSchoolQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminSchoolQuery = { __typename?: 'Query', getAdminSchool: Array<{ __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, state: string, country: string, description: string, logoImgUrl: string, bannerImgUrl: string, creator: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, isDisabled: boolean, profileImgUrl: string, email: string } | null } | null };


export const LoginAdminDocument = gql`
    mutation LoginAdmin($password: String!, $adminNameOrEmail: String!) {
  loginAdmin(password: $password, adminNameOrEmail: $adminNameOrEmail) {
    errors {
      field
      message
    }
    admin {
      id
      createdAt
      adminName
      phoneNumber
      isDisabled
      profileImgUrl
      email
    }
  }
}
    `;

export function useLoginAdminMutation() {
  return Urql.useMutation<LoginAdminMutation, LoginAdminMutationVariables>(LoginAdminDocument);
};
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logoutUser
}
    `;

export function useLogoutUserMutation() {
  return Urql.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument);
};
export const RegisterAdminDocument = gql`
    mutation RegisterAdmin($options: UsernamePasswordInput!) {
  registerAdmin(options: $options) {
    errors {
      field
      message
    }
    admin {
      id
      createdAt
      adminName
      phoneNumber
      isDisabled
      profileImgUrl
      email
    }
  }
}
    `;

export function useRegisterAdminMutation() {
  return Urql.useMutation<RegisterAdminMutation, RegisterAdminMutationVariables>(RegisterAdminDocument);
};
export const RegisterSchoolDocument = gql`
    mutation RegisterSchool($country: String!, $state: String!, $address: String!, $rcnumber: Float!, $schoolName: String!) {
  registerSchool(
    country: $country
    state: $state
    address: $address
    rcnumber: $rcnumber
    schoolName: $schoolName
  ) {
    school {
      id
      createdAt
      schoolName
      rcnumber
      address
      state
      country
      description
      logoImgUrl
      bannerImgUrl
      creator
    }
  }
}
    `;

export function useRegisterSchoolMutation() {
  return Urql.useMutation<RegisterSchoolMutation, RegisterSchoolMutationVariables>(RegisterSchoolDocument);
};
export const RegisterStudentDocument = gql`
    mutation RegisterStudent($profileImgUrl: String!, $academicResult: String!, $lgaOrigin: String!, $state: String!, $homeAddress: String!, $parentEmail: String!, $parentNumber: String!, $parentName: String!, $birthYear: String!, $birthMonth: String!, $birthDay: String!, $ageInput: Float!, $gradeClass: String!, $gender: String!, $lastName: String!, $firstName: String!) {
  registerStudent(
    profileImgUrl: $profileImgUrl
    academicResult: $academicResult
    lgaOrigin: $lgaOrigin
    state: $state
    homeAddress: $homeAddress
    parentEmail: $parentEmail
    parentNumber: $parentNumber
    parentName: $parentName
    birthYear: $birthYear
    birthMonth: $birthMonth
    birthDay: $birthDay
    ageInput: $ageInput
    gradeClass: $gradeClass
    gender: $gender
    lastName: $lastName
    firstName: $firstName
  ) {
    student {
      id
      createdAt
      firstName
      lastName
      gradeClass
      gender
      ageInput
      birthDay
      birthMonth
      birthYear
      isArchived
      profileImgUrl
      owner
    }
  }
}
    `;

export function useRegisterStudentMutation() {
  return Urql.useMutation<RegisterStudentMutation, RegisterStudentMutationVariables>(RegisterStudentDocument);
};
export const GetAdminSchoolDocument = gql`
    query GetAdminSchool {
  getAdminSchool {
    id
    createdAt
    schoolName
    rcnumber
    address
    state
    country
    description
    logoImgUrl
    bannerImgUrl
    creator
  }
}
    `;

export function useGetAdminSchoolQuery(options?: Omit<Urql.UseQueryArgs<GetAdminSchoolQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminSchoolQuery, GetAdminSchoolQueryVariables>({ query: GetAdminSchoolDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    errors {
      field
      message
    }
    admin {
      id
      createdAt
      adminName
      phoneNumber
      isDisabled
      profileImgUrl
      email
    }
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};