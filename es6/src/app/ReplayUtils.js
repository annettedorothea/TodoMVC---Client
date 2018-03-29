import stringify from "json-stable-stringify";

export default class ReplayUtils {

    static itemStringifyReplacer(key, value) {
        if (key === 'timestamp') {
            return undefined;
        } else {
            return value;
        }
    }

    static compareItems(expected, actual) {
        const expectedJson = stringify(expected, { space: '  ', replacer: ReplayUtils.itemStringifyReplacer});
        const actualJson = stringify(actual, { space: '  ', replacer: ReplayUtils.itemStringifyReplacer});
        const result = expectedJson === actualJson;
        if (result === false) {
            console.log(expectedJson);
            console.log(actualJson);
        }
        return result;
    }

}

/*       S.D.G.       */

