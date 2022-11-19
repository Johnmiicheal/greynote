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
  school: Scalars['String'];
  schoolImg: Scalars['String'];
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
  logoImgUrl: Scalars['String'];
  rcnumber: Scalars['Float'];
  schoolName: Scalars['String'];
  state: Scalars['String'];
};


export type MutationRegisterStudentArgs = {
  academicResult: Scalars['String'];
  ageInput: Scalars['Float'];
  birthDate: Scalars['DateTime'];
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
  academicResult: Scalars['String'];
  ageInput: Scalars['Float'];
  birthDate: Scalars['DateTime'];
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
  getAdminStudents: Array<Student>;
  getAdmins: Array<Admin>;
  getCaseCount: Scalars['Float'];
  getClassCount: Scalars['Float'];
  getGrayCase: GrayCaseResponse;
  getSchoolByName: SchoolResponse;
  getSchoolStudentsCount: Scalars['Float'];
  getSchools: Array<School>;
  getStudent: Array<Student>;
  getStudentById: StudentResponse;
  getStudentByName: StudentResponse;
  getStudentCaseCount: Scalars['Float'];
  getStudentCases: Array<GrayCase>;
  getStudentFromClass: Array<Student>;
  getStudentFromSchool: Array<Student>;
  me?: Maybe<AdminResponse>;
  schoolCases: PaginatedGrayCase;
  studentCases: PaginatedGrayCase;
  trendingCases: PaginatedGrayCase;
};


export type QueryAdminArgs = {
  adminName: Scalars['String'];
};


export type QueryGetCaseCountArgs = {
  id: Scalars['Float'];
};


