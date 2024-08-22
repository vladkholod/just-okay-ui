import { DEFAULTS, LibPrefix } from '../../constants/defaults';

export function getLibBlockName<BlockName extends string>(blockName: BlockName): `${LibPrefix}-${BlockName}` {
    return `${DEFAULTS.libPrefix}-${blockName}`;
}
