import '../src/styles/main.scss';

import { eb } from '@bqx/html-element-builder';
import { Button } from '../src/components/button';
import { Checkbox } from '../src/components/checkbox';
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

    const pInput = eb('input')
        .withClass('jo-textfield', 'jo-textfield--primary', 'jo-textfield--xs')
        .withRawTransformation(el => { (el as HTMLInputElement).value = 'Some test text is here!'; })
        .build();

    const sInput = eb('input')
        .withClass('jo-textfield', 'jo-textfield--secondary', 'jo-textfield--sm')
        .withRawTransformation(el => { (el as HTMLInputElement).value = 'Some test text is here!'; })
        .build();

    const tInput = eb('input')
        .withClass('jo-textfield', 'jo-textfield--tertiary', 'jo-textfield--md')
        .withRawTransformation(el => { (el as HTMLInputElement).value = 'Some test text is here!'; })
        .build();

    const lInput = eb('input')
        .withClass('jo-textfield', 'jo-textfield--primary', 'jo-textfield--lg')
        .withRawTransformation(el => { (el as HTMLInputElement).value = 'Some test text is here!'; })
        .build();

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

    const lTextfield = new Textfield({
        size: 'lg',
        variant: 'primary',
        value: 'Some test text is here!',
        onChange: console.log,
    });

    console.log('before', lTextfield.value);

    setTimeout(() => {
        lTextfield.value = 'blah';

        console.log('after', lTextfield.value);
    }, 1_000);

    eb(app)
        .withChild(
            wrapper(
                pInput,
                sInput,
                tInput,
                lInput,
            ),

            new Button({ content: 'click target' }).element,

            wrapper(
                new Button({ content: 'test', variant: 'primary', size: 'xs' }).element,
                new Button({ content: 'test', variant: 'secondary', size: 'sm' }).element,
                new Button({ content: 'test', variant: 'tertiary', size: 'md' }).element,
                new Button({ content: 'test', variant: 'primary', size: 'lg' }).element,
            ),

            wrapper(
                new Checkbox({ name: 'a', value: 'a', variant: 'primary', size: 'xs' }).element,
                new Checkbox({ name: 'b', value: 'b', variant: 'secondary', size: 'sm' }).element,
                new Checkbox({ name: 'c', value: 'c', variant: 'tertiary', size: 'md' }).element,
                new Checkbox({ name: 'd', value: 'd', variant: 'primary', size: 'lg' }).element,
            ),

            wrapper(
                new Textfield({ size: 'xs', variant: 'primary', value: 'Some test text is here!' }).element,
                new Textfield({ size: 'sm', variant: 'secondary', value: 'Some test text is here!' }).element,
                new Textfield({ size: 'md', variant: 'tertiary', value: 'Some test text is here!' }).element,
                lTextfield.element,
            ),
        )
        .build();
})();