export type QueryGetClassCountArgs = {
  gradeClass: Scalars['String'];
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


export type QueryGetStudentByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetStudentByNameArgs = {
  firstName: Scalars['String'];
};


export type QueryGetStudentCaseCountArgs = {
  id: Scalars['Float'];
};


export type QueryGetStudentCasesArgs = {
  studentId: Scalars['Float'];
};


export type QueryGetStudentFromClassArgs = {
  gradeClass: Scalars['String'];
};


export type QueryGetStudentFromSchoolArgs = {
  schoolId: Scalars['String'];
};


export type QuerySchoolCasesArgs = {
  cursor?: InputMaybe<Scalars['Float']>;
  limit: Scalars['Float'];
  sortBy?: InputMaybe<Scalars['String']>;
};


export type QueryStudentCasesArgs = {
  cursor?: InputMaybe<Scalars['Float']>;
  limit: Scalars['Float'];
  sortBy?: InputMaybe<Scalars['String']>;
  studentId: Scalars['Float'];
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
  creator?: Maybe<AdminResponse>;
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
  academicResult: Scalars['String'];
  ageInput: Scalars['Float'];
  birthDate: Scalars['DateTime'];
  createdAt: Scalars['String'];
  creator: AdminResponse;
  firstName: Scalars['String'];
  gender: Scalars['String'];
  gradeClass: Scalars['String'];
  grayId: Scalars['String'];
  homeAddress: Scalars['String'];
  id: Scalars['Float'];
  isArchived: Scalars['Boolean'];
  lastName: Scalars['String'];
  parentEmail: Scalars['String'];
  parentName: Scalars['String'];
  parentNumber: Scalars['String'];
  profileImgUrl: Scalars['String'];
  school: SchoolResponse;
  state: Scalars['String'];
  studentCase: GrayCaseResponse;
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

export type AddGrayCaseMutationVariables = Exact<{
  studentId: Scalars['Float'];
  category: Scalars['String'];
}>;


export type AddGrayCaseMutation = { __typename?: 'Mutation', addGrayCase: { __typename?: 'GrayCaseResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, grayCase?: { __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, voteCount: number, wasEdited: boolean, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null } } | null } };

export type CreateNewGrayCaseMutationVariables = Exact<{
  ageInput: Scalars['Float'];
  gradeClass: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  category: Scalars['String'];
}>;


export type CreateNewGrayCaseMutation = { __typename?: 'Mutation', createNewGrayCase: { __typename?: 'GrayCaseResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, grayCase?: { __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, voteCount: number, wasEdited: boolean, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null } } | null } };

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


export type RegisterAdminMutation = { __typename?: 'Mutation', registerAdmin: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null } };

export type RegisterSchoolMutationVariables = Exact<{
  logoImgUrl: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  address: Scalars['String'];
  rcnumber: Scalars['Float'];
  schoolName: Scalars['String'];
}>;


export type RegisterSchoolMutation = { __typename?: 'Mutation', registerSchool: { __typename?: 'SchoolResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, state: string, country: string, description: string, logoImgUrl: string, bannerImgUrl: string, creator?: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null } | null } };

export type RegisterStudentMutationVariables = Exact<{
  profileImgUrl: Scalars['String'];
  academicResult: Scalars['String'];
  lgaOrigin: Scalars['String'];
  state: Scalars['String'];
  homeAddress: Scalars['String'];
  parentEmail: Scalars['String'];
  parentNumber: Scalars['String'];
  parentName: Scalars['String'];
  birthDate: Scalars['DateTime'];
  ageInput: Scalars['Float'];
  gradeClass: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
}>;


export type RegisterStudentMutation = { __typename?: 'Mutation', registerStudent: { __typename?: 'StudentResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, student?: { __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, birthDate: any, isArchived: boolean, profileImgUrl: string, school: { __typename?: 'SchoolResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, state: string, country: string, description: string, logoImgUrl: string, bannerImgUrl: string } | null }, creator: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null } } | null } };

export type TransferStudentMutationVariables = Exact<{
  schoolId: Scalars['Float'];
  studentId: Scalars['Float'];
}>;


export type TransferStudentMutation = { __typename?: 'Mutation', transferStudent: boolean };

export type GetCaseCountQueryVariables = Exact<{
  getCaseCountId: Scalars['Float'];
}>;


export type GetCaseCountQuery = { __typename?: 'Query', getCaseCount: number };

export type GetClassCountQueryVariables = Exact<{
  gradeClass: Scalars['String'];
}>;


export type GetClassCountQuery = { __typename?: 'Query', getClassCount: number };

export type GetSchoolByNameQueryVariables = Exact<{
  schoolName: Scalars['String'];
}>;


export type GetSchoolByNameQuery = { __typename?: 'Query', getSchoolByName: { __typename?: 'SchoolResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, state: string, country: string, description: string, logoImgUrl: string, bannerImgUrl: string, creator?: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null } | null } | null } };

export type GetSchoolStudentsCountQueryVariables = Exact<{
  schoolId: Scalars['Float'];
}>;


export type GetSchoolStudentsCountQuery = { __typename?: 'Query', getSchoolStudentsCount: number };

export type GetSchoolsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSchoolsQuery = { __typename?: 'Query', getSchools: Array<{ __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, state: string, country: string, description: string, logoImgUrl: string, bannerImgUrl: string, creator?: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } | null }> };

export type GetStudentByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetStudentByIdQuery = { __typename?: 'Query', getStudentById: { __typename?: 'StudentResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, student?: { __typename?: 'Student', id: number, grayId: string, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, birthDate: any, isArchived: boolean, profileImgUrl: string, parentName: string, parentEmail: string, parentNumber: string, homeAddress: string, state: string, academicResult: string, school: { __typename?: 'SchoolResponse', school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, state: string, country: string, description: string, logoImgUrl: string, bannerImgUrl: string } | null }, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null } } | null } };

export type GetStudentByNameQueryVariables = Exact<{
  firstName: Scalars['String'];
}>;


export type GetStudentByNameQuery = { __typename?: 'Query', getStudentByName: { __typename?: 'StudentResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, student?: { __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, birthDate: any, isArchived: boolean, profileImgUrl: string, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null } } | null } };

export type GetStudentCasesQueryVariables = Exact<{
  studentId: Scalars['Float'];
}>;


export type GetStudentCasesQuery = { __typename?: 'Query', getStudentCases: Array<{ __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, voteCount: number, wasEdited: boolean, creator: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null } }> };

export type GetStudentFromClassQueryVariables = Exact<{
  gradeClass: Scalars['String'];
}>;


export type GetStudentFromClassQuery = { __typename?: 'Query', getStudentFromClass: Array<{ __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, birthDate: any, isArchived: boolean, profileImgUrl: string, parentName: string, parentEmail: string, parentNumber: string, homeAddress: string, state: string, school: { __typename?: 'SchoolResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, state: string, country: string, description: string, logoImgUrl: string, bannerImgUrl: string } | null }, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null } }> };

export type GetStudentFromSchoolQueryVariables = Exact<{
  schoolId: Scalars['String'];
}>;


export type GetStudentFromSchoolQuery = { __typename?: 'Query', getStudentFromSchool: Array<{ __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, birthDate: any, isArchived: boolean, profileImgUrl: string, creator: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null }, school: { __typename?: 'SchoolResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, state: string, country: string, description: string, logoImgUrl: string, bannerImgUrl: string, creator?: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null } | null } | null } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, isDisabled: boolean, profileImgUrl: string, email: string, school: string, schoolImg: string } | null } | null };

export type SchoolCasesQueryVariables = Exact<{
  limit: Scalars['Float'];
  cursor?: InputMaybe<Scalars['Float']>;
  sortBy?: InputMaybe<Scalars['String']>;
}>;


export type SchoolCasesQuery = { __typename?: 'Query', schoolCases: { __typename?: 'PaginatedGrayCase', hasMore: boolean, cursor: number, grayCase?: Array<{ __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, voteCount: number, wasEdited: boolean, creator: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null } }> | null } };


export const AddGrayCaseDocument = gql`
    mutation AddGrayCase($studentId: Float!, $category: String!) {
  addGrayCase(studentId: $studentId, category: $category) {
    errors {
      field
      message
    }
    grayCase {
      id
      createdAt
      updatedAt
      category
      firstName
      lastName
      gradeClass
      gender
      ageInput
      isActive
      voteCount
      wasEdited
      creator {
        admin {
          id
          createdAt
          adminName
          phoneNumber
          email
          isDisabled
          profileImgUrl
          school
        }
      }
    }
  }
}
    `;

export function useAddGrayCaseMutation() {
  return Urql.useMutation<AddGrayCaseMutation, AddGrayCaseMutationVariables>(AddGrayCaseDocument);
};
export const CreateNewGrayCaseDocument = gql`
    mutation CreateNewGrayCase($ageInput: Float!, $gradeClass: String!, $gender: String!, $lastName: String!, $firstName: String!, $category: String!) {
  createNewGrayCase(
    ageInput: $ageInput
    gradeClass: $gradeClass
    gender: $gender
    lastName: $lastName
    firstName: $firstName
    category: $category
  ) {
    errors {
      field
      message
    }
    grayCase {
      id
      createdAt
      updatedAt
      category
      firstName
      lastName
      gradeClass
      gender
      ageInput
      isActive
      voteCount
      wasEdited
      creator {
        admin {
          id
          createdAt
          adminName
          phoneNumber
          email
          isDisabled
          profileImgUrl
          school
        }
      }
    }
  }
}
    `;

export function useCreateNewGrayCaseMutation() {
  return Urql.useMutation<CreateNewGrayCaseMutation, CreateNewGrayCaseMutationVariables>(CreateNewGrayCaseDocument);
};
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
      email
      isDisabled
      profileImgUrl
      school
    }
  }
}
    `;

export function useRegisterAdminMutation() {
  return Urql.useMutation<RegisterAdminMutation, RegisterAdminMutationVariables>(RegisterAdminDocument);
};
export const RegisterSchoolDocument = gql`
    mutation RegisterSchool($logoImgUrl: String!, $country: String!, $state: String!, $address: String!, $rcnumber: Float!, $schoolName: String!) {
  registerSchool(
    logoImgUrl: $logoImgUrl
    country: $country
    state: $state
    address: $address
    rcnumber: $rcnumber
    schoolName: $schoolName
  ) {
    errors {
      field
      message
    }
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
      creator {
        admin {
          id
          createdAt
          adminName
          phoneNumber
          email
          isDisabled
          profileImgUrl
          school
        }
        errors {
          field
          message
        }
      }
    }
  }
}
    `;

export function useRegisterSchoolMutation() {
  return Urql.useMutation<RegisterSchoolMutation, RegisterSchoolMutationVariables>(RegisterSchoolDocument);
};
export const RegisterStudentDocument = gql`
    mutation RegisterStudent($profileImgUrl: String!, $academicResult: String!, $lgaOrigin: String!, $state: String!, $homeAddress: String!, $parentEmail: String!, $parentNumber: String!, $parentName: String!, $birthDate: DateTime!, $ageInput: Float!, $gradeClass: String!, $gender: String!, $lastName: String!, $firstName: String!) {
  registerStudent(
    profileImgUrl: $profileImgUrl
    academicResult: $academicResult
    lgaOrigin: $lgaOrigin
    state: $state
    homeAddress: $homeAddress
    parentEmail: $parentEmail
    parentNumber: $parentNumber
    parentName: $parentName
    birthDate: $birthDate
    ageInput: $ageInput
    gradeClass: $gradeClass
    gender: $gender
    lastName: $lastName
    firstName: $firstName
  ) {
    errors {
      field
      message
    }
    student {
      id
      createdAt
      firstName
      lastName
      gradeClass
      gender
      ageInput
      birthDate
      isArchived
      profileImgUrl
      school {
        errors {
          field
          message
        }
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
        }
      }
      creator {
        errors {
          field
          message
        }
        admin {
          id
          createdAt
          adminName
          phoneNumber
          email
          isDisabled
          profileImgUrl
          school
        }
      }
    }
  }
}
    `;

export function useRegisterStudentMutation() {
  return Urql.useMutation<RegisterStudentMutation, RegisterStudentMutationVariables>(RegisterStudentDocument);
};
export const TransferStudentDocument = gql`
    mutation TransferStudent($schoolId: Float!, $studentId: Float!) {
  transferStudent(schoolId: $schoolId, studentId: $studentId)
}
    `;

export function useTransferStudentMutation() {
  return Urql.useMutation<TransferStudentMutation, TransferStudentMutationVariables>(TransferStudentDocument);
};
export const GetCaseCountDocument = gql`
    query getCaseCount($getCaseCountId: Float!) {
  getCaseCount(id: $getCaseCountId)
}
    `;

export function useGetCaseCountQuery(options: Omit<Urql.UseQueryArgs<GetCaseCountQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCaseCountQuery, GetCaseCountQueryVariables>({ query: GetCaseCountDocument, ...options });
};
export const GetClassCountDocument = gql`
    query getClassCount($gradeClass: String!) {
  getClassCount(gradeClass: $gradeClass)
}
    `;

export function useGetClassCountQuery(options: Omit<Urql.UseQueryArgs<GetClassCountQueryVariables>, 'query'>) {
  return Urql.useQuery<GetClassCountQuery, GetClassCountQueryVariables>({ query: GetClassCountDocument, ...options });
};
export const GetSchoolByNameDocument = gql`
    query GetSchoolByName($schoolName: String!) {
  getSchoolByName(schoolName: $schoolName) {
    errors {
      field
      message
    }
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
      creator {
        errors {
          field
          message
        }
        admin {
          id
          createdAt
          adminName
          phoneNumber
          email
          isDisabled
          profileImgUrl
          school
        }
      }
    }
  }
}
    `;

export function useGetSchoolByNameQuery(options: Omit<Urql.UseQueryArgs<GetSchoolByNameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSchoolByNameQuery, GetSchoolByNameQueryVariables>({ query: GetSchoolByNameDocument, ...options });
};
export const GetSchoolStudentsCountDocument = gql`
    query getSchoolStudentsCount($schoolId: Float!) {
  getSchoolStudentsCount(schoolId: $schoolId)
}
    `;

export function useGetSchoolStudentsCountQuery(options: Omit<Urql.UseQueryArgs<GetSchoolStudentsCountQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSchoolStudentsCountQuery, GetSchoolStudentsCountQueryVariables>({ query: GetSchoolStudentsCountDocument, ...options });
};
export const GetSchoolsDocument = gql`
    query GetSchools {
  getSchools {
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
    creator {
      errors {
        field
        message
      }
      admin {
        id
        createdAt
        adminName
        phoneNumber
        email
        isDisabled
        profileImgUrl
        school
        schoolImg
      }
    }
  }
}
    `;

export function useGetSchoolsQuery(options?: Omit<Urql.UseQueryArgs<GetSchoolsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSchoolsQuery, GetSchoolsQueryVariables>({ query: GetSchoolsDocument, ...options });
};
export const GetStudentByIdDocument = gql`
    query GetStudentById($id: Float!) {
  getStudentById(id: $id) {
    errors {
      field
      message
    }
    student {
      id
      grayId
      createdAt
      firstName
      lastName
      gradeClass
      gender
      ageInput
      birthDate
      isArchived
      profileImgUrl
      parentName
      parentEmail
      parentNumber
      homeAddress
      state
      academicResult
      school {
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
        }
      }
      creator {
        admin {
          id
          createdAt
          adminName
          phoneNumber
          email
          isDisabled
          profileImgUrl
          school
        }
      }
    }
  }
}
    `;

export function useGetStudentByIdQuery(options: Omit<Urql.UseQueryArgs<GetStudentByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStudentByIdQuery, GetStudentByIdQueryVariables>({ query: GetStudentByIdDocument, ...options });
};
export const GetStudentByNameDocument = gql`
    query GetStudentByName($firstName: String!) {
  getStudentByName(firstName: $firstName) {
    errors {
      field
      message
    }
    student {
      id
      createdAt
      firstName
      lastName
      gradeClass
      gender
      ageInput
      birthDate
      isArchived
      profileImgUrl
      creator {
        admin {
          id
          createdAt
          adminName
          phoneNumber
          email
          isDisabled
          profileImgUrl
          school
        }
      }
    }
  }
}
    `;

export function useGetStudentByNameQuery(options: Omit<Urql.UseQueryArgs<GetStudentByNameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStudentByNameQuery, GetStudentByNameQueryVariables>({ query: GetStudentByNameDocument, ...options });
};
export const GetStudentCasesDocument = gql`
    query GetStudentCases($studentId: Float!) {
  getStudentCases(studentId: $studentId) {
    id
    createdAt
    updatedAt
    category
    firstName
    lastName
    gradeClass
    gender
    ageInput
    isActive
    voteCount
    wasEdited
    creator {
      errors {
        field
        message
      }
      admin {
        id
        createdAt
        adminName
        phoneNumber
        email
        isDisabled
        profileImgUrl
        school
      }
    }
  }
}
    `;

export function useGetStudentCasesQuery(options: Omit<Urql.UseQueryArgs<GetStudentCasesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStudentCasesQuery, GetStudentCasesQueryVariables>({ query: GetStudentCasesDocument, ...options });
};
export const GetStudentFromClassDocument = gql`
    query GetStudentFromClass($gradeClass: String!) {
  getStudentFromClass(gradeClass: $gradeClass) {
    id
    createdAt
    firstName
    lastName
    gradeClass
    gender
    ageInput
    birthDate
    isArchived
    profileImgUrl
    school {
      errors {
        field
        message
      }
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
      }
    }
    creator {
      admin {
        id
        createdAt
        adminName
        phoneNumber
        email
        isDisabled
        profileImgUrl
        school
      }
    }
    parentName
    parentEmail
    parentNumber
    homeAddress
    state
  }
}
    `;

export function useGetStudentFromClassQuery(options: Omit<Urql.UseQueryArgs<GetStudentFromClassQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStudentFromClassQuery, GetStudentFromClassQueryVariables>({ query: GetStudentFromClassDocument, ...options });
};
export const GetStudentFromSchoolDocument = gql`
    query GetStudentFromSchool($schoolId: String!) {
  getStudentFromSchool(schoolId: $schoolId) {
    id
    createdAt
    firstName
    lastName
    gradeClass
    gender
    ageInput
    birthDate
    isArchived
    profileImgUrl
    creator {
      errors {
        field
        message
      }
      admin {
        id
        createdAt
        adminName
        phoneNumber
        email
        isDisabled
        profileImgUrl
        school
      }
    }
    school {
      errors {
        field
        message
      }
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
        creator {
          admin {
            id
            createdAt
            adminName
            phoneNumber
            email
            isDisabled
            profileImgUrl
            school
          }
        }
      }
    }
  }
}
    `;

export function useGetStudentFromSchoolQuery(options: Omit<Urql.UseQueryArgs<GetStudentFromSchoolQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStudentFromSchoolQuery, GetStudentFromSchoolQueryVariables>({ query: GetStudentFromSchoolDocument, ...options });
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
      school
      schoolImg
    }
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const SchoolCasesDocument = gql`
    query SchoolCases($limit: Float!, $cursor: Float, $sortBy: String) {
  schoolCases(limit: $limit, cursor: $cursor, sortBy: $sortBy) {
    grayCase {
      id
      createdAt
      updatedAt
      category
      firstName
      lastName
      gradeClass
      gender
      ageInput
      isActive
      voteCount
      wasEdited
      creator {
        errors {
          field
          message
        }
        admin {
          id
          createdAt
          adminName
          phoneNumber
          email
          isDisabled
          profileImgUrl
          school
        }
      }
    }
    hasMore
    cursor
  }
}
    `;

export function useSchoolCasesQuery(options: Omit<Urql.UseQueryArgs<SchoolCasesQueryVariables>, 'query'>) {
  return Urql.useQuery<SchoolCasesQuery, SchoolCasesQueryVariables>({ query: SchoolCasesDocument, ...options });
};