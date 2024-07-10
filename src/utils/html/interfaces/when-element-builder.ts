import { OmitExact } from '../../types';
import { ElementBuilder } from './element-builder';

export type WhenElementBuilder = OmitExact<ElementBuilder, 'when' | 'build'>;
