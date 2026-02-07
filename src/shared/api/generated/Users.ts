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

import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserMeResponse,
  GetUserResponse,
  GetUsersResponse,
  InvalidInputError,
  PatchUserRequest,
  PatchUserResponse,
  PlainError,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Возвращает полный список пользователей платформы. Запрос доступен только администраторам.
   *
   * @tags users
   * @name GetUsers
   * @request GET:/users
   * @secure
   */
  getUsers = (params: RequestParams = {}) =>
    this.request<GetUsersResponse, PlainError>({
      path: `/users`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Создаёт пользователя с заданными параметрами. Доступно только для администраторов.
   *
   * @tags users
   * @name CreateUser
   * @request POST:/users
   * @secure
   */
  createUser = (data: CreateUserRequest, params: RequestParams = {}) =>
    this.request<CreateUserResponse, InvalidInputError | PlainError>({
      path: `/users`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Возвращает информацию о текущем пользователе.
   *
   * @tags users
   * @name GetUserMe
   * @request GET:/users/me
   * @secure
   */
  getUserMe = (params: RequestParams = {}) =>
    this.request<GetUserMeResponse, PlainError>({
      path: `/users/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Возвращает информацию о пользователе. Доступно только для администраторов.
   *
   * @tags users
   * @name GetUser
   * @request GET:/users/{id}
   * @secure
   */
  getUser = (id: string, params: RequestParams = {}) =>
    this.request<GetUserResponse, PlainError>({
      path: `/users/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Обновляет информацию о пользователе. Доступно только для администраторов.
   *
   * @tags users
   * @name PatchUser
   * @request PATCH:/users/{id}
   * @secure
   */
  patchUser = (
    id: string,
    data: PatchUserRequest,
    params: RequestParams = {},
  ) =>
    this.request<PatchUserResponse, InvalidInputError | PlainError>({
      path: `/users/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Удаляет пользователя по его ID. Доступно только для администраторов.
   *
   * @tags users
   * @name DeleteUser
   * @request DELETE:/users/{id}
   * @secure
   */
  deleteUser = (id: string, params: RequestParams = {}) =>
    this.request<void, PlainError>({
      path: `/users/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
