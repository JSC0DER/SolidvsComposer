const _     = /_/g;
const close = '}';
const open  = '{'

const addImport   = (entry, sheet) => {
    return void sheet.imports.push(`@import ${entry};`);
};
const addKeyframe = (entry, sheet, key) => {
    void sheet.frames.push(key + open);
    void Object.keys(entry).forEach(key => {
        void sheet.frames.push(key + open);
        void Object.keys(entry[key]).forEach(prop => {
            void sheet.frames.push(prop + ':' + entry[key][prop] + ';');
        });
        void sheet.frames.push(close);
    });
    void sheet.frames.push(close);
};
const addMedia    = (entry, sheet, key, parent) => {
    void sheet.media.push(key + open);
    void Object.keys(entry).forEach(innerkey => {
        const focus   = entry[innerkey];
        const isObj   = typeof focus === 'object';
        const content = isObj ? focus : { [innerkey] : focus };

        return void addEntry(content, sheet.media, (isObj ? innerkey : ''), parent);
    });
    void sheet.media.push(close);
};
const addEntry    = (entry, sheet, key, parent) => {
    if (typeof entry === 'string') return;

    const sel     = selector(key, parent);
    const body    = sheet.rules ? sheet.rules : sheet;
    const objs    = [];

    void body.push(sel + open);
    void Object.keys(entry).forEach(innerkey => {
        const focus = entry[innerkey];

        return focus instanceof Object
            ? void objs.push(innerkey) : innerkey[0] != '@'
            ? void body.push(innerkey.replace(_, '-') + ':' + focus + ';')
            : null;
    });
    void body.push(close);

    void objs.forEach(innerkey => {
        const focus = entry[innerkey];

        return innerkey.startsWith('@key')
            ? !sheet.frames || void addKeyframe(focus, sheet, innerkey)
            : innerkey.startsWith('@med')
            ? !sheet.media || void addMedia(focus, sheet, innerkey, sel)
            : innerkey[0] != '@'
            ? void addEntry(focus, sheet, innerkey, sel) : null;
    });
};
const selector    = (keys, parents = '') => {
    return parents.split(',').map(parent => keys.split(',')
        .map(key => parent + (key[0] === ':' ? '' : ' ') + key)
        .join(',')).join(',');
};

export default style => {
    const keys  = Object.keys(style);
    const sheet = {
        frames  : [],
        imports : [],
        media   : [],
        rules   : [],
    };

    void keys.forEach(key => key.startsWith('@imp') 
        ? addImport  (style[key], sheet)        : key.startsWith('@key')
        ? addKeyframe(style[key], sheet, key)   : key.startsWith('@med')
        ? addMedia   (style[key], sheet, key)
        : addEntry   (style[key], sheet, key));

    return (
        sheet.imports.join('')  +
        sheet.frames .join('')  +
        sheet.rules  .join('')  +
        sheet.media  .join('')
    );
};


/*

old selector
--------------------
const data = [];

for (const parent of parents.split(',')) {
    for (const key of keys.split(',')) {
        const space  = key[0] === ':' ? '' : ' ';

        void data.push((parent + space) + key);
    }
}

return data.join(',');
--------------------



*/