import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Mutation = {
   __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createUser?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  logout?: Maybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  data?: Maybe<UserInput>;
};


export type MutationLoginArgs = {
  data?: Maybe<UserInput>;
};

export type Query = {
   __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};


export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type UserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


