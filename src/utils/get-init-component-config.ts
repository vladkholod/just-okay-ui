import { ComponentConfig } from '../models/component-config';

export function getInitComponentConfig(config?: ComponentConfig): Required<ComponentConfig> {
    return {
        id: '',
        classNames: '',
        ...config,
    };
}
