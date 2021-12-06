
//#region RestService

import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Rest } from "../../public-api";
import { isUndefinedOrEmptyString } from '../utils/common-utils';


@Injectable({
    providedIn: 'root',
})
export class RestService {
    constructor(
        protected http: HttpClient
    ) { }

    protected getApiFromStore(): any {
        return environment.apis.default.url;
    }

    handleError(err: any): Observable<any> {
        return throwError(err);
    }

    // TODO: Deprecate service or improve interface in v5.0
    request<T, R>(
        request: HttpRequest<T> | Rest.Request<T>,
        config?: Rest.Config,
        api?: string,
    ): Observable<R> {
        config = config || ({} as Rest.Config);
        api = api || this.getApiFromStore();
        const { method, params, ...options } = request;
        const { observe = Rest.Observe.Body, skipHandleError } = config;

        // return this.http.request<R>(method, api + request.url, {
        //     observe,
        //     ...params,
        //     ...options,
        // } as any)
        return this.http
            .request<R>(method, api + request.url, {
                observe,
                ...(params && {
                    params: Object.keys(params).reduce((acc: any, key: any) => {
                        const _params: any = params;
                        const value = _params[key];

                        if (isUndefinedOrEmptyString(value)) return acc;
                        if (value === null) return acc;

                        acc[key] = value;
                        return acc;
                    }, {}),
                }),
                ...options,
            } as any)
            .pipe(catchError(err => (skipHandleError ? throwError(err) : this.handleError(err))));
    }
}
//#endregion