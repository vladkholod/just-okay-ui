import { Disposable } from '../../models/disposable';
import { DEFAULT_SIZE } from '../../models/size';
import { InitializedTextfieldConfig, InitializedTextfieldWithLabelConfig, TextfieldConfig, TextfieldWithLabelConfig } from './models';
import { Component } from '../../models/component';
import { getInitComponentConfig } from '../../utils/get-init-component-config';
import { DEFAULT_VARIANT } from '../../models/variant';
import { defaultCallback } from '../../models/default-callback';
import { TextfieldDOM, TextfieldDOMBuilder } from './textfield-dom-builder';

// TODO: fix scss for labeled and add full-width option
export class Textfield implements Component, Disposable<void> {
    public get element(): HTMLElement {
        return this.containerElement ?? this.inputElement;
    }

    private readonly config: InitializedTextfieldConfig | InitializedTextfieldWithLabelConfig;

    private readonly inputElement: TextfieldDOM['input'];
    private readonly labelElement: TextfieldDOM['label'];
    private readonly containerElement: TextfieldDOM['container'];

    private disposed = false;

    public get value(): string {
        return this.config.value;
    }

    public set value(value: string) {
        this.config.value = value;

        this.inputElement.value = this.config.value;
        this.config.onChange(this.config.value);
    }

    constructor(config: TextfieldConfig | TextfieldWithLabelConfig) {
        this.config = Textfield.initConfig(config);

        const textfieldDOMBuilder = new TextfieldDOMBuilder(this.config);
        const { input, label, container } = textfieldDOMBuilder.build();
        this.inputElement = input;
        this.labelElement = label;
        this.containerElement = container;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }

        this.inputElement.remove();
        this.labelElement?.remove();
        this.containerElement?.remove();

        this.disposed = true;
    }

    private static initConfig(config: TextfieldConfig | TextfieldWithLabelConfig): InitializedTextfieldConfig | InitializedTextfieldWithLabelConfig {
        const initializedConfig: InitializedTextfieldConfig = {
            value: config.value ?? '',
            placeholder: config.placeholder ?? '',
            fullWidth: config.fullWidth ?? false,
            size: config.size ?? DEFAULT_SIZE,
            variant: config.variant ?? DEFAULT_VARIANT,
            onChange: config.onChange ?? defaultCallback,
            ...getInitComponentConfig(config),
        };

        const maybeLabeledConfig = config as Partial<TextfieldWithLabelConfig>;
        return maybeLabeledConfig.label !== undefined
            ? { ...initializedConfig, label: maybeLabeledConfig.label ?? '' }
            : initializedConfig;
    }
}
