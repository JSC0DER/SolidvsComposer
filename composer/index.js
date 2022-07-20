import { uid, cid, nid }                   from './uids.js';
import { select, define, raw, createNode } from './utils.js';

export default new Proxy({}, {
    get: (_, prop) => {
        return prop === 'get'    ? select :
               prop === 'define' ? define :
               prop === 'cid'    ? cid    :
               prop === 'nid'    ? nid    :
               prop === 'id'     ? uid    :
               prop === 'raw'    ? raw    : createNode(prop);
    }
});




