export default class ReplayUtils {

    static itemStringifyReplacer(key, value) {
        if (key === 'timestamp') {
            return undefined;
        } else {
            return value;
        }
    }

}

/*       S.D.G.       */

