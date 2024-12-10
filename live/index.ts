import '../src/styles/main.scss';

import { eb } from '@bqx/html-element-builder';
import { Textfield } from '../src/components/textfield';

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

    const wrapper = (...children: HTMLElement[]) => eb('div')
        .withRawTransformation(el => {
            el.style.border = '2px solid gray';

            el.style.padding = '10px';
            el.style.margin = '10px';

            el.style.display = 'flex';
            el.style.flexDirection = 'column';
            el.style.gap = '10px';
        })
        .withChild(children)
        .build();

    eb(app)
        .withChild(
            wrapper(
                new Textfield({ size: 'xs', variant: 'primary', placeholder: 'Placeholder', label: 'xs-input:', id: 'xs-input' }).element,
                new Textfield({ size: 'sm', variant: 'secondary', placeholder: 'Placeholder', label: 'sm-input', id: 'sm-input' }).element,
                new Textfield({ size: 'md', variant: 'tertiary', placeholder: 'Placeholder', label: 'md-input', id: 'md-input' }).element,
                new Textfield({ size: 'lg', variant: 'primary', placeholder: 'Placeholder', label: 'lg-input', id: 'lg-input', fullWidth: true }).element,
            ),

            wrapper(
                new Textfield({ size: 'xs', variant: 'primary', placeholder: 'Placeholder' }).element,
                new Textfield({ size: 'sm', variant: 'secondary', placeholder: 'Placeholder' }).element,
                new Textfield({ size: 'md', variant: 'tertiary', placeholder: 'Placeholder' }).element,
                new Textfield({ size: 'lg', variant: 'primary', placeholder: 'Placeholder' }).element,
            ),
        )
        .build();
})();
