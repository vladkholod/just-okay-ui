import { classNames } from './class-names';
import { Disposable } from '../../shared/models/disposable';
import { eb } from '@bqx/html-element-builder';
import { Component } from '../component';
import { ButtonConfig, IconButtonConfig, NonIconButtonConfig } from './button-config';
import { DEFAULT_SIZE } from '../../shared/models/size';
import { DEFAULT_VARIANT } from '../../shared/models/variant';
import { contentMatcher } from '../../utils/element-builder/content-matcher';

export class Button implements Component, Disposable<void> {
    public readonly element: HTMLElement;

    private readonly config: Required<ButtonConfig>;

    private disposed = false;

    public constructor(config?: ButtonConfig) {
        this.config = Button.initConfig(config);

        this.element = Button.createDOM(this.config);
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }

        this.element.remove();

        this.disposed = true;
    }

    private static createDOM(config: Required<ButtonConfig>): HTMLElement {
        const button = eb('button')
            .withClass(
                classNames.button.element,
                classNames.button.modifiers.size[config.size],
                classNames.button.modifiers.variant[config.variant],
            )
            .withListener('click', () => config.onClick())
            .match(
                () => config.isIcon,
                (builder) =>
                    builder.withClass(classNames.button.modifiers.isIcon)
                        .withChild(
                            eb('span')
                                .withClass(classNames.button.icon.element)
                                .match(...contentMatcher(config.content))
                                .build(),
                        ),
                (builder) => builder.match(...contentMatcher(config.content)),
            )

            .build();

        return button;
    }

    private static initConfig(config?: ButtonConfig): Required<ButtonConfig> {
        const buttonConfig: Required<NonIconButtonConfig> = {
            size: config?.size ?? DEFAULT_SIZE,
            variant: config?.variant ?? DEFAULT_VARIANT,
            onClick: config?.onClick ?? (() => { /* default */ }),
            isIcon: false,
            content: config?.content ?? '',
        };

        if (config?.isIcon === true) {
            const iconConfig = buttonConfig as unknown as IconButtonConfig;
            iconConfig.isIcon = true;
        }

        return buttonConfig;
    }
}