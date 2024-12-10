import { ComponentConfig } from '../../../models/component-config';
import { Size, Variant } from '../../../models';
import { OmitExact } from '../../../utils/types';

export type TextfieldConfig = ComponentConfig & {
    fullWidth?: boolean;
    label?: undefined;
    value?: string;
    placeholder?: string;
    size?: Size;
    variant?: Variant;

    onChange?: (value: string) => void;
};

export type TextfieldWithLabelConfig = OmitExact<TextfieldConfig, 'label'> & Required<Pick<ComponentConfig, 'id'>> & {
    label: string;
};

export type InitializedTextfieldConfig = Required<OmitExact<TextfieldConfig, 'label'>>;

export type InitializedTextfieldWithLabelConfig = Required<TextfieldWithLabelConfig>;
