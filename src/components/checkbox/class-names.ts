import { bem } from '@bqx/bem';
import { getLibBlockName } from '../../utils/bem';
import { getSizeBlockModifiers } from '../../utils/bem/get-size-modifiers';
import { getVariantBlockModifiers } from '../../utils/bem/get-variant-modifiers';

const checkboxBlock = bem.block(getLibBlockName('checkbox'));

export const classNames = {
    checkbox: {
        element: checkboxBlock,
        modifiers: {
            size: getSizeBlockModifiers(checkboxBlock),
            variant: getVariantBlockModifiers(checkboxBlock),
        },
    },
} as const;
