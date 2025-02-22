export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type BaseResponse = {
  message: Scalars['String']['output'];
  statusCode: HttpCode;
};

export type CreateQuestManagerInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateQuestManagerMutation = {
  __typename?: 'CreateQuestManagerMutation';
  username: Scalars['String']['output'];
};

export type CreateQuestManagerMutation_Mutation = BaseResponse & {
  __typename?: 'CreateQuestManagerMutation_Mutation';
  data: CreateQuestManagerMutation;
  message: Scalars['String']['output'];
  statusCode: HttpCode;
};

export type ErrorOutput = BaseResponse & {
  __typename?: 'ErrorOutput';
  errors: Scalars['JSON']['output'];
  message: Scalars['String']['output'];
  statusCode: HttpCode;
};

export type FilterQuestManagerInput = {
  name: Scalars['String']['input'];
};

export enum HttpCode {
  Accepted = 'ACCEPTED',
  AlreadyReported = 'ALREADY_REPORTED',
  Ambiguous = 'AMBIGUOUS',
  BadGateway = 'BAD_GATEWAY',
  BadRequest = 'BAD_REQUEST',
  Conflict = 'CONFLICT',
  ContentDifferent = 'CONTENT_DIFFERENT',
  Continue = 'CONTINUE',
  Created = 'CREATED',
  Earlyhints = 'EARLYHINTS',
  ExpectationFailed = 'EXPECTATION_FAILED',
  FailedDependency = 'FAILED_DEPENDENCY',
  Forbidden = 'FORBIDDEN',
  Found = 'FOUND',
  GatewayTimeout = 'GATEWAY_TIMEOUT',
  Gone = 'GONE',
  HttpVersionNotSupported = 'HTTP_VERSION_NOT_SUPPORTED',
  InsufficientStorage = 'INSUFFICIENT_STORAGE',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  IAmATeapot = 'I_AM_A_TEAPOT',
  LengthRequired = 'LENGTH_REQUIRED',
  Locked = 'LOCKED',
  LoopDetected = 'LOOP_DETECTED',
  MethodNotAllowed = 'METHOD_NOT_ALLOWED',
  Misdirected = 'MISDIRECTED',
  MovedPermanently = 'MOVED_PERMANENTLY',
  MultiStatus = 'MULTI_STATUS',
  NonAuthoritativeInformation = 'NON_AUTHORITATIVE_INFORMATION',
  NotAcceptable = 'NOT_ACCEPTABLE',
  NotFound = 'NOT_FOUND',
  NotImplemented = 'NOT_IMPLEMENTED',
  NotModified = 'NOT_MODIFIED',
  NoContent = 'NO_CONTENT',
  Ok = 'OK',
  PartialContent = 'PARTIAL_CONTENT',
  PayloadTooLarge = 'PAYLOAD_TOO_LARGE',
  PaymentRequired = 'PAYMENT_REQUIRED',
  PermanentRedirect = 'PERMANENT_REDIRECT',
  PreconditionFailed = 'PRECONDITION_FAILED',
  PreconditionRequired = 'PRECONDITION_REQUIRED',
  Processing = 'PROCESSING',
  ProxyAuthenticationRequired = 'PROXY_AUTHENTICATION_REQUIRED',
  RequestedRangeNotSatisfiable = 'REQUESTED_RANGE_NOT_SATISFIABLE',
  RequestTimeout = 'REQUEST_TIMEOUT',
  ResetContent = 'RESET_CONTENT',
  SeeOther = 'SEE_OTHER',
  ServiceUnavailable = 'SERVICE_UNAVAILABLE',
  SwitchingProtocols = 'SWITCHING_PROTOCOLS',
  TemporaryRedirect = 'TEMPORARY_REDIRECT',
  TooManyRequests = 'TOO_MANY_REQUESTS',
  Unauthorized = 'UNAUTHORIZED',
  UnprocessableEntity = 'UNPROCESSABLE_ENTITY',
  UnrecoverableError = 'UNRECOVERABLE_ERROR',
  UnsupportedMediaType = 'UNSUPPORTED_MEDIA_TYPE',
  UriTooLong = 'URI_TOO_LONG'
}

export type LoginQuestManagerInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginQuestManagerMutation = {
  __typename?: 'LoginQuestManagerMutation';
  role: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type LoginQuestManagerMutation_Mutation = BaseResponse & {
  __typename?: 'LoginQuestManagerMutation_Mutation';
  data: LoginQuestManagerMutation;
  message: Scalars['String']['output'];
  statusCode: HttpCode;
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuestManager: ResultUnion_CreateQuestManagerMutation_Mutation;
  loginQuestManager: ResultUnion_LoginQuestManagerMutation_Mutation;
};


export type MutationCreateQuestManagerArgs = {
  input: CreateQuestManagerInput;
};


export type MutationLoginQuestManagerArgs = {
  input: LoginQuestManagerInput;
};

export type PaginationData = {
  __typename?: 'PaginationData';
  cursorLeft?: Maybe<Scalars['Float']['output']>;
  cursorRight?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type PaginationInput = {
  page?: Scalars['Float']['input'];
  pageSize?: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  questManagers: ResultUnion_QuestManagerSchema_List;
};


export type QueryQuestManagersArgs = {
  filter?: InputMaybe<FilterQuestManagerInput>;
  pagination?: InputMaybe<PaginationInput>;
};

export type QuestManagerSchema = {
  __typename?: 'QuestManagerSchema';
  username: Scalars['String']['output'];
};

export type QuestManagerSchema_List = BaseResponse & {
  __typename?: 'QuestManagerSchema_List';
  data: Array<QuestManagerSchema>;
  message: Scalars['String']['output'];
  pagination: PaginationData;
  statusCode: HttpCode;
};

export type ResultUnion_CreateQuestManagerMutation_Mutation = CreateQuestManagerMutation_Mutation | ErrorOutput;

export type ResultUnion_LoginQuestManagerMutation_Mutation = ErrorOutput | LoginQuestManagerMutation_Mutation;

export type ResultUnion_QuestManagerSchema_List = ErrorOutput | QuestManagerSchema_List;
