import '../src/styles/main.scss';

import { Checkbox, CheckboxConfig } from '../src/components/checkbox';
import { Button } from '../src/components/button';
import { eb } from '@bqx/html-element-builder';
import { Size } from '../src/models/size';
import { Variant } from '../src/models/variant';

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

    const checkboxes = new Array<{ size: Size, variant: Variant }>(
        { size: 'xs', variant: 'primary' },
        { size: 'lg', variant: 'primary' },

        { size: 'sm', variant: 'secondary' },
        { size: 'md', variant: 'secondary' },

        { size: 'sm', variant: 'tertiary' },
        { size: 'lg', variant: 'tertiary' },
    )
        .map<CheckboxConfig>(({ size, variant }) => ({
            size,
            variant,
            name: `${variant}-${size}`,
            value: `${variant}-${size}`,
            displayText: `${variant}-${size}`.toUpperCase(),
            checked: true,
            onClick: ({ value, checked }) => console.log(value, checked),
        }))
        .map(config => new Checkbox(config));

    app.append(...checkboxes.map(x => x.element));

    const clickTarget = new Button({
        content: 'click target',
        onClick: () => console.log('clicked'),
    });

    const clickTrigger = new Button({
        content: 'click trigger',
        onClick: () => clickTarget.click(),
    });

    app.append(
        new Button({
            content: 'check 0',
            onClick: () => checkboxes[0].check(),
        }).element,

        new Button({
            content: 'uncheck 0',
            onClick: () => checkboxes[0].uncheck(),
        }).element,

        new Button({
            content: 'toggle 0',
            onClick: () => checkboxes[0].toggle(),
        }).element,

        eb('div')
            .withChild(
                clickTarget.element,
                clickTrigger.element,
            ).build(),
    );
})();
