/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum Role {
  User = "user",
  Admin = "admin",
}

export enum JobState {
  Pending = "pending",
  Running = "running",
  Finished = "finished",
}

export enum Visibility {
  Public = "public",
  Private = "private",
}

export enum ValueType {
  Integer = "integer",
  Real = "real",
  String = "string",
}

export interface Field {
  type: ValueType;
  name: string;
  desc?: string;
  unit?: string;
}

export interface Blueprint {
  id: string;
  archiveID: string;
  name: string;
  desc?: string;
  visibility: Visibility;
  in: Field[];
  out: Field[];
  ownerID: string;
  ownerName: string;
  /**
   * @format date-time
   * @example "2025-31-01T23:59:59.01Z"
   */
  createdAt: string;
}

export interface Value {
  type: ValueType;
  value?: string;
}

export interface Job {
  id: string;
  ownerID: string;
  blueprintID: string;
  blueprintName: string;
  state: JobState;
  in: Field[];
  out: Field[];
  input: Value[];
  output: Value[];
  /**
   * @format date-time
   * @example "2025-31-01T23:59:59.01Z"
   */
  createdAt: string;
  resultCode?: number;
  resultMsg?: string;
  /**
   * @format date-time
   * @example "2025-31-01T23:59:59.01Z"
   */
  startedAt?: string;
  /**
   * @format date-time
   * @example "2025-31-01T23:59:59.01Z"
   */
  finishedAt?: string;
}

export interface User {
  /** @example "1234abcd" */
  id: string;
  email: string;
  name: string;
  role: Role;
  /** @format date-time */
  createdAt: string;
}

export interface CreateBlueprintRequest {
  archiveID: string;
  name: string;
  desc?: string;
  in: Field[];
  out: Field[];
}

export interface StartJobRequest {
  values: Value[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  role: Role;
}

export interface PatchUserRequest {
  email?: string;
  password?: string;
  name?: string;
  role?: string;
}

export interface CreateBlueprintResponse {
  /** @example "1234abcd" */
  blueprintID: string;
}

export type GetBlueprintResponse = Blueprint;

export type GetBlueprintsResponse = Blueprint[];

export type GetJobResponse = Job;

export type GetJobsResponse = Job[];

export type SearchBlueprintsResponse = Blueprint[];

export interface StartJobResponse {
  /** @example "1234abcd" */
  jobID: string;
}

export interface UploadFileResponse {
  /** @example "1234abcd" */
  fileID: string;
  size: number;
}

export interface LoginResponse {
  accessToken: string;
}

export type GetUsersResponse = User[];

export type GetUserResponse = User;

export type GetUserMeResponse = User;

export interface CreateUserResponse {
  userID: string;
}

export type PatchUserResponse = User;

export interface InvalidInputError {
  /**
   * Уникальный код ошибки.
   * @example "blueprint-empty-archive-id"
   */
  code: string;
  /**
   * Сообщение об ошибке.
   * @example "expected not empty archive ID"
   */
  message?: string;
}

export interface PlainError {
  /**
   * Сообщение об ошибке.
   * @example "some error message"
   */
  message: string;
}
