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

import { PlainError, UploadFileResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Files<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags files
   * @name UploadFile
   * @request POST:/files
   * @secure
   */
  uploadFile = (
    data: {
      /**
       * Файл для загрузки на сервер.
       * @format binary
       */
      attachment: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<UploadFileResponse, PlainError>({
      path: `/files`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
}
