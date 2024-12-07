import { bem } from '@bqx/bem';
import { getLibBlockName, getSizeBlockModifiers, getVariantBlockModifiers } from '../../utils/bem';

const textfieldBlock = bem.block(getLibBlockName('textfield'));

export const classNames = {
    textfield: {
        element: textfieldBlock,
        modifiers: {
            size: getSizeBlockModifiers(textfieldBlock),
            variant: getVariantBlockModifiers(textfieldBlock),
        },
    },
} as const;
