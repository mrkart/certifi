import { request } from 'https';
import FormData from 'form-data';
import { ParsedUrlQueryInput, stringify } from 'querystring';
import { isNotEmpty } from 'class-validator';

interface UploadResponse<ResponseBody> {
    body: ResponseBody;
    statusMessage?: string;
    statusCode?: number;
}

export function postForm<ResponseBody, ErrorBody = unknown>(
    accessToken: string,
    url: string,
    form: FormData
): Promise<UploadResponse<ResponseBody | ErrorBody>> {
    const promise = new Promise<UploadResponse<ResponseBody | ErrorBody>>(
        (resolve, reject) => {
            const { host, pathname } = new URL(url);
            const req = request({
                method: 'POST',
                host,
                path: pathname,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    ...form.getHeaders()
                }
            });
            form.pipe(req);
            req.on('response', (response) => {
                console.log('%s %s %s', response.statusCode, req.method, url);
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () => {
                    try {
                        const body: ResponseBody = JSON.parse(
                            data
                        ) as ResponseBody;
                        resolve({
                            body: body,
                            statusMessage: response.statusMessage,
                            statusCode: response.statusCode
                        });
                    } catch (e) {
                        const error = new Error();
                        error.name = 'ContentTypeExpectaionFailedError';
                        error.message =
                            'Expected Response body to be ' +
                            'application/json but got ' +
                            response.headers['content-type'];
                        reject(error);
                    }
                });
            });
            req.on('error', (error) => {
                reject(error);
            });
        }
    );
    return promise;
}

export function post<RequestBody, ResponseBody>(
    url: string,
    reqBody: RequestBody
): Promise<UploadResponse<ResponseBody>> {
    const promise = new Promise<UploadResponse<ResponseBody>>(
        (resolve, reject) => {
            const { host, pathname, protocol, search } = new URL(url);
            const data = stringify(reqBody as ParsedUrlQueryInput);
            const req = request(
                {
                    method: 'POST',
                    host,
                    path: pathname + search,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                },
                (response) => {
                    console.log(
                        '%s %s %s',
                        response.statusCode,
                        req.method,
                        `${protocol}//${host}${pathname}${search}`
                    );
                    let resData = '';
                    response.on('data', (chunk) => {
                        resData += chunk;
                    });

                    response.on('end', () => {
                        try {
                            const body: ResponseBody = JSON.parse(
                                resData
                            ) as ResponseBody;
                            resolve({
                                body: body,
                                statusMessage: response.statusMessage,
                                statusCode: response.statusCode
                            });
                        } catch (e) {
                            const error = new Error();
                            error.name = 'ContentTypeExpectaionFailedError';
                            error.message =
                                'Expected Response body to be ' +
                                'application/json but got ' +
                                response.headers['content-type'];
                            reject(error);
                        }
                    });
                }
            );
            req.on('error', (error) => {
                reject(error);
            });
            req.write(data);
            req.end();
        }
    );
    return promise;
}

export function getContentLength(url: string): Promise<number> {
    const promise = new Promise<number>((resolve, reject) => {
        const { host, pathname, protocol, search } = new URL(url);
        const req = request(
            {
                method: 'HEAD',
                host,
                path: pathname
            },
            (response) => {
                console.log(
                    '%s %s %s',
                    response.statusCode,
                    req.method,
                    `${protocol}//${host}${pathname}${search}`
                );
                let error: Error;
                if (response.statusCode === 200) {
                    const contentLength = response.headers['content-length'];
                    resolve(parseInt(contentLength));
                } else if (
                    response.statusCode >= 400 &&
                    response.statusCode <= 499
                ) {
                    error = new Error();
                    error.name = 'InvalidUrl';
                    error.message = 'Invalid file URL';
                } else {
                    error = new Error();
                    error.name = 'HttpResponseError';
                    error.message = response.statusMessage;
                }
                if (isNotEmpty(error)) {
                    reject(error);
                }
            }
        );
        req.end();
    });
    return promise;
}
