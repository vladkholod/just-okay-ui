import { InitializedTextfieldConfig, InitializedTextfieldWithLabelConfig } from './models';

export function isInitializedTextfieldWithLabelConfig(config: InitializedTextfieldConfig): config is InitializedTextfieldWithLabelConfig {
    const maybeLabeled = config as Partial<InitializedTextfieldWithLabelConfig>;
    return maybeLabeled.label !== undefined;
}
