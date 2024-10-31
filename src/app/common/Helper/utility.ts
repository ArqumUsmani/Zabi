export class Utils {
    static applyDefaults<T>(target: Partial<T>, defaults: T): T {
        return Object.assign({}, defaults, target);
    }

    static getDistinctArray(items: any[]) {
        const distinctItems = items.filter((item: { id: any; }, index: any, self: any[]) =>
            index === self.findIndex((t) => t.id === item.id)
        );
        return distinctItems
    }
   
}