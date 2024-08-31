import { ComponentConfig } from '../../models/component-config';
import { Size } from '../../models/size';
import { Variant } from '../../models/variant';

export type CheckboxClickedPayload = {
    value: string;
    checked: boolean;
};

export type CheckboxConfig = ComponentConfig & {
    name: string;
    value: string;
    displayText?: string;
    checked?: boolean;
    size?: Size;
    variant?: Variant;

    onClick?: (payload: CheckboxClickedPayload) => void;
};
