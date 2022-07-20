const svg_nodes = new Set([
    'a', 'circle', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'path', 'polygon', 'polyline', 'rect', 'svg', 'switch', 'symbol', 'text', 'textPath', 'tspan', 'use'
]);

export default function (tagname) {
    return svg_nodes.has(tagname.toLowerCase())
        ? 'http://www.w3.org/2000/svg'
        : 'http://www.w3.org/1999/xhtml';
}