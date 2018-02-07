import * as sha from 'sha.js';

export function sha256(value: string) {
    return sha('sha256').update(value).digest('hex');
}

export function toBase64(value: string) {
    return btoa(
        encodeURIComponent(value).replace(
            /%([0-9A-F]{2})/g,
            (match, p1) => String.fromCharCode(('0x' + p1) as any)
        )
    );
}
