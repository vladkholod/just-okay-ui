import { LibPrefix } from '../../../constants/defaults';

export type Block<BlockName extends string> = `${LibPrefix}-${BlockName}`;
