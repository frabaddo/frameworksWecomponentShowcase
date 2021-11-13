import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactHtmlParser from 'react-html-parser';

export function defineComponent(name, component, events=[]) {
    class ReactElement extends HTMLElement {
        observer;
        _innerHTML;

        constructor() {
            super();
            this.observer = new MutationObserver(() => this.update());
            this.observer.observe(this, { attributes: true });
        }

        connectedCallback() {
            this._innerHTML = this.innerHTML;
            this.mount();
        }

        disconnectedCallback() {
            this.unmount();
            this.observer.disconnect();
        }

        attributeChangedCallback(){
            this.update();
        }

        update() {
            this.unmount();
            this.mount();
        }

        mount() {
            const props = {
                ...this.getProps(this.attributes),
                ...this.getEvents(),
                children: this.parseHtmlToReact(this.innerHTML),
            };
            render(React.createElement(component, props, props.children), this);
        }

        unmount() {
            unmountComponentAtNode(this);
        }

        parseHtmlToReact(html) {
            return ReactHtmlParser(html);
        }

        getProps(attributes) {
            return [...attributes]
                .filter((attr) => attr.name !== "style")
                .map((attr) => this.convert(attr.name, attr.value))
                .reduce(
                    (props, prop) => ({ ...props, [prop.name]: prop.value }),
                    {}
                );
        }

        getEvents() {
            return events.reduce(
                (events, ev) => ({
                    ...events,
                    ["on"+ev]: (args) =>{
                        return this.dispatchEvent(
                            new CustomEvent(ev, { ...args })
                        )
                    }
                }),
                {}
            );
        }

        convert(attrName, attrValue) {
            let value = attrValue;
            if (attrValue === "true" || attrValue === "false")
                value = attrValue === "true";
            else if (!isNaN(attrValue) && attrValue !== "") value = +attrValue;
            else if (/^{.*}/.exec(attrValue)) value = JSON.parse(attrValue);
            return {
                name: attrName,
                value: value,
            };
        }
    }

    customElements.define(name, ReactElement);
}