import { eb } from '@bqx/html-element-builder';
import { Disposable } from '../../models/disposable';
import { DEFAULT_SIZE } from '../../models/size';
import { DEFAULT_POSITION } from './models';
import { TooltipConfig } from './tooltip-config';
import { DEFAULT_SPEED, Speed } from '../../models/speed';
import { classNames } from './class-names';
import { Component } from '../../models/component';

const transitionSpeedMap: Readonly<Record<Speed, number>> = {
    fast: 250,
    regular: 500,
    slow: 750,
};

export class Tooltip implements Component, Disposable<void> {
    private readonly config: Required<TooltipConfig>;
    public readonly element: HTMLElement;

    constructor(config: TooltipConfig) {
        this.config = Tooltip.initConfig(config);

        this.element = Tooltip.createDOM(this.config);
    }

    private disposed = false;

    public dispose(): void {
        if (this.disposed) {
            return;
        }

        this.element.remove();

        this.disposed = true;
    }

    private static createDOM(config: Required<TooltipConfig>): HTMLElement {
        const tooltipElement = eb('div')
            .withClass(
                classNames.tooltip.element,
                classNames.tooltip.modifiers.off,
                classNames.tooltip.modifiers.size[config.size],
                classNames.tooltip.modifiers.position[config.position],
            )
            .withRawTransformation(tooltip => {
                tooltip.innerHTML = typeof config.content === 'string'
                    ? config.content
                    : config.content.outerHTML;
            })
            .build();

        const transitionSpeed = typeof config.transition === 'number'
            ? config.transition
            : transitionSpeedMap[config.transition];
        const withTimeout = (fn: () => void): NodeJS.Timeout => setTimeout(fn, transitionSpeed);

        let hideTimeoutId: NodeJS.Timeout | undefined = undefined;
        let showTimeoutId: NodeJS.Timeout | undefined = undefined;

        eb(config.target)
            .withChild(tooltipElement)
            .withListener('mouseenter', () => {
                clearTimeout(hideTimeoutId);
                showTimeoutId = withTimeout(() => tooltipElement.classList.remove(classNames.tooltip.modifiers.off));
            })
            .withListener('mouseleave', () => {
                hideTimeoutId = withTimeout(() => tooltipElement.classList.add(classNames.tooltip.modifiers.off));
                clearTimeout(showTimeoutId);
            })
            .build();

        return tooltipElement;
    }

    private static initConfig(config: TooltipConfig): Required<TooltipConfig> {
        return {
            ...config,
            position: config.position ?? DEFAULT_POSITION,
            size: config.size ?? DEFAULT_SIZE,
            transition: config.transition ?? DEFAULT_SPEED,
        };
    }
}
