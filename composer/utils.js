import prototype from './prototype.js';
import checkNS   from './namespaces.js';

export const define     = (name, action) => void (prototype[name] = action);
export const createNode = (tag)          => {
    const obj = Object.create(prototype);

    obj._isComposer = true;
    obj._tagname    = tag instanceof Object 
        ? tag._tagname || tag.tagName
        : tag || 'div';
    obj._namespace  = checkNS(obj._tagname);
    obj.element     = tag instanceof Object
        ? tag._isComposer ? tag.element : tag
        : document.createElementNS(obj._namespace, obj._tagname);

    return obj;
};
export const raw        = (subject)      => {
    if (String(subject)[0] == '<') {
        const temp = document.createElement('div');

        temp.innerHTML = subject;
        
        if (temp.firstChild) {
            return createNode(temp.firstChild);
        }
    }

    return createNode((subject instanceof Object && subject.nodeName) ? subject : null);
};
export const select     = (id, isArray)  => {
    let nodes = isArray
        ? Array.from(document.querySelectorAll(id)) 
        : [document.getElementById(id)];

    nodes = nodes.map(element => element ? createNode(element) : createNode());

    return nodes.length > 1 ? nodes : nodes[0];
}