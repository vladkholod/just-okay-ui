import { ComponentConfig } from '../../models/component-config';
import { Size, Variant } from '../../models';

export type TextfieldConfig = ComponentConfig & {
    value?: string;
    size?: Size;
    variant?: Variant;

    onChange?: (value: string) => void;
};
