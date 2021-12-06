export function noop() {
    // tslint:disable-next-line: only-arrow-functions
    const fn = function () { };
    return fn;
}

export function isUndefinedOrEmptyString(value: unknown): boolean {
    return value === undefined || value === '';
}

export function isNullOrUndefined(obj: any) {
    return obj === null || obj === undefined;
}

export function exists(obj: any) {
    return !isNullOrUndefined(obj);
}

export function isObject(obj: any) {
    return obj instanceof Object;
}

export function isArray(obj: any) {
    return Array.isArray(obj);
}

export function isObjectAndNotArray(obj: any) {
    return isObject(obj) && !isArray(obj);
}

export function isNode(obj: any) {
    return obj instanceof Node;
}

export function isObjectAndNotArrayNotNode(obj: any) {
    return isObjectAndNotArray(obj) && !isNode(obj);
}