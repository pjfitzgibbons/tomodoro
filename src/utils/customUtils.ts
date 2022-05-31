import { v4 as uuid4 } from 'uuid';
import { replace } from "lodash";
/**
 * Utility functions that need to be reimplemented for each environment.
 * This is the version for Node.js
 * @module customUtilsNode
 * @private
 */
/**
 * Return a random alphanumerical string of length len
 * There is a very small probability (less than 1/1,000,000) for the length to be less than len
 * (il the base64 conversion yields too many pluses and slashes) but
 * that's not an issue here
 * The probability of a collision is extremely small (need 3*10^12 documents to have one chance in a million of a collision)
 * See http://en.wikipedia.org/wiki/Birthday_problem
 * @param {number} len
 * @return {string}
 * @alias module:customUtilsNode.uid
 */
const uid = () => {
    return replace(uuid4(),'-','')

}

// Interface
const _uid = uid;
export { _uid as uid };
