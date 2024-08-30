import { Size } from '../../shared/models/size';
import { Variant } from '../../shared/models/variant';

export type CheckboxClickedPayload = {
    value: string;
    checked: boolean;
};

export type CheckboxConfig = {
    name: string;
    value: string;
    displayText?: string;
    checked?: boolean;
    size?: Size;
    variant?: Variant;

    onClick?: (payload: CheckboxClickedPayload) => void;
};
