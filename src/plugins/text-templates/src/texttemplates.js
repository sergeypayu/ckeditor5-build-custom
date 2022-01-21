import { Plugin } from '@ckeditor/ckeditor5-core/src';
import { createDropdown } from '@ckeditor/ckeditor5-ui';

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
                    dropdownView.off('delete');
                    dropdownView.off('insert');
                    dropdownView.off('submit');
                    dropdownView.off('cancel');
                    return;
                }
                const model = editor.model;
                const selection = model.document.selection;
                const content = model.getSelectedContent(selection);
                this.ckTextTemplates = localStorage.getItem('ckTextTemplates');

                const ckTextTemplates = this.ckTextTemplates ? JSON.parse(this.ckTextTemplates) : [];

                dropdownView.panelView.children.clear();

                if (content.isEmpty && !ckTextTemplates.length) {
                    dropdownPanelContent = this._createDropdownPanelEmptyContent(locale);
                } else if (content.isEmpty && ckTextTemplates.length > 0) {
                    dropdownPanelContent = this._createDropdownPanelListContent(locale, dropdownView, ckTextTemplates);
                } else if (!content.isEmpty) {
                    const selectedContent = editor.data.stringify(content);
                    dropdownPanelContent = this._createDropdownPanelFormContent(locale, dropdownView, selectedContent);
                }

                if (dropdownPanelContent) {
                    dropdownView.panelView.children.add(dropdownPanelContent);
                }
            });

            return dropdownView;
        });
    }

    _createDropdownPanelListContent(locale, dropdownView, dataList) {
        const list = new TextTemplatesListView(locale);

        dropdownView.on('delete', (e) => {
            const newList = dataList.filter(data => data.id !== e.source.commandId);

            localStorage.setItem('ckTextTemplates', JSON.stringify(newList));

            closeUI(this.editor, dropdownView);
        });
        dropdownView.on('insert', (e) => {
            const viewFragment = this.editor.data.processor.toView(e.source.commandValue);
            const modelFragment = this.editor.data.toModel(viewFragment);

            this.editor.model.insertContent(modelFragment);

            closeUI(this.editor, dropdownView);
        });

        list.delegate('delete','insert').to(dropdownView);

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