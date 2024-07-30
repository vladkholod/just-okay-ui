import { DEFAULTS } from '../../constants/defaults';
import { bem } from '@bqx/bem';
import { getLibBlockName } from '../../utils/bem';

const loaderBlock = bem.block(getLibBlockName('loader'));
const loaderPointerElement = bem.element(loaderBlock, 'pointer');
const loaderContainerElement = bem.element(loaderBlock, 'container');

export const classNames = {
    loader: {
        element: loaderBlock,
        modifiers: {
            size: {
                xs: bem.blockModifier(loaderBlock, 'xs'),
                sm: bem.blockModifier(loaderBlock, 'sm'),
                md: bem.blockModifier(loaderBlock, 'md'),
                lg: bem.blockModifier(loaderBlock, 'lg'),
            },
            duration: {
                fast: bem.blockModifier(loaderBlock, 'fast'),
                default: DEFAULTS.css.unspecified,
                slow: bem.blockModifier(loaderBlock, 'slow'),
            },
        },
        pointer: {
            element: loaderPointerElement,
        },
        container: {
            element: loaderContainerElement,
            modifiers: {
                blur: bem.elementModifier(loaderContainerElement, 'blur'),
                hidden: bem.elementModifier(loaderContainerElement, 'hidden'),
            },
        },
    },
} as const;
