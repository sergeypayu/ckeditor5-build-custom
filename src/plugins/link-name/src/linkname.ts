import { Plugin } from 'ckeditor5';

export default class LinkName extends Plugin {

    /**
     * @inheritDoc
     */
    public static get pluginName() {
        return 'LinkName' as const;
    }

    /**
     * @inheritDoc
     */
    public init(): void {
        const editor = this.editor;

        // Extend the schema to allow the 'name' attribute on 'a' elements.
        editor.model.schema.extend('$text', { allowAttributes: 'linkName' });

        // Define how the 'name' attribute should be downcasted (from model to view).
        editor.conversion.for('downcast').attributeToElement({
            model: 'linkName',
            view: (attributeValue, { writer}) => {
                const linkElement = writer.createAttributeElement('a', { name: attributeValue }, { priority: 5 });
                writer.setCustomProperty('linkName', true, linkElement);
                return linkElement;
            },
            converterPriority: 'low'
        });

        // Define how the 'name' attribute should be upcasted (from view to model).
        editor.conversion.for('upcast').attributeToAttribute({
            view: {
                name: 'a',
                key: 'name'
            },
            model: 'linkName',
            converterPriority: 'low'
        });
    }
}
