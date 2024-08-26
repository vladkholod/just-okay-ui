import '../src/styles/main.scss';

import { Modal } from '../src/components/modal';
import { eb } from '@bqx/html-element-builder';

(() => {
    eb(document.body)
        .withRawTransformation(element => {
            element.style.backgroundColor = '#0e0f0f';
            element.style.color = 'white';
        })
        .build();

    const app = document.getElementById('app');
    if (!app) {
        console.error('app element is not found');
        return;
    }

    app.innerText = 'Lorem ipsum dolor sit amet.';

    const modal = new Modal({
        blur: true,
        content: {
            main: eb('div')
                .withText('test')
                .build(),
        },
    });

    modal.show();
})();
