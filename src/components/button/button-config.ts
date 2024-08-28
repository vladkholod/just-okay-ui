import { Content } from '../../shared/models/content';
import { Size } from '../../shared/models/size';
import { Variant } from '../../shared/models/variant';

export type BaseButtonConfig = {
    size?: Size;
    variant?: Variant;
    onClick?: () => void;
};

export type NonIconButtonConfig = BaseButtonConfig & {
    isIcon?: false,
    content?: Content;
};

export type IconButtonConfig = BaseButtonConfig & {
    isIcon: true,
    content?: string;
};

export type ButtonConfig = NonIconButtonConfig | IconButtonConfig;
