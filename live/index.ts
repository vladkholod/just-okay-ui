/* eslint-disable @typescript-eslint/no-unused-vars */
import '../src/styles/main.scss';

import { Tooltip } from '../src/components/tooltip';
import { Loader } from '../src/components/loader';
import { eb } from '@bqx/html-element-builder';

(() => {
    eb(document.body)
        .withRawTransformation(element => element.style.backgroundColor = '#0e0f0f')
        .build();

    const app = document.getElementById('app');
    if (!app) {
        console.error('app element is not found');
        return;
    }

    app.innerText = '';

    const target = eb('div')
        .withRawTransformation(element => {
            element.style.width = '300px';
            element.style.aspectRatio = '1';
            element.style.backgroundColor = 'darkslategray';
        })
        .build();

    const wrapper = eb('div')
        .withRawTransformation(element => {
            element.style.position = 'fixed';
            element.style.top = '50%';
            element.style.left = '50%';
            element.style.transform = 'translate(-50%,-50%)';
        })
        .withChild(target)
        .build();

    new Tooltip({ target, size: 'lg', position: 'top', content: 'test', transition: 0 });

    eb(app)
        .withChild(wrapper)
        .build();

})();
