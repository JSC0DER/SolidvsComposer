import cssbuild from './cssbuild.js';

export default {
    add(_nodes) {
        const nodes    = Array.isArray(_nodes) ? _nodes : [_nodes];
        const fragment = document.createDocumentFragment();

        void nodes.forEach(node => void (node instanceof Array
            ?  this.add(node)
            :  node instanceof Object
            && fragment.appendChild(node.element || node)));

        return void this.element.appendChild(fragment) || this;
    },
    id(data) {
        return void (this.element.id = data) || this;
    },
    meta(attributes) {
        if (attributes instanceof Object) {
            void Object.keys(attributes).forEach(attr => attributes[attr] == null ?
                void this.element.removeAttribute(attr) :
                void this.element.setAttribute(attr, attributes[attr]));
        }

        return this;
    },
    on(name, action) {
        return void (this.element['on' + name] = action) || this;
    },
    text(content, append) {
        return void (this.element.innerText = (append ? this.element.innerText : '') + content) || this;
    },
    style(data) {
        const node  = document.createElement('style');

        void (node.textContent = cssbuild(data));
        void document.head.appendChild(node);

        return this;
    }
}


