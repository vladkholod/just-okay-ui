import { ComponentConfig } from '../../models/component-config';
import { Content } from '../../models/content';
import { Size } from '../../models/size';

export type ModalContent = {
    main: Content;
    title?: Content;
    footer?: Content;
};

export type ModalConfig = ComponentConfig & {
    content: ModalContent;
    size?: Size;
    fullScreen?: boolean;
    blur?: boolean;
    closeOnOutsideClick?: boolean;
    destroyOnClose?: boolean;
};
