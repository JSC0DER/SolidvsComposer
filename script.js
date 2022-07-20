import html from './composer/bundle.js';

void html.raw(document.body).add([
    solid(1,5),
    solid(45, 7),
    solid(126, 56),
]);

function solid(count, mult) {
    const counter = html.span.text(count);
    const product  = html.span.text(count * mult);
    
    return html.div.add([
        html.h1.add([counter, html.span.text(` * ${mult} = `), product]),
        html.button.text('Counter').on('click', () => {
            void counter.text(count += 1);
            void product.text(count * mult);
        })
    ]);
}