import { classNames } from './class-names';
import { Disposable } from '../../models/disposable';
import { eb } from '@bqx/html-element-builder';
import { Component } from '../../models/component';
import { CheckboxConfig } from './checkbox-config';
import { DEFAULT_SIZE } from '../../models/size';
import { DEFAULT_VARIANT } from '../../models/variant';
import { idMatcher } from '../../utils/element-builder';

export class Checkbox implements Component, Disposable<void> {
    public get element(): HTMLElement {
        return this.containerElement;
    }

    private readonly containerElement: HTMLElement;
    private readonly inputElement: HTMLElement;

    private readonly config: Required<CheckboxConfig>;

    private disposed = false;

    public constructor(config: CheckboxConfig) {
        this.config = Checkbox.initConfig(config);

        const { container, input } = Checkbox.createDOM(this.config);
        this.containerElement = container;
        this.inputElement = input;

        this.initListeners();
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }

        this.element.remove();
        this.inputElement.remove();

        this.disposed = true;
    }

    public toggle(): void { 
        this.inputElement.click();
    }

    public setChecked(checked: boolean): void { 
        if (this.config.checked === checked) { 
            return;
        }

        this.toggle();
    }

    public check(): void {
        this.setChecked(true);
    }

    public uncheck(): void {
        this.setChecked(false);
    }

    private toggleCheckedState(): void {
        this.config.checked = !this.config.checked;

        this.config.onClick({
            value: this.config.value,
            checked: this.config.checked,
        });
    }

    private initListeners(): void {
        this.inputElement.addEventListener('click', () => this.toggleCheckedState());
    }

    private static createDOM(config: Required<CheckboxConfig>): { container: HTMLElement, input: HTMLElement } {
        const label = eb('label')
            .withRawTransformation((element) => {
                const labelElement = element as HTMLLabelElement;

                labelElement.htmlFor = config.name;
            })
            .withText(config.displayText)
            .build();

        const input = eb('input')
            .withRawTransformation((element) => {
                const inputElement = element as HTMLInputElement;

                inputElement.type = 'checkbox';
                inputElement.id = config.name;
                inputElement.name = config.name;
                inputElement.value = config.value;
                inputElement.checked = config.checked;
            })
            .build();

        const container = eb('div')
            .match(...idMatcher(config.id))
            .withClass(
                classNames.checkbox.element,
                classNames.checkbox.modifiers.size[config.size],
                classNames.checkbox.modifiers.variant[config.variant],
            )
            .withChild(input, label)
            .build();

        return { container, input };
    }

    private static initConfig(config: CheckboxConfig): Required<CheckboxConfig> {
        return {
            id: config.id ?? '',
            name: config.name,
            value: config.value,
            displayText: config.displayText ?? config.value,
            checked: config.checked ?? false,
            size: config.size ?? DEFAULT_SIZE,
            variant: config.variant ?? DEFAULT_VARIANT,
            onClick: config?.onClick ?? (() => { /* default */ }),
        };
    }
}
