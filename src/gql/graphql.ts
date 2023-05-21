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
  isSuper: Scalars['Boolean'];
  phoneNumber: Scalars['String'];
  premiumAdmin: Scalars['Boolean'];
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
  firstName: Scalars['String'];
  gender: Scalars['String'];
  gradeClass: Scalars['String'];
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  lastName: Scalars['String'];
  note: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  wasEdited: Scalars['Boolean'];
};

export type GrayCaseResponse = {
  __typename?: 'GrayCaseResponse';
  errors?: Maybe<Array<FieldError>>;
  grayCase?: Maybe<GrayCase>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptRequest: Scalars['Boolean'];
  addGrayCase: GrayCaseResponse;
  archiveGrayCase: Scalars['Boolean'];
  changePassword: AdminResponse;
  createNotes: NotesResponse;
  createRequest: RequestsResponse;
  deleteGrayCase: Scalars['Boolean'];
  deleteNote: Scalars['Boolean'];
  deleteRequest: Scalars['Boolean'];
  deleteStudent: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  loginAdmin: AdminResponse;
  loginSuperAdmin: SuperAdminResponse;
  logoutAdmin: Scalars['Boolean'];
  logoutUser: Scalars['Boolean'];
  registerAdmin: AdminResponse;
  registerSchool: SchoolResponse;
  registerStudent: StudentResponse;
  registerSuperAdmin: SuperAdminResponse;
  rejectRequest: Scalars['Boolean'];
  searchStudent: Array<Student>;
  transferStudent: Scalars['Boolean'];
  updateAdminDetails: Scalars['Boolean'];
  updateGrayCase: GrayCaseResponse;
  updateNotes: NotesResponse;
  updateSchoolDetails: Scalars['Boolean'];
  updateStudentDetails: Scalars['Boolean'];
  updateSuperAdminDetails: Scalars['Boolean'];
};


export type MutationAcceptRequestArgs = {
  id: Scalars['Float'];
};


export type MutationAddGrayCaseArgs = {
  category: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  studentId: Scalars['Float'];
};


