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
  CreateBlueprintRequest,
  CreateBlueprintResponse,
  GetBlueprintResponse,
  GetBlueprintsResponse,
  InvalidInputError,
  PlainError,
  SearchBlueprintsResponse,
  StartJobRequest,
  StartJobResponse,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Blueprints<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Возвращает полный список доступных пользователю шаблонов (blueprints). Пользователю доступны собственные  шаблоны и публичные.
   *
   * @tags blueprints
   * @name GetBlueprints
   * @request GET:/blueprints
   * @secure
   */
  getBlueprints = (params: RequestParams = {}) =>
    this.request<GetBlueprintsResponse, PlainError>({
      path: `/blueprints`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Создаёт пользовательский шаблон (blueprint). Если пользователь является администратором (role = UserAdmin),  то такой шаблон становится доступным для всех пользователей платформы. Автоматически создаёт ID шаблона.
   *
   * @tags blueprints
   * @name CreateBlueprint
   * @request POST:/blueprints
   * @secure
   */
  createBlueprint = (
    data: CreateBlueprintRequest,
    params: RequestParams = {},
  ) =>
    this.request<CreateBlueprintResponse, InvalidInputError | PlainError>({
      path: `/blueprints`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Совершает нечётки поиск по имени доступных пользователю шаблонам (blueprints). Пользователю доступны  собственные шаблоны и публичные.
   *
   * @tags blueprints
   * @name SearchBlueprints
   * @request GET:/blueprints/search
   * @secure
   */
  searchBlueprints = (
    query: {
      /** Название или часть названия шаблона (blueprint). */
      name: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SearchBlueprintsResponse, PlainError>({
      path: `/blueprints/search`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Возвращает конкретный шаблон (blueprint), если он доступен пользователю. Пользователю доступны собственные шаблоны и публичные.
   *
   * @tags blueprints
   * @name GetBlueprint
   * @request GET:/blueprints/{id}
   * @secure
   */
  getBlueprint = (id: string, params: RequestParams = {}) =>
    this.request<GetBlueprintResponse, PlainError>({
      path: `/blueprints/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Удаляет шаблон (blueprint) пользователя.
   *
   * @tags blueprints
   * @name DeleteBlueprint
   * @request DELETE:/blueprints/{id}
   * @secure
   */
  deleteBlueprint = (id: string, params: RequestParams = {}) =>
    this.request<void, PlainError>({
      path: `/blueprints/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Запускает задачу на основании шаблона указанного ID. Задача запускается в асинхронном режиме. Возвращает ID задачи.
   *
   * @tags blueprints
   * @name StartJob
   * @request POST:/blueprints/{id}/start
   * @secure
   */
  startJob = (id: string, data: StartJobRequest, params: RequestParams = {}) =>
    this.request<StartJobResponse, InvalidInputError | PlainError>({
      path: `/blueprints/${id}/start`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
