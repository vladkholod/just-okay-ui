import '../src/styles/main.scss';

import { Button } from '../src/components/button';
import { Tooltip } from '../src/components/tooltip';

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

    const button = new Button({
        content: 'click target',
        onClick: () => console.log('clicked'),
    });

    new Tooltip({
        content: 'test',
        target: button.element,
        position: 'right',
        transition: 'fast',
    });

    eb(button.element)
        .withRawTransformation(el => el.style.position = 'relative')
        .build();

    app.append(
        eb('div')
            .withChild(
                button.element,
            ).build(),
    );
})();
