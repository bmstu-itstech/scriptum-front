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

import { GetJobsResponse, JobState, PlainError } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Jobs<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Возвращает список всех пользовательских задач (jobs). Возможна фильтрация по состоянию задачи.
   *
   * @tags jobs
   * @name GetJobs
   * @request GET:/jobs
   * @secure
   */
  getJobs = (
    query?: {
      state?: JobState;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetJobsResponse, PlainError>({
      path: `/jobs`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Возвращает конкретную пользовательскую задачу (job).
   *
   * @tags jobs
   * @name GetJob
   * @request GET:/jobs/{id}
   * @secure
   */
  getJob = (id: string, params: RequestParams = {}) =>
    this.request<GetJobsResponse, void | PlainError>({
      path: `/jobs/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
