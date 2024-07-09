import { ElementBuilder } from './interfaces/element-builder';
import { WhenElementBuilder } from './interfaces/when-element-builder';
import { ElementConfig } from './interfaces/element-config';

export class DefaultElementBuilder implements ElementBuilder {
    private readonly config: ElementConfig;

    private predicate?: () => boolean;

    constructor(tagName: keyof HTMLElementTagNameMap) {
        this.config = {
            tagName,
        };
    }

    public build(): HTMLElement {
        const element = document.createElement(this.config.tagName);
        if (this.config.classNames) {
            element.classList.add(...this.config.classNames);
        }

        if (this.config.children) {
            element.append(...this.config.children);
        }

        return element;
    }

    public withClass(className: string, ...rest: string[]): ElementBuilder {
        if (this.predicate?.() !== false) {
            this.config.classNames ??= [];
            this.config.classNames.push(className, ...rest);
            this.predicate = undefined;
        }

        return this;
    }

    public withChild(child: HTMLElement, ...rest: HTMLElement[]): ElementBuilder {
        if (this.predicate?.() !== false) {
            this.config.children ??= [];
            this.config.children.push(child, ...rest);
            this.predicate = undefined;
        }

        return this;
    }

    public when(predicate: () => boolean): WhenElementBuilder {
        this.predicate = predicate;
        return this;
    }
}
