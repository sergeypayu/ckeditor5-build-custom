import { Plugin, Widget, toWidget } from 'ckeditor5';

import BlogcutEditing from './blogcutediting';
import BlogcutUI from './blogcutui';

export default class Blogcut extends Plugin {
    static get requires() {
        return [Widget, BlogcutEditing, BlogcutUI];
    }

    static get pluginName() {
        return 'Blogcut' as const;
    }

    init() {
        const editor = this.editor;

        editor.model.schema.register('blogcut', {
            isObject: true,          // selectable as a single unit
            isBlock: true,           // sits on its own line
            allowWhere: '$block',
            allowAttributes: ['text'],
        });

        // Upcast <blogcut text="..."> -> model:blogcut
        editor.conversion.for('upcast').elementToElement({
            view: {
                name: 'blogcut',
                attributes: ['text']
            },
            model: (viewElement, { writer }) => {
                const textAttr = viewElement.getAttribute('text') || '';
                return writer.createElement('blogcut', { text: textAttr });
            }
        });

        // Data downcast model:blogcut -> <blogcut text="..."></blogcut>
        editor.conversion.for('dataDowncast').elementToElement({
            model: 'blogcut',
            view: (modelElement, { writer }) => {
                const attrs: { text?: unknown } = {};
                const textAttr = modelElement.getAttribute('text') as string;
                if (textAttr != null) attrs.text = textAttr;
                return writer.createContainerElement('blogcut', attrs);
            }
        });

        // Editing downcast
        editor.conversion.for('editingDowncast').elementToElement({
            model: 'blogcut',
            view: (modelElement, { writer }) => {
                const box = writer.createContainerElement('div', { class: 'ck-blogcut' });
                const label = writer.createContainerElement('span', { 'data-ck-blogcut-label': '1' });
                const textAttr = (modelElement.getAttribute('text') as string) || ''
                writer.insert(writer.createPositionAt(label, 0),
                    writer.createText(`✂️ ${textAttr}`)
                );
                writer.insert(writer.createPositionAt(box, 0), label);
                return toWidget(box, writer, { label: 'Blogcut' });
            }
        });

        // Keep label in sync with model attribute
        editor.conversion.for('editingDowncast').add(dispatcher => {
            dispatcher.on('attribute:text:blogcut', (evt, data, api) => {
                const writer = api.writer;
                const viewEl = api.mapper.toViewElement(data.item);
                if (!viewEl) return;
                const label = viewEl.getChild(0); // <span ...>
                writer.remove(writer.createRangeIn(label));
                const textAttr = (data.attributeNewValue as string) || ''
                writer.insert(writer.createPositionAt(label, 0),
                    writer.createText(`✂️ ${textAttr}`)
                );
            });
        });
    }
}
