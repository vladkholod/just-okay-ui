import { eb } from '@bqx/html-element-builder';
import { InitializedTextfieldConfig, InitializedTextfieldWithLabelConfig, TextfieldWithLabelConfig } from '../models';
import { classNames } from '../class-names';
import { isEventTargetWithValue } from '../../../utils/events';
import { classNamesMatcher, idMatcher } from '../../../utils/element-builder';
import { TextfieldDOM } from './textfield-dom';
import { isInitializedTextfieldWithLabelConfig } from '../textfield-utils';

export class TextfieldDOMBuilder {
    private readonly inputElement: HTMLInputElement;

    constructor(private readonly config: InitializedTextfieldConfig | InitializedTextfieldWithLabelConfig) {
        this.inputElement = this.createInput(config);
    }

    public build(): TextfieldDOM {
        const textfieldDOM: TextfieldDOM = { input: this.inputElement };
        if (!isInitializedTextfieldWithLabelConfig(this.config)) {
            return textfieldDOM;
        }

        const [labelElement, containerElement] = this.createLabeledInput(this.config);
        textfieldDOM.label = labelElement;
        textfieldDOM.container = containerElement;

        return textfieldDOM;
    }

    private createInput(config: InitializedTextfieldConfig): HTMLInputElement {
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
                config.value = event.target.value;
                config.onChange(event.target.value);
            })
            .match(
                () => config.value !== '',
                (builder) => builder.withRawTransformation(element => element.value = config.value),
            )
            .match(
                () => config.placeholder !== '',
                (builder) => builder.withRawTransformation(element => element.placeholder = config.placeholder),
            )
            .match(
                () => config.fullWidth,
                (builder) => builder.withClass(classNames.textfield.modifiers.fullWidth),
            )
            .match(...idMatcher(config.id))
            .match(...classNamesMatcher(config.classNames))
            .build();

        return inputElement;
    }

    private createLabeledInput(config: Required<TextfieldWithLabelConfig>): [HTMLLabelElement, HTMLDivElement] {
        const labelElement = eb('label')
            .withClass(classNames.textfield.label.element)
            .withText(config.label)
            .withRawTransformation(element => element.htmlFor = config.id)
            .build();

        const containerElement = eb('div')
            .withClass(classNames.textfield.container.element)
            .withChild(labelElement, this.inputElement)
            .build();

        return [labelElement, containerElement];
    }

}
