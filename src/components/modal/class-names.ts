import { bem } from '@bqx/bem';
import { getLibBlockName, getSizeBlockModifiers } from '../../utils/bem';

const modalBlock = bem.block(getLibBlockName('modal'));
const overlayElement = bem.element(modalBlock, 'overlay');
const titleElement = bem.element(modalBlock, 'title');
const titleCloseElement = bem.element(titleElement, 'close');

export const classNames = {
    modal: {
        element: modalBlock,
        modifiers: {
            size: getSizeBlockModifiers(modalBlock),
            fullScreen: bem.blockModifier(modalBlock, 'full-screen'),
            hidden: bem.blockModifier(modalBlock, 'hidden'),
        },
        overlay: {
            element: overlayElement,
            modifiers: {
                blur: bem.blockModifier(overlayElement, 'blur'),
            },
        },
        title: {
            element: titleElement,
            content: {
                element: bem.element(titleElement, 'content'),
            },
            close: {
                element: titleCloseElement,
                container: {
                    element: bem.element(titleCloseElement, 'container'),
                },
            },
        },
        main: {
            element: bem.element(modalBlock, 'main'),
        },
        footer: {
            element: bem.element(modalBlock, 'footer'),
        },
    },
} as const;
