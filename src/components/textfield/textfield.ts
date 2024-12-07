import { eb } from '@bqx/html-element-builder';
import { Disposable } from '../../models/disposable';
import { DEFAULT_SIZE } from '../../models/size';
import { TextfieldConfig } from './textfield-config';
import { classNames } from './class-names';
import { Component } from '../../models/component';
import { classNamesMatcher, idMatcher } from '../../utils/element-builder';
import { getInitComponentConfig } from '../../utils/get-init-component-config';
import { DEFAULT_VARIANT } from '../../models/variant';
import { defaultCallback } from '../../models/default-callback';
import { isEventTargetWithValue } from '../../utils/events';

export class Textfield implements Component, Disposable<void> {
    private readonly config: Required<TextfieldConfig>;
    public readonly element: HTMLInputElement;

    public get value(): string { 
        return this.config.value;
    }

    public set value(value: string) { 
        this.config.value = value;

        this.element.value = this.config.value;
        this.config.onChange(this.config.value);
    }

    constructor(config: TextfieldConfig) {
        this.config = Textfield.initConfig(config);

        this.element = this.createDOM(this.config);
    }

    private disposed = false;

    public dispose(): void {
        if (this.disposed) {
            return;
        }

        this.element.remove();

        this.disposed = true;
    }

    private createDOM(config: Required<TextfieldConfig>): HTMLInputElement {
        const inputElement = eb('input')
            .withClass(
                classNames.textfield.element,
                classNames.textfield.modifiers.size[config.size],
                classNames.textfield.modifiers.variant[config.variant],
            )
            .withListener('change', (event) => {
                if (!isEventTargetWithValue(event.target)) {
                    return;
                }
                this.config.value = event.target.value;
                this.config.onChange(this.config.value);
            })
            .match(
                () => config.value !== '',
                (builder) => builder.withRawTransformation(element => element.value = config.value),
            )
            .match(...idMatcher(config.id))
            .match(...classNamesMatcher(config.classNames))
            .withRawTransformation(element => element.value = config.value)
            .build();

        return inputElement;
    }

    private static initConfig(config: TextfieldConfig): Required<TextfieldConfig> {
        return {
            value: config.value ?? '',
            size: config.size ?? DEFAULT_SIZE,
            variant: config.variant ?? DEFAULT_VARIANT,
            onChange: config.onChange ?? defaultCallback,
            ...getInitComponentConfig(config),
        };
    }

}
