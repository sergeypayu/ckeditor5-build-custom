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
            const button = dropdownView.buttonView;

            button.set({
                label: t('Вставити шаблон'),
                icon: templatesTextIcon,
                tooltip: true
            });

            dropdownView.bind('isEnabled').to(inputCommand);

            dropdownView.on('execute', (evt, data) => {
                editor.execute('input', {text: data.character});
                editor.editing.view.focus();
            });

            let dropdownPanelContent;
            dropdownView.on('change:isOpen', (e) => {
                if (!e.source.isOpen) {
                    dropdownView.off('delete');
                    dropdownView.off('insert');
                    dropdownView.off('submit');
                    dropdownView.off('cancel');
                    dropdownView.panelView.children.clear();
                    return;
                }

                const model = editor.model;
                const selection = model.document.selection;
                const content = model.getSelectedContent(selection);

                const ckTextTemplates = this._getItems();
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

            button.on('open', () => {
                if (dropdownPanelContent instanceof TextTemplatesFormView) {
                    dropdownPanelContent.disableCssTransitions();

                    // Make sure that each time the panel shows up, the URL field remains in sync with the value of
                    // the command. If the user typed in the input, then canceled (`urlInputView#fieldView#value` stays
                    // unaltered) and re-opened it without changing the value of the media command (e.g. because they
                    // didn't change the selection), they would see the old value instead of the actual value of the
                    // command.
                    dropdownPanelContent.nameInputView.fieldView.select();
                    dropdownPanelContent.focus();
                    dropdownPanelContent.enableCssTransitions();
                }
            }, { priority: 'low' } );

            return dropdownView;
        });
    }

    _getItems() {
        try {
            const items = localStorage.getItem('ckTextTemplates');
            return items ? JSON.parse(items) : [];
        } catch (ignore) {
            return [];
        }
    }

    _setItems(items) {
        try {
            localStorage.setItem('ckTextTemplates', JSON.stringify(items));
        } catch (ignore) {
        }
    }

    _createDropdownPanelListContent(locale, dropdownView, dataList) {
        const list = new TextTemplatesListView(locale, dataList);

        dropdownView.on('delete', (e) => {
            const items = dataList.filter(data => data.id !== e.source.commandId);
            this._setItems(items);
            closeUI(this.editor, dropdownView);
        });

        dropdownView.on('insert', (e) => {
            const viewFragment = this.editor.data.processor.toView(e.source.commandValue);
            const modelFragment = this.editor.data.toModel(viewFragment);
            this.editor.model.insertContent(modelFragment);
            closeUI(this.editor, dropdownView);
        });

        list.delegate('delete','insert').to(dropdownView);

        list.focus = () =>  {
            // не робимо нічого, це треба щоб уникнути ui-dropdown-panel-focus-child-missing-focus помилки
        };

        return list;
    }

    _createDropdownPanelEmptyContent(locale) {
        const view = new TextTemplatesEmptyView(locale);

        view.focus = () =>  {
            // не робимо нічого, це треба щоб уникнути ui-dropdown-panel-focus-child-missing-focus помилки
        };

        return view;
    }

    _createDropdownPanelFormContent(locale, dropdownView, selectedContent) {
        const form = new TextTemplatesFormView(getFormValidators(this.editor.t), locale);
        dropdownView.on('submit', () => {
            if (form.isValid()) {
                const items = this._getItems();
                const id = items.length > 0 ? +items[items.length - 1].id + 1 : 1;
                items.push({ name: form.name, content: selectedContent, id });
                this._setItems(items);
                closeUI(this.editor, dropdownView);
            }
        });

        dropdownView.on('cancel', () => closeUI(this.editor, dropdownView));

        form.delegate('submit', 'cancel').to(dropdownView);

        form.focus = () =>  {
            // не робимо нічого, це треба щоб уникнути ui-dropdown-panel-focus-child-missing-focus помилки
        };

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
                return t('Назва не повинна бути порожньою.');
            }
        }
    ];
}
