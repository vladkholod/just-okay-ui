import { bem } from '@bqx/bem';
import { getLibBlockName, getSpeedBlockModifiers } from '../../utils/bem';
import { getSizeBlockModifiers } from '../../utils/bem/get-size-modifiers';

const loaderBlock = bem.block(getLibBlockName('loader'));
const loaderPointerElement = bem.element(loaderBlock, 'pointer');
const loaderContainerElement = bem.element(loaderBlock, 'container');

export const classNames = {
    loader: {
        element: loaderBlock,
        modifiers: {
            size: getSizeBlockModifiers(loaderBlock),
            pointerSpeed: getSpeedBlockModifiers(loaderBlock),
        },
        pointer: {
            element: loaderPointerElement,
        },
        container: {
            element: loaderContainerElement,
            modifiers: {
                blur: bem.elementModifier(loaderContainerElement, 'blur'),
                off: bem.elementModifier(loaderContainerElement, 'off'),
            },
        },
    },
} as const;
