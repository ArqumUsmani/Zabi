export class Utils {
    static applyDefaults<T>(target: Partial<T>, defaults: T): T {
        return Object.assign({}, defaults, target);
    }
}