export type MutationArchiveGrayCaseArgs = {
  id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateNotesArgs = {
  body?: InputMaybe<Scalars['String']>;
  category: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateRequestArgs = {
  message: Scalars['String'];
  studentId: Scalars['Float'];
};


export type MutationDeleteGrayCaseArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteNoteArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteRequestArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteStudentArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginAdminArgs = {
  adminNameOrEmail: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginSuperAdminArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterAdminArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegisterSchoolArgs = {
  address: Scalars['String'];
  description: Scalars['String'];
  lgarea: Scalars['String'];
  license: Scalars['String'];
  logoImgUrl: Scalars['String'];
  rcnumber: Scalars['Float'];
  schoolName: Scalars['String'];
  state: Scalars['String'];
};


export type MutationRegisterStudentArgs = {
  academicResult: Scalars['String'];
  ageInput: Scalars['Float'];
  birthDate: Scalars['DateTime'];
  endDate: Scalars['String'];
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
  startDate: Scalars['String'];
  state: Scalars['String'];
};


export type MutationRegisterSuperAdminArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  profileImgUrl: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRejectRequestArgs = {
  id: Scalars['Float'];
};


export type MutationSearchStudentArgs = {
  ageInput?: InputMaybe<Scalars['Float']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  gradeClass?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};


export type MutationTransferStudentArgs = {
  adminId: Scalars['Float'];
  schoolId: Scalars['Float'];
  studentId: Scalars['Float'];
};


export type MutationUpdateAdminDetailsArgs = {
  adminName: Scalars['String'];
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
  profileImgUrl: Scalars['String'];
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


export type MutationUpdateNotesArgs = {
  body?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateSchoolDetailsArgs = {
  address: Scalars['String'];
  bannerImgUrl?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  facebookUrl?: InputMaybe<Scalars['String']>;
  instagramUrl?: InputMaybe<Scalars['String']>;
  linkedinUrl?: InputMaybe<Scalars['String']>;
  logoImgUrl?: InputMaybe<Scalars['String']>;
  rcnumber: Scalars['Float'];
  schoolId: Scalars['Float'];
  schoolName: Scalars['String'];
  state: Scalars['String'];
  twitterUrl?: InputMaybe<Scalars['String']>;
  websiteUrl?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateStudentDetailsArgs = {
  academicResult: Scalars['String'];
  ageInput: Scalars['Float'];
  birthDate: Scalars['DateTime'];
  endDate: Scalars['String'];
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
  startDate: Scalars['String'];
  state: Scalars['String'];
  studentId: Scalars['Float'];
};


export type MutationUpdateSuperAdminDetailsArgs = {
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
  profileImgUrl: Scalars['String'];
  username: Scalars['String'];
};

export type Notes = {
  __typename?: 'Notes';
  body: Scalars['String'];
  bodySnippet: Scalars['String'];
  category: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: AdminResponse;
  id: Scalars['Float'];
  isDisabled: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  wasEdited: Scalars['Boolean'];
};

export type NotesResponse = {
  __typename?: 'NotesResponse';
  errors?: Maybe<Array<FieldError>>;
  notes?: Maybe<Notes>;
};

export type PaginatedGrayCase = {
  __typename?: 'PaginatedGrayCase';
  cursor: Scalars['Float'];
  grayCase?: Maybe<Array<GrayCase>>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedNotes = {
  __typename?: 'PaginatedNotes';
  cursor: Scalars['Float'];
  hasMore: Scalars['Boolean'];
  notes?: Maybe<Array<Notes>>;
};

export type PaginatedRequests = {
  __typename?: 'PaginatedRequests';
  cursor: Scalars['Float'];
  hasMore: Scalars['Boolean'];
  requests?: Maybe<Array<Requests>>;
};

export type Query = {
  __typename?: 'Query';
  admin?: Maybe<AdminResponse>;
  adminCaseCount: Scalars['Float'];
  adminNotes: PaginatedNotes;
  adminRequests: PaginatedRequests;
  adminStudentCount: Scalars['Float'];
  dir?: Maybe<SuperAdminResponse>;
  getAdminGrayCases: Array<GrayCase>;
  getAdminStudents: Array<Student>;
  getAdmins: Array<Admin>;
  getCaseCount: Scalars['Float'];
  getClassCount: Scalars['Float'];
  getGrayCase: GrayCaseResponse;
  getNotes: NotesResponse;
  getRequests: RequestsResponse;
  getSchoolByName: SchoolResponse;
  getSchoolCasesCount: Scalars['Float'];
  getSchoolStudentsCount: Scalars['Float'];
  getSchools: Array<School>;
  getStudent: Array<Student>;
  getStudentByGrayCase: StudentResponse;
  getStudentById: StudentResponse;
  getStudentByName: StudentResponse;
  getStudentCaseCount: Scalars['Float'];
  getStudentCases: Array<GrayCase>;
  getStudentFromClass: Array<Student>;
  getStudentFromSchool: Array<Student>;
  getStudentSchools: Array<School>;
  me?: Maybe<AdminResponse>;
  schoolCases: PaginatedGrayCase;
  schoolRequests: PaginatedRequests;
  searchStudentByFirstName: Array<Student>;
  studentCases: PaginatedGrayCase;
  trendingCases: PaginatedGrayCase;
};


export type QueryAdminArgs = {
  adminName: Scalars['String'];
};


export type QueryAdminNotesArgs = {
  cursor?: InputMaybe<Scalars['Float']>;
  limit: Scalars['Float'];
  sortBy?: InputMaybe<Scalars['String']>;
};


export type QueryAdminRequestsArgs = {
  cursor?: InputMaybe<Scalars['Float']>;
  limit: Scalars['Float'];
  sortBy?: InputMaybe<Scalars['String']>;
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


export type QueryGetNotesArgs = {
  id: Scalars['Float'];
};


export type QueryGetRequestsArgs = {
  id: Scalars['Float'];
};


export type QueryGetSchoolByNameArgs = {
  schoolName: Scalars['String'];
};


export type QueryGetSchoolCasesCountArgs = {
  schoolId: Scalars['Float'];
};


export type QueryGetSchoolStudentsCountArgs = {
  schoolId: Scalars['Float'];
};


export type QueryGetStudentByGrayCaseArgs = {
  grayId: Scalars['Float'];
};


export type QueryGetStudentByIdArgs = {
  studentId: Scalars['Float'];
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
  schoolId: Scalars['Float'];
};


export type QueryGetStudentSchoolsArgs = {
  studentId: Scalars['Float'];
};


export type QuerySchoolCasesArgs = {
  cursor?: InputMaybe<Scalars['Float']>;
  limit: Scalars['Float'];
  sortBy?: InputMaybe<Scalars['String']>;
};


export type QuerySchoolRequestsArgs = {
  cursor?: InputMaybe<Scalars['Float']>;
  limit: Scalars['Float'];
  schoolId: Scalars['Float'];
  sortBy?: InputMaybe<Scalars['String']>;
};


export type QuerySearchStudentByFirstNameArgs = {
  firstname: Scalars['String'];
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

export type Requests = {
  __typename?: 'Requests';
  accepted: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  message: Scalars['String'];
  status: Scalars['String'];
  student: Student;
  updatedAt: Scalars['DateTime'];
};

export type RequestsResponse = {
  __typename?: 'RequestsResponse';
  errors?: Maybe<Array<FieldError>>;
  requests?: Maybe<Requests>;
};

export type School = {
  __typename?: 'School';
  address: Scalars['String'];
  bannerImgUrl: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator?: Maybe<AdminResponse>;
  description: Scalars['String'];
  facebookUrl: Scalars['String'];
  id: Scalars['Float'];
  instagramUrl: Scalars['String'];
  lgarea: Scalars['String'];
  license: Scalars['String'];
  linkedinUrl: Scalars['String'];
  logoImgUrl: Scalars['String'];
  rcnumber: Scalars['Float'];
  schoolName: Scalars['String'];
  state: Scalars['String'];
  twitterUrl: Scalars['String'];
  websiteUrl: Scalars['String'];
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
  endDate: Scalars['String'];
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
  startDate: Scalars['String'];
  state: Scalars['String'];
};

export type StudentResponse = {
  __typename?: 'StudentResponse';
  errors?: Maybe<Array<FieldError>>;
  student?: Maybe<Student>;
};

export type SuperAdmin = {
  __typename?: 'SuperAdmin';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  isSuper: Scalars['Boolean'];
  phoneNumber: Scalars['String'];
  profileImgUrl: Scalars['String'];
  username: Scalars['String'];
};

export type SuperAdminResponse = {
  __typename?: 'SuperAdminResponse';
  errors?: Maybe<Array<FieldError>>;
  superAdmin?: Maybe<SuperAdmin>;
};

export type UsernamePasswordInput = {
  adminName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type AcceptRequestMutationVariables = Exact<{
  acceptRequestId: Scalars['Float'];
}>;


export type AcceptRequestMutation = { __typename?: 'Mutation', acceptRequest: boolean };

export type AddGrayCaseMutationVariables = Exact<{
  studentId: Scalars['Float'];
  category: Scalars['String'];
  note: Scalars['String'];
}>;


export type AddGrayCaseMutation = { __typename?: 'Mutation', addGrayCase: { __typename?: 'GrayCaseResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, grayCase?: { __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, note: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, wasEdited: boolean, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } } | null } };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, isSuper: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } };

export type CreateNotesMutationVariables = Exact<{
  title: Scalars['String'];
  category: Scalars['String'];
  body?: InputMaybe<Scalars['String']>;
}>;


export type CreateNotesMutation = { __typename?: 'Mutation', createNotes: { __typename?: 'NotesResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, notes?: { __typename?: 'Notes', id: number, createdAt: any, updatedAt: any, category: string, title: string, body: string, isDisabled: boolean, wasEdited: boolean, bodySnippet: string, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } } | null } };

export type CreateRequestMutationVariables = Exact<{
  message: Scalars['String'];
  studentId: Scalars['Float'];
}>;


export type CreateRequestMutation = { __typename?: 'Mutation', createRequest: { __typename?: 'RequestsResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, requests?: { __typename?: 'Requests', id: number, message: string, status: string, accepted: boolean, createdAt: any, updatedAt: any, student: { __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, startDate: string, endDate: string, birthDate: any, isArchived: boolean, profileImgUrl: string, grayId: string, parentName: string, parentEmail: string, parentNumber: string, homeAddress: string, state: string, academicResult: string, school: { __typename?: 'SchoolResponse', school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, state: string, country: string, description: string, logoImgUrl: string, bannerImgUrl: string } | null }, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null }, studentCase: { __typename?: 'GrayCaseResponse', grayCase?: { __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, wasEdited: boolean } | null } } } | null } };

export type DeleteNoteMutationVariables = Exact<{
  deleteNoteId: Scalars['Float'];
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', deleteNote: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

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


export type RegisterAdminMutation = { __typename?: 'Mutation', registerAdmin: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } };

export type RegisterSchoolMutationVariables = Exact<{
  license: Scalars['String'];
  logoImgUrl: Scalars['String'];
  lgarea: Scalars['String'];
  state: Scalars['String'];
  description: Scalars['String'];
  address: Scalars['String'];
  rcnumber: Scalars['Float'];
  schoolName: Scalars['String'];
}>;


export type RegisterSchoolMutation = { __typename?: 'Mutation', registerSchool: { __typename?: 'SchoolResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, lgarea: string, state: string, country: string, description: string, websiteUrl: string, instagramUrl: string, facebookUrl: string, twitterUrl: string, linkedinUrl: string, logoImgUrl: string, bannerImgUrl: string, license: string, creator?: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } | null } | null } };

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
  endDate: Scalars['String'];
  startDate: Scalars['String'];
  ageInput: Scalars['Float'];
  gender: Scalars['String'];
  gradeClass: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
}>;


export type RegisterStudentMutation = { __typename?: 'Mutation', registerStudent: { __typename?: 'StudentResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, student?: { __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, startDate: string, endDate: string, birthDate: any, isArchived: boolean, profileImgUrl: string, grayId: string, parentName: string, parentEmail: string, parentNumber: string, homeAddress: string, state: string, academicResult: string, school: { __typename?: 'SchoolResponse', school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, state: string, country: string, description: string, websiteUrl: string, instagramUrl: string, facebookUrl: string, twitterUrl: string, linkedinUrl: string, logoImgUrl: string, bannerImgUrl: string } | null }, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null }, studentCase: { __typename?: 'GrayCaseResponse', grayCase?: { __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, wasEdited: boolean } | null } } | null } };

export type RejectRequestMutationVariables = Exact<{
  rejectRequestId: Scalars['Float'];
}>;


export type RejectRequestMutation = { __typename?: 'Mutation', rejectRequest: boolean };

export type SearchStudentMutationVariables = Exact<{
  lastName?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  ageInput?: InputMaybe<Scalars['Float']>;
  gender?: InputMaybe<Scalars['String']>;
  gradeClass?: InputMaybe<Scalars['String']>;
}>;


export type SearchStudentMutation = { __typename?: 'Mutation', searchStudent: Array<{ __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, startDate: string, endDate: string, birthDate: any, isArchived: boolean, grayId: string, parentName: string, parentEmail: string, parentNumber: string, homeAddress: string, state: string, profileImgUrl: string, academicResult: string, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, school: string } | null }, school: { __typename?: 'SchoolResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, lgarea: string, state: string, country: string, description: string, websiteUrl: string, instagramUrl: string, facebookUrl: string, twitterUrl: string, linkedinUrl: string, logoImgUrl: string, bannerImgUrl: string, license: string, creator?: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } | null } | null }, studentCase: { __typename?: 'GrayCaseResponse', grayCase?: { __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, wasEdited: boolean } | null } }> };

export type TransferStudentMutationVariables = Exact<{
  schoolId: Scalars['Float'];
  studentId: Scalars['Float'];
  adminId: Scalars['Float'];
}>;


export type TransferStudentMutation = { __typename?: 'Mutation', transferStudent: boolean };

export type UpdateAdminDetailsMutationVariables = Exact<{
  profileImgUrl: Scalars['String'];
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
  adminName: Scalars['String'];
}>;


export type UpdateAdminDetailsMutation = { __typename?: 'Mutation', updateAdminDetails: boolean };

export type UpdateSchoolDetailsMutationVariables = Exact<{
  state: Scalars['String'];
  address: Scalars['String'];
  rcnumber: Scalars['Float'];
  schoolName: Scalars['String'];
  schoolId: Scalars['Float'];
  facebookUrl?: InputMaybe<Scalars['String']>;
  linkedinUrl?: InputMaybe<Scalars['String']>;
  twitterUrl?: InputMaybe<Scalars['String']>;
  instagramUrl?: InputMaybe<Scalars['String']>;
  websiteUrl?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  bannerImgUrl?: InputMaybe<Scalars['String']>;
  logoImgUrl?: InputMaybe<Scalars['String']>;
}>;


export type UpdateSchoolDetailsMutation = { __typename?: 'Mutation', updateSchoolDetails: boolean };

export type UpdateStudentDetailsMutationVariables = Exact<{
  profileImgUrl: Scalars['String'];
  academicResult: Scalars['String'];
  lgaOrigin: Scalars['String'];
  state: Scalars['String'];
  homeAddress: Scalars['String'];
  parentEmail: Scalars['String'];
  parentNumber: Scalars['String'];
  parentName: Scalars['String'];
  birthDate: Scalars['DateTime'];
  endDate: Scalars['String'];
  startDate: Scalars['String'];
  ageInput: Scalars['Float'];
  gender: Scalars['String'];
  gradeClass: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  studentId: Scalars['Float'];
}>;


export type UpdateStudentDetailsMutation = { __typename?: 'Mutation', updateStudentDetails: boolean };

export type AdminCaseCountQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminCaseCountQuery = { __typename?: 'Query', adminCaseCount: number };

export type AdminNotesQueryVariables = Exact<{
  limit: Scalars['Float'];
  sortBy?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['Float']>;
}>;


export type AdminNotesQuery = { __typename?: 'Query', adminNotes: { __typename?: 'PaginatedNotes', hasMore: boolean, cursor: number, notes?: Array<{ __typename?: 'Notes', id: number, createdAt: any, updatedAt: any, category: string, title: string, body: string, isDisabled: boolean, wasEdited: boolean, bodySnippet: string, creator: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } }> | null } };

export type AdminRequestsQueryVariables = Exact<{
  limit: Scalars['Float'];
  cursor?: InputMaybe<Scalars['Float']>;
  sortBy?: InputMaybe<Scalars['String']>;
}>;


export type AdminRequestsQuery = { __typename?: 'Query', adminRequests: { __typename?: 'PaginatedRequests', hasMore: boolean, cursor: number, requests?: Array<{ __typename?: 'Requests', id: number, message: string, status: string, accepted: boolean, createdAt: any, updatedAt: any, student: { __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, startDate: string, endDate: string, birthDate: any, isArchived: boolean, profileImgUrl: string, grayId: string, parentName: string, parentEmail: string, parentNumber: string, homeAddress: string, state: string, academicResult: string, school: { __typename?: 'SchoolResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, lgarea: string, state: string, country: string, description: string, websiteUrl: string, instagramUrl: string, facebookUrl: string, twitterUrl: string, linkedinUrl: string, logoImgUrl: string, bannerImgUrl: string, license: string } | null }, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null }, studentCase: { __typename?: 'GrayCaseResponse', grayCase?: { __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, note: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, wasEdited: boolean } | null } } }> | null } };

export type AdminStudentCountQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminStudentCountQuery = { __typename?: 'Query', adminStudentCount: number };

export type GetAdminsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminsQuery = { __typename?: 'Query', getAdmins: Array<{ __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string }> };

export type GetCaseCountQueryVariables = Exact<{
  getCaseCountId: Scalars['Float'];
}>;


export type GetCaseCountQuery = { __typename?: 'Query', getCaseCount: number };

export type GetClassCountQueryVariables = Exact<{
  gradeClass: Scalars['String'];
}>;


export type GetClassCountQuery = { __typename?: 'Query', getClassCount: number };

export type GetGrayCaseQueryVariables = Exact<{
  getGrayCaseId: Scalars['Float'];
}>;


export type GetGrayCaseQuery = { __typename?: 'Query', getGrayCase: { __typename?: 'GrayCaseResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, grayCase?: { __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, note: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, wasEdited: boolean, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, school: string } | null } } | null } };

export type GetNotesQueryVariables = Exact<{
  getNotesId: Scalars['Float'];
}>;


export type GetNotesQuery = { __typename?: 'Query', getNotes: { __typename?: 'NotesResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, notes?: { __typename?: 'Notes', id: number, createdAt: any, updatedAt: any, category: string, title: string, body: string, isDisabled: boolean, wasEdited: boolean, bodySnippet: string, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } } | null } };

export type GetSchoolByNameQueryVariables = Exact<{
  schoolName: Scalars['String'];
}>;


export type GetSchoolByNameQuery = { __typename?: 'Query', getSchoolByName: { __typename?: 'SchoolResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, lgarea: string, state: string, country: string, description: string, websiteUrl: string, instagramUrl: string, facebookUrl: string, twitterUrl: string, linkedinUrl: string, logoImgUrl: string, bannerImgUrl: string, license: string, creator?: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } | null } | null } };

export type GetSchoolCasesCountQueryVariables = Exact<{
  schoolId: Scalars['Float'];
}>;


export type GetSchoolCasesCountQuery = { __typename?: 'Query', getSchoolCasesCount: number };

export type GetSchoolStudentsCountQueryVariables = Exact<{
  schoolId: Scalars['Float'];
}>;


export type GetSchoolStudentsCountQuery = { __typename?: 'Query', getSchoolStudentsCount: number };

export type GetSchoolsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSchoolsQuery = { __typename?: 'Query', getSchools: Array<{ __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, state: string, country: string, description: string, logoImgUrl: string, bannerImgUrl: string, creator?: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } | null }> };

export type GetStudentByGrayCaseQueryVariables = Exact<{
  grayId: Scalars['Float'];
}>;


export type GetStudentByGrayCaseQuery = { __typename?: 'Query', getStudentByGrayCase: { __typename?: 'StudentResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, student?: { __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, startDate: string, endDate: string, birthDate: any, isArchived: boolean, profileImgUrl: string, grayId: string, parentName: string, parentEmail: string, parentNumber: string, homeAddress: string, state: string, academicResult: string, school: { __typename?: 'SchoolResponse', school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, state: string, country: string, description: string, websiteUrl: string, instagramUrl: string, facebookUrl: string, twitterUrl: string, linkedinUrl: string, logoImgUrl: string, bannerImgUrl: string } | null }, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string, isSuper: boolean } | null }, studentCase: { __typename?: 'GrayCaseResponse', grayCase?: { __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, wasEdited: boolean } | null } } | null } };

export type GetStudentByIdQueryVariables = Exact<{
  studentId: Scalars['Float'];
}>;


export type GetStudentByIdQuery = { __typename?: 'Query', getStudentById: { __typename?: 'StudentResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, student?: { __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, startDate: string, endDate: string, birthDate: any, isArchived: boolean, profileImgUrl: string, grayId: string, parentName: string, parentEmail: string, parentNumber: string, homeAddress: string, state: string, academicResult: string, school: { __typename?: 'SchoolResponse', school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, lgarea: string, state: string, country: string, description: string, websiteUrl: string, instagramUrl: string, facebookUrl: string, twitterUrl: string, linkedinUrl: string, logoImgUrl: string, bannerImgUrl: string, license: string } | null }, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } } | null } };

export type GetStudentByNameQueryVariables = Exact<{
  firstName: Scalars['String'];
}>;


export type GetStudentByNameQuery = { __typename?: 'Query', getStudentByName: { __typename?: 'StudentResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, student?: { __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, birthDate: any, isArchived: boolean, profileImgUrl: string, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string } | null } } | null } };

export type GetStudentCasesQueryVariables = Exact<{
  studentId: Scalars['Float'];
}>;


export type GetStudentCasesQuery = { __typename?: 'Query', getStudentCases: Array<{ __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, note: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, wasEdited: boolean, creator: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, isSuper: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } }> };

export type GetStudentFromClassQueryVariables = Exact<{
  gradeClass: Scalars['String'];
}>;


export type GetStudentFromClassQuery = { __typename?: 'Query', getStudentFromClass: Array<{ __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, startDate: string, endDate: string, birthDate: any, isArchived: boolean, profileImgUrl: string, grayId: string, parentName: string, parentEmail: string, parentNumber: string, homeAddress: string, state: string, academicResult: string, school: { __typename?: 'SchoolResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, lgarea: string, state: string, country: string, description: string, websiteUrl: string, instagramUrl: string, facebookUrl: string, twitterUrl: string, linkedinUrl: string, logoImgUrl: string, bannerImgUrl: string, license: string } | null }, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null }, studentCase: { __typename?: 'GrayCaseResponse', grayCase?: { __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, note: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, wasEdited: boolean } | null } }> };

export type GetStudentFromSchoolQueryVariables = Exact<{
  schoolId: Scalars['Float'];
}>;


export type GetStudentFromSchoolQuery = { __typename?: 'Query', getStudentFromSchool: Array<{ __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, startDate: string, endDate: string, birthDate: any, isArchived: boolean, profileImgUrl: string, grayId: string, parentName: string, parentEmail: string, parentNumber: string, homeAddress: string, state: string, academicResult: string, school: { __typename?: 'SchoolResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, lgarea: string, state: string, country: string, description: string, websiteUrl: string, instagramUrl: string, facebookUrl: string, twitterUrl: string, linkedinUrl: string, logoImgUrl: string, bannerImgUrl: string, license: string } | null }, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null }, studentCase: { __typename?: 'GrayCaseResponse', grayCase?: { __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, note: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, wasEdited: boolean } | null } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } | null };

export type SchoolCasesQueryVariables = Exact<{
  limit: Scalars['Float'];
  sortBy?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['Float']>;
}>;


export type SchoolCasesQuery = { __typename?: 'Query', schoolCases: { __typename?: 'PaginatedGrayCase', hasMore: boolean, cursor: number, grayCase?: Array<{ __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, note: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, wasEdited: boolean, creator: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null } }> | null } };

export type SchoolRequestsQueryVariables = Exact<{
  limit: Scalars['Float'];
  schoolId: Scalars['Float'];
  sortBy?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['Float']>;
}>;


export type SchoolRequestsQuery = { __typename?: 'Query', schoolRequests: { __typename?: 'PaginatedRequests', hasMore: boolean, cursor: number, requests?: Array<{ __typename?: 'Requests', id: number, message: string, status: string, accepted: boolean, createdAt: any, updatedAt: any, student: { __typename?: 'Student', id: number, createdAt: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, startDate: string, endDate: string, birthDate: any, isArchived: boolean, profileImgUrl: string, grayId: string, parentName: string, parentEmail: string, parentNumber: string, homeAddress: string, state: string, academicResult: string, school: { __typename?: 'SchoolResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, school?: { __typename?: 'School', id: number, createdAt: any, schoolName: string, rcnumber: number, address: string, lgarea: string, state: string, country: string, description: string, websiteUrl: string, instagramUrl: string, facebookUrl: string, twitterUrl: string, linkedinUrl: string, logoImgUrl: string, bannerImgUrl: string, license: string } | null }, creator: { __typename?: 'AdminResponse', admin?: { __typename?: 'Admin', id: number, isSuper: boolean, premiumAdmin: boolean, createdAt: string, adminName: string, phoneNumber: string, email: string, isDisabled: boolean, profileImgUrl: string, school: string, schoolImg: string } | null }, studentCase: { __typename?: 'GrayCaseResponse', grayCase?: { __typename?: 'GrayCase', id: number, createdAt: any, updatedAt: any, category: string, note: string, firstName: string, lastName: string, gradeClass: string, gender: string, ageInput: number, isActive: boolean, wasEdited: boolean } | null } } }> | null } };


export const AcceptRequestDocument = gql`
    mutation AcceptRequest($acceptRequestId: Float!) {
  acceptRequest(id: $acceptRequestId)
}
    `;

export function useAcceptRequestMutation() {
  return Urql.useMutation<AcceptRequestMutation, AcceptRequestMutationVariables>(AcceptRequestDocument);
};
export const AddGrayCaseDocument = gql`
    mutation AddGrayCase($studentId: Float!, $category: String!, $note: String!) {
  addGrayCase(studentId: $studentId, category: $category, note: $note) {
    errors {
      field
      message
    }
    grayCase {
      id
      createdAt
      updatedAt
      category
      note
      firstName
      lastName
      gradeClass
      gender
      ageInput
      isActive
      wasEdited
      creator {
        admin {
          id
          isSuper
          premiumAdmin
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
}
    `;

export function useAddGrayCaseMutation() {
  return Urql.useMutation<AddGrayCaseMutation, AddGrayCaseMutationVariables>(AddGrayCaseDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    errors {
      field
      message
    }
    admin {
      id
      isSuper
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
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateNotesDocument = gql`
    mutation CreateNotes($title: String!, $category: String!, $body: String) {
  createNotes(title: $title, category: $category, body: $body) {
    errors {
      field
      message
    }
    notes {
      id
      createdAt
      updatedAt
      category
      title
      body
      isDisabled
      wasEdited
      bodySnippet
      creator {
        admin {
          id
          isSuper
          premiumAdmin
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
}
    `;

export function useCreateNotesMutation() {
  return Urql.useMutation<CreateNotesMutation, CreateNotesMutationVariables>(CreateNotesDocument);
};
export const CreateRequestDocument = gql`
    mutation CreateRequest($message: String!, $studentId: Float!) {
  createRequest(message: $message, studentId: $studentId) {
    errors {
      field
      message
    }
    requests {
      id
      message
      student {
        id
        createdAt
        firstName
        lastName
        gradeClass
        gender
        ageInput
        startDate
        endDate
        birthDate
        isArchived
        profileImgUrl
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
            schoolImg
          }
        }
        studentCase {
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
            wasEdited
          }
        }
        grayId
        parentName
        parentEmail
        parentNumber
        homeAddress
        state
        academicResult
      }
      status
      accepted
      createdAt
      updatedAt
    }
  }
}
    `;

export function useCreateRequestMutation() {
  return Urql.useMutation<CreateRequestMutation, CreateRequestMutationVariables>(CreateRequestDocument);
};
export const DeleteNoteDocument = gql`
    mutation DeleteNote($deleteNoteId: Float!) {
  deleteNote(id: $deleteNoteId)
}
    `;

export function useDeleteNoteMutation() {
  return Urql.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
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
      isSuper
      premiumAdmin
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
    `;

export function useRegisterAdminMutation() {
  return Urql.useMutation<RegisterAdminMutation, RegisterAdminMutationVariables>(RegisterAdminDocument);
};
export const RegisterSchoolDocument = gql`
    mutation RegisterSchool($license: String!, $logoImgUrl: String!, $lgarea: String!, $state: String!, $description: String!, $address: String!, $rcnumber: Float!, $schoolName: String!) {
  registerSchool(
    license: $license
    logoImgUrl: $logoImgUrl
    lgarea: $lgarea
    state: $state
    description: $description
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
      lgarea
      state
      country
      description
      websiteUrl
      instagramUrl
      facebookUrl
      twitterUrl
      linkedinUrl
      logoImgUrl
      bannerImgUrl
      license
      creator {
        admin {
          id
          isSuper
          premiumAdmin
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
}
    `;

export function useRegisterSchoolMutation() {
  return Urql.useMutation<RegisterSchoolMutation, RegisterSchoolMutationVariables>(RegisterSchoolDocument);
};
export const RegisterStudentDocument = gql`
    mutation RegisterStudent($profileImgUrl: String!, $academicResult: String!, $lgaOrigin: String!, $state: String!, $homeAddress: String!, $parentEmail: String!, $parentNumber: String!, $parentName: String!, $birthDate: DateTime!, $endDate: String!, $startDate: String!, $ageInput: Float!, $gender: String!, $gradeClass: String!, $lastName: String!, $firstName: String!) {
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
    endDate: $endDate
    startDate: $startDate
    ageInput: $ageInput
    gender: $gender
    gradeClass: $gradeClass
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
      startDate
      endDate
      birthDate
      isArchived
      profileImgUrl
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
          websiteUrl
          instagramUrl
          facebookUrl
          twitterUrl
          linkedinUrl
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
          schoolImg
        }
      }
      studentCase {
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
          wasEdited
        }
      }
      grayId
      parentName
      parentEmail
      parentNumber
      homeAddress
      state
      academicResult
    }
  }
}
    `;

export function useRegisterStudentMutation() {
  return Urql.useMutation<RegisterStudentMutation, RegisterStudentMutationVariables>(RegisterStudentDocument);
};
export const RejectRequestDocument = gql`
    mutation RejectRequest($rejectRequestId: Float!) {
  rejectRequest(id: $rejectRequestId)
}
    `;

export function useRejectRequestMutation() {
  return Urql.useMutation<RejectRequestMutation, RejectRequestMutationVariables>(RejectRequestDocument);
};
export const SearchStudentDocument = gql`
    mutation SearchStudent($lastName: String, $firstName: String, $ageInput: Float, $gender: String, $gradeClass: String) {
  searchStudent(
    lastName: $lastName
    firstName: $firstName
    ageInput: $ageInput
    gender: $gender
    gradeClass: $gradeClass
  ) {
    id
    createdAt
    firstName
    lastName
    gradeClass
    gender
    ageInput
    startDate
    endDate
    birthDate
    isArchived
    grayId
    parentName
    parentEmail
    parentNumber
    homeAddress
    state
    creator {
      admin {
        id
        isSuper
        premiumAdmin
        createdAt
        adminName
        school
      }
    }
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
        lgarea
        state
        country
        description
        websiteUrl
        instagramUrl
        facebookUrl
        twitterUrl
        linkedinUrl
        logoImgUrl
        bannerImgUrl
        license
        creator {
          admin {
            id
            isSuper
            premiumAdmin
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
    studentCase {
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
        wasEdited
      }
    }
    academicResult
  }
}
    `;

export function useSearchStudentMutation() {
  return Urql.useMutation<SearchStudentMutation, SearchStudentMutationVariables>(SearchStudentDocument);
};
export const TransferStudentDocument = gql`
    mutation TransferStudent($schoolId: Float!, $studentId: Float!, $adminId: Float!) {
  transferStudent(schoolId: $schoolId, studentId: $studentId, adminId: $adminId)
}
    `;

export function useTransferStudentMutation() {
  return Urql.useMutation<TransferStudentMutation, TransferStudentMutationVariables>(TransferStudentDocument);
};
export const UpdateAdminDetailsDocument = gql`
    mutation UpdateAdminDetails($profileImgUrl: String!, $email: String!, $phoneNumber: String!, $adminName: String!) {
  updateAdminDetails(
    profileImgUrl: $profileImgUrl
    email: $email
    phoneNumber: $phoneNumber
    adminName: $adminName
  )
}
    `;

export function useUpdateAdminDetailsMutation() {
  return Urql.useMutation<UpdateAdminDetailsMutation, UpdateAdminDetailsMutationVariables>(UpdateAdminDetailsDocument);
};
export const UpdateSchoolDetailsDocument = gql`
    mutation UpdateSchoolDetails($state: String!, $address: String!, $rcnumber: Float!, $schoolName: String!, $schoolId: Float!, $facebookUrl: String, $linkedinUrl: String, $twitterUrl: String, $instagramUrl: String, $websiteUrl: String, $description: String, $bannerImgUrl: String, $logoImgUrl: String) {
  updateSchoolDetails(
    state: $state
    address: $address
    rcnumber: $rcnumber
    schoolName: $schoolName
    schoolId: $schoolId
    facebookUrl: $facebookUrl
    linkedinUrl: $linkedinUrl
    twitterUrl: $twitterUrl
    instagramUrl: $instagramUrl
    websiteUrl: $websiteUrl
    description: $description
    bannerImgUrl: $bannerImgUrl
    logoImgUrl: $logoImgUrl
  )
}
    `;

export function useUpdateSchoolDetailsMutation() {
  return Urql.useMutation<UpdateSchoolDetailsMutation, UpdateSchoolDetailsMutationVariables>(UpdateSchoolDetailsDocument);
};
export const UpdateStudentDetailsDocument = gql`
    mutation UpdateStudentDetails($profileImgUrl: String!, $academicResult: String!, $lgaOrigin: String!, $state: String!, $homeAddress: String!, $parentEmail: String!, $parentNumber: String!, $parentName: String!, $birthDate: DateTime!, $endDate: String!, $startDate: String!, $ageInput: Float!, $gender: String!, $gradeClass: String!, $lastName: String!, $firstName: String!, $studentId: Float!) {
  updateStudentDetails(
    profileImgUrl: $profileImgUrl
    academicResult: $academicResult
    lgaOrigin: $lgaOrigin
    state: $state
    homeAddress: $homeAddress
    parentEmail: $parentEmail
    parentNumber: $parentNumber
    parentName: $parentName
    birthDate: $birthDate
    endDate: $endDate
    startDate: $startDate
    ageInput: $ageInput
    gender: $gender
    gradeClass: $gradeClass
    lastName: $lastName
    firstName: $firstName
    studentId: $studentId
  )
}
    `;

export function useUpdateStudentDetailsMutation() {
  return Urql.useMutation<UpdateStudentDetailsMutation, UpdateStudentDetailsMutationVariables>(UpdateStudentDetailsDocument);
};
export const AdminCaseCountDocument = gql`
    query AdminCaseCount {
  adminCaseCount
}
    `;

export function useAdminCaseCountQuery(options?: Omit<Urql.UseQueryArgs<AdminCaseCountQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminCaseCountQuery, AdminCaseCountQueryVariables>({ query: AdminCaseCountDocument, ...options });
};
export const AdminNotesDocument = gql`
    query AdminNotes($limit: Float!, $sortBy: String, $cursor: Float) {
  adminNotes(limit: $limit, sortBy: $sortBy, cursor: $cursor) {
    notes {
      id
      createdAt
      updatedAt
      category
      title
      body
      isDisabled
      wasEdited
      bodySnippet
      creator {
        errors {
          field
          message
        }
        admin {
          id
          isSuper
          premiumAdmin
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
    hasMore
    cursor
  }
}
    `;

export function useAdminNotesQuery(options: Omit<Urql.UseQueryArgs<AdminNotesQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminNotesQuery, AdminNotesQueryVariables>({ query: AdminNotesDocument, ...options });
};
export const AdminRequestsDocument = gql`
    query AdminRequests($limit: Float!, $cursor: Float, $sortBy: String) {
  adminRequests(limit: $limit, cursor: $cursor, sortBy: $sortBy) {
    requests {
      id
      message
      student {
        id
        createdAt
        firstName
        lastName
        gradeClass
        gender
        ageInput
        startDate
        endDate
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
            lgarea
            state
            country
            description
            websiteUrl
            instagramUrl
            facebookUrl
            twitterUrl
            linkedinUrl
            logoImgUrl
            bannerImgUrl
            license
          }
        }
        creator {
          admin {
            id
            isSuper
            premiumAdmin
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
        studentCase {
          grayCase {
            id
            createdAt
            updatedAt
            category
            note
            firstName
            lastName
            gradeClass
            gender
            ageInput
            isActive
            wasEdited
          }
        }
        grayId
        parentName
        parentEmail
        parentNumber
        homeAddress
        state
        academicResult
      }
      status
      accepted
      createdAt
      updatedAt
    }
    hasMore
    cursor
  }
}
    `;

export function useAdminRequestsQuery(options: Omit<Urql.UseQueryArgs<AdminRequestsQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminRequestsQuery, AdminRequestsQueryVariables>({ query: AdminRequestsDocument, ...options });
};
export const AdminStudentCountDocument = gql`
    query AdminStudentCount {
  adminStudentCount
}
    `;

export function useAdminStudentCountQuery(options?: Omit<Urql.UseQueryArgs<AdminStudentCountQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminStudentCountQuery, AdminStudentCountQueryVariables>({ query: AdminStudentCountDocument, ...options });
};
export const GetAdminsDocument = gql`
    query GetAdmins {
  getAdmins {
    id
    isSuper
    premiumAdmin
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
    `;

export function useGetAdminsQuery(options?: Omit<Urql.UseQueryArgs<GetAdminsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminsQuery, GetAdminsQueryVariables>({ query: GetAdminsDocument, ...options });
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
export const GetGrayCaseDocument = gql`
    query GetGrayCase($getGrayCaseId: Float!) {
  getGrayCase(id: $getGrayCaseId) {
    errors {
      field
      message
    }
    grayCase {
      id
      createdAt
      updatedAt
      category
      note
      firstName
      lastName
      gradeClass
      gender
      ageInput
      isActive
      wasEdited
      creator {
        admin {
          id
          isSuper
          premiumAdmin
          createdAt
          adminName
          phoneNumber
          email
          isDisabled
          school
        }
      }
    }
  }
}
    `;

export function useGetGrayCaseQuery(options: Omit<Urql.UseQueryArgs<GetGrayCaseQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGrayCaseQuery, GetGrayCaseQueryVariables>({ query: GetGrayCaseDocument, ...options });
};
export const GetNotesDocument = gql`
    query GetNotes($getNotesId: Float!) {
  getNotes(id: $getNotesId) {
    errors {
      field
      message
    }
    notes {
      id
      createdAt
      updatedAt
      category
      title
      body
      isDisabled
      wasEdited
      bodySnippet
      creator {
        admin {
          id
          isSuper
          premiumAdmin
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
}
    `;

export function useGetNotesQuery(options: Omit<Urql.UseQueryArgs<GetNotesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNotesQuery, GetNotesQueryVariables>({ query: GetNotesDocument, ...options });
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
      lgarea
      state
      country
      description
      websiteUrl
      instagramUrl
      facebookUrl
      twitterUrl
      linkedinUrl
      logoImgUrl
      bannerImgUrl
      license
      creator {
        admin {
          id
          isSuper
          premiumAdmin
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
}
    `;

export function useGetSchoolByNameQuery(options: Omit<Urql.UseQueryArgs<GetSchoolByNameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSchoolByNameQuery, GetSchoolByNameQueryVariables>({ query: GetSchoolByNameDocument, ...options });
};
export const GetSchoolCasesCountDocument = gql`
    query getSchoolCasesCount($schoolId: Float!) {
  getSchoolCasesCount(schoolId: $schoolId)
}
    `;

export function useGetSchoolCasesCountQuery(options: Omit<Urql.UseQueryArgs<GetSchoolCasesCountQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSchoolCasesCountQuery, GetSchoolCasesCountQueryVariables>({ query: GetSchoolCasesCountDocument, ...options });
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
export const GetStudentByGrayCaseDocument = gql`
    query GetStudentByGrayCase($grayId: Float!) {
  getStudentByGrayCase(grayId: $grayId) {
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
      startDate
      endDate
      birthDate
      isArchived
      profileImgUrl
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
          websiteUrl
          instagramUrl
          facebookUrl
          twitterUrl
          linkedinUrl
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
          schoolImg
          isSuper
        }
      }
      studentCase {
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
          wasEdited
        }
      }
      grayId
      parentName
      parentEmail
      parentNumber
      homeAddress
      state
      academicResult
    }
  }
}
    `;

export function useGetStudentByGrayCaseQuery(options: Omit<Urql.UseQueryArgs<GetStudentByGrayCaseQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStudentByGrayCaseQuery, GetStudentByGrayCaseQueryVariables>({ query: GetStudentByGrayCaseDocument, ...options });
};
export const GetStudentByIdDocument = gql`
    query GetStudentById($studentId: Float!) {
  getStudentById(studentId: $studentId) {
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
      startDate
      endDate
      birthDate
      isArchived
      profileImgUrl
      school {
        school {
          id
          createdAt
          schoolName
          rcnumber
          address
          lgarea
          state
          country
          description
          websiteUrl
          instagramUrl
          facebookUrl
          twitterUrl
          linkedinUrl
          logoImgUrl
          bannerImgUrl
          license
        }
      }
      creator {
        admin {
          id
          isSuper
          premiumAdmin
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
      grayId
      parentName
      parentEmail
      parentNumber
      homeAddress
      state
      academicResult
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
    note
    firstName
    lastName
    gradeClass
    gender
    ageInput
    isActive
    wasEdited
    creator {
      errors {
        field
        message
      }
      admin {
        id
        isSuper
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
    startDate
    endDate
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
        lgarea
        state
        country
        description
        websiteUrl
        instagramUrl
        facebookUrl
        twitterUrl
        linkedinUrl
        logoImgUrl
        bannerImgUrl
        license
      }
    }
    creator {
      admin {
        id
        isSuper
        premiumAdmin
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
    studentCase {
      grayCase {
        id
        createdAt
        updatedAt
        category
        note
        firstName
        lastName
        gradeClass
        gender
        ageInput
        isActive
        wasEdited
      }
    }
    grayId
    parentName
    parentEmail
    parentNumber
    homeAddress
    state
    academicResult
  }
}
    `;

export function useGetStudentFromClassQuery(options: Omit<Urql.UseQueryArgs<GetStudentFromClassQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStudentFromClassQuery, GetStudentFromClassQueryVariables>({ query: GetStudentFromClassDocument, ...options });
};
export const GetStudentFromSchoolDocument = gql`
    query GetStudentFromSchool($schoolId: Float!) {
  getStudentFromSchool(schoolId: $schoolId) {
    id
    createdAt
    firstName
    lastName
    gradeClass
    gender
    ageInput
    startDate
    endDate
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
        lgarea
        state
        country
        description
        websiteUrl
        instagramUrl
        facebookUrl
        twitterUrl
        linkedinUrl
        logoImgUrl
        bannerImgUrl
        license
      }
    }
    creator {
      admin {
        id
        isSuper
        premiumAdmin
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
    studentCase {
      grayCase {
        id
        createdAt
        updatedAt
        category
        note
        firstName
        lastName
        gradeClass
        gender
        ageInput
        isActive
        wasEdited
      }
    }
    grayId
    parentName
    parentEmail
    parentNumber
    homeAddress
    state
    academicResult
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
      isSuper
      premiumAdmin
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
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const SchoolCasesDocument = gql`
    query SchoolCases($limit: Float!, $sortBy: String, $cursor: Float) {
  schoolCases(limit: $limit, sortBy: $sortBy, cursor: $cursor) {
    grayCase {
      id
      createdAt
      updatedAt
      category
      note
      firstName
      lastName
      gradeClass
      gender
      ageInput
      isActive
      wasEdited
      creator {
        errors {
          field
          message
        }
        admin {
          id
          isSuper
          premiumAdmin
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
    hasMore
    cursor
  }
}
    `;

export function useSchoolCasesQuery(options: Omit<Urql.UseQueryArgs<SchoolCasesQueryVariables>, 'query'>) {
  return Urql.useQuery<SchoolCasesQuery, SchoolCasesQueryVariables>({ query: SchoolCasesDocument, ...options });
};
export const SchoolRequestsDocument = gql`
    query SchoolRequests($limit: Float!, $schoolId: Float!, $sortBy: String, $cursor: Float) {
  schoolRequests(
    limit: $limit
    schoolId: $schoolId
    sortBy: $sortBy
    cursor: $cursor
  ) {
    requests {
      id
      message
      student {
        id
        createdAt
        firstName
        lastName
        gradeClass
        gender
        ageInput
        startDate
        endDate
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
            lgarea
            state
            country
            description
            websiteUrl
            instagramUrl
            facebookUrl
            twitterUrl
            linkedinUrl
            logoImgUrl
            bannerImgUrl
            license
          }
        }
        creator {
          admin {
            id
            isSuper
            premiumAdmin
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
        studentCase {
          grayCase {
            id
            createdAt
            updatedAt
            category
            note
            firstName
            lastName
            gradeClass
            gender
            ageInput
            isActive
            wasEdited
          }
        }
        grayId
        parentName
        parentEmail
        parentNumber
        homeAddress
        state
        academicResult
      }
      status
      accepted
      createdAt
      updatedAt
    }
    hasMore
    cursor
  }
}
    `;

export function useSchoolRequestsQuery(options: Omit<Urql.UseQueryArgs<SchoolRequestsQueryVariables>, 'query'>) {
  return Urql.useQuery<SchoolRequestsQuery, SchoolRequestsQueryVariables>({ query: SchoolRequestsDocument, ...options });
};