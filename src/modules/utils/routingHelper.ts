import {stringify} from 'query-string';

export function mergeQueries(params: object, query: object) {

    if (!!params) {
        Object.keys(query).forEach((key) => params[key] = query[key]);
        return stringify(params, {arrayFormat: 'bracket'});
    } else {
        return stringify(query, {arrayFormat: 'bracket'});
    }

}

export function removeQueryKey(params: object, key: string) {

    console.log(params, key);
    if (!!params) {
        delete params[key];
        return stringify(params, {arrayFormat: 'bracket'});
    } else {
        return '';
    }

}

