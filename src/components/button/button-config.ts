import { Content } from '../../models/content';
import { Size } from '../../models/size';
import { Variant } from '../../models/variant';

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
