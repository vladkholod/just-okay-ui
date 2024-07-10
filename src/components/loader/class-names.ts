import { DEFAULTS } from '../../constants/defaults';
import { block, blockModifier, element, elementModifier } from '../../utils/css';

const loaderBlock = block('loader');
const loaderPointerElement = element(loaderBlock, 'pointer');
const loaderContainerElement = element(loaderBlock, 'container');

export const classNames = {
    loader: {
        element: loaderBlock,
        modifiers: {
            size: {
                xs: blockModifier(loaderBlock, 'xs'),
                sm: blockModifier(loaderBlock, 'sm'),
                md: blockModifier(loaderBlock, 'md'),
                lg: blockModifier(loaderBlock, 'lg'),
            },
            duration: {
                fast: blockModifier(loaderBlock, 'fast'),
                default: DEFAULTS.css.unspecified,
                slow: blockModifier(loaderBlock, 'slow'),
            },
        },
        pointer: {
            element: loaderPointerElement,
        },
        container: {
            element: loaderContainerElement,
            modifiers: {
                blur: elementModifier(loaderContainerElement, 'blur'),
                hidden: elementModifier(loaderContainerElement, 'hidden'),
            },
        },
    },
} as const;
