import '../src/styles/main.scss';

import { Button, ButtonConfig } from '../src/components/button';
import { eb } from '@bqx/html-element-builder';
import { Size } from '../src/shared/models/size';
import { Variant } from '../src/shared/models/variant';

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

    const rawButtons = new Array<{ size: Size, variant: Variant }>(
        { size: 'xs', variant: 'primary' },
        { size: 'sm', variant: 'primary' },
        { size: 'md', variant: 'primary' },
        { size: 'lg', variant: 'primary' },

        { size: 'xs', variant: 'secondary' },
        { size: 'sm', variant: 'secondary' },
        { size: 'md', variant: 'secondary' },
        { size: 'lg', variant: 'secondary' },

        { size: 'xs', variant: 'tertiary' },
        { size: 'sm', variant: 'tertiary' },
        { size: 'md', variant: 'tertiary' },
        { size: 'lg', variant: 'tertiary' },
    )
        .map<ButtonConfig>(({ size, variant }) => ({
            size,
            variant,
            isIcon: false,
            content: '🚀',
            onClick: () => console.log(this),
        }))
        .map(config => new Button(config))
        .map(button => button.element);

    app.append(...rawButtons);

})();
