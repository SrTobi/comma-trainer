

const defaultRandomStrings = "abcdefghijklmnopqrstuvwxyz0123456789";

export function randomString(length: number = 8, chars: string = defaultRandomStrings): string {
    var result = "";
    for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
}

export function random(min: number, max: number): number {
    const interval = max - min + 1;
    return Math.floor(Math.random() * interval + min);
}

export function normFloat(num: number): number {
    return parseFloat((Math.round(num * 100) / 100).toFixed(2));
}

export interface IdAble {
    id: number
}

export class AutoIdAble implements IdAble {
    id: number = AutoIdAble.nextId++;
    private static nextId = 1;
}