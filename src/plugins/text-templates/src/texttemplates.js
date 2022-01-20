import { Plugin } from '@ckeditor/ckeditor5-core/src';
import getSelectedContent from '@ckeditor/ckeditor5-engine/src/model/utils/getselectedcontent';
import { createDropdown } from 'ckeditor5/src/ui';

import templatesTextIcon from '../theme/icons/templates-text.svg';
import TextTemplatesEmptyView from './ui/texttemplatesemptyview';
import TextTemplatesFormView from './ui/texttemplatesformview';
import TextTemplatesListView from './ui/texttemplateslistview';

export default class TextTemplates extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'TextTemplates';
    }

    constructor(editor) {
        super(editor);
    }

    init() {
        const editor = this.editor;
        const t = editor.t;

        const inputCommand = editor.commands.get('input');

        editor.ui.componentFactory.add('textTemplates', locale => {
            const dropdownView = createDropdown(locale);
            let dropdownPanelContent;

            dropdownView.buttonView.set({
                label: t('Текстовые шаблоны'),
                icon: templatesTextIcon,
                tooltip: true
            });

            dropdownView.bind('isEnabled').to(inputCommand);

            dropdownView.on('execute', (evt, data) => {
                editor.execute('input', {text: data.character});
                editor.editing.view.focus();
            });

            dropdownView.on('change:isOpen', (e) => {
                if (!e.source.isOpen) {
                    dropdownView.off('submit');
                    return;
                }
                const model = editor.model;
                const selection = model.document.selection;
                const content = getSelectedContent(model, selection);
                this.ckTextTemplates = localStorage.getItem('ckTextTemplates');

                const ckTextTemplates = this.ckTextTemplates ? JSON.parse(this.ckTextTemplates) : [];

                dropdownView.panelView.children.clear();

                if (content.isEmpty && !ckTextTemplates.length > 0) {
                    dropdownPanelContent = this._createDropdownPanelEmptyContent(locale);
                }
                if (content.isEmpty && ckTextTemplates.length > 0) {
                    dropdownPanelContent = this._createDropdownPanelListContent(locale, dropdownView);
                }
                if (!content.isEmpty) {
                    const selectedContent = editor.data.stringify(model.getSelectedContent(selection));
                    dropdownPanelContent = this._createDropdownPanelFormContent(locale, dropdownView, selectedContent);
                }

                if (dropdownPanelContent) {
                    dropdownView.panelView.children.add(dropdownPanelContent);
                }
            });

            return dropdownView;
        });
    }

    _createDropdownPanelListContent(locale, dropdownView) {
        const list = new TextTemplatesListView(locale, this.editor, dropdownView);

        list.items.delegate('execute').to(dropdownView);

        return list;
    }

    _createDropdownPanelEmptyContent(locale) {
        return new TextTemplatesEmptyView(locale);
    }

    _createDropdownPanelFormContent(locale, dropdownView, selectedContent) {
        const form = new TextTemplatesFormView(getFormValidators(this.editor.t), locale);
        dropdownView.on('submit', () => {
            if (form.isValid()) {
                let data = this.ckTextTemplates ? JSON.parse(this.ckTextTemplates) : [];
                const id = data.length > 0 ? +data[data.length - 1].id + 1 : 1;
                data.push({name: form.name, content: selectedContent, id});
                localStorage.setItem('ckTextTemplates', JSON.stringify(data));
                closeUI(this.editor, dropdownView);
            }
        });

        dropdownView.on('change:isOpen', () => form.resetFormStatus());
        dropdownView.on('cancel', () => closeUI(this.editor, dropdownView));

        form.delegate('submit', 'cancel').to(dropdownView);
        return form;
    }
}

function closeUI(editor, dropdown) {
    editor.editing.view.focus();
    dropdown.isOpen = false;
}

function getFormValidators(t) {
    return [
        form => {
            if (!form.name.length) {
                return t('Имя не должно быть пустым.');
            }
        }
    ];
}