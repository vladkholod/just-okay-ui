import '../src/styles/main.scss';

import { Modal, ModalConfig } from '../src/components/modal';
import { eb } from '@bqx/html-element-builder';
import { Size } from '../src/shared/models/size';

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

    new Array<Size>('xs', 'sm', 'md', 'lg')
        .map<ModalConfig>((size) => ({
            size,
            closeOnOutsideClick: true,
            blur: false,
            content: {
                main: eb('div')
                    .withText(`test ${size}`)
                    .build(),
            },
        }))
        .map<Modal>(config => new Modal(config))
        .reverse()
        .forEach(modal => modal.show());
})();
