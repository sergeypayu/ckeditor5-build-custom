import { Editor } from '@ckeditor/ckeditor5-core';
import { Command, Plugin } from '@ckeditor/ckeditor5-core/src';
import {
    createDropdown,
    DropdownView,
    CssTransitionDisablerMixin,
    ViewWithCssTransitionDisabler
} from '@ckeditor/ckeditor5-ui';
import { type GetCallback, type ObservableChangeEvent, type Locale } from '@ckeditor/ckeditor5-utils';

import templatesTextIcon from '../theme/icons/templates-text.svg';
import { TemplateItemModel } from './templateitemmodel';
import TextTemplatesEmptyView from './ui/texttemplatesemptyview';
import TextTemplatesFormView, {
    CancelEvent,
    SubmitEvent,
    TextTemplatesFormValidatorCallback
} from './ui/texttemplatesformview';
import TextTemplatesListView, { DeleteEvent, InsertEvent } from './ui/texttemplateslistview';

export default class TextTemplates extends Plugin {
    private _deleteItemCallback: GetCallback<DeleteEvent> | undefined;
    private _insertItemCallback: GetCallback<InsertEvent> | undefined;
    private _submitCallback: GetCallback<SubmitEvent> | undefined;
    private _cancelCallback: GetCallback<CancelEvent> | undefined;

    /**
     * @inheritDoc
     */
    public static get pluginName() {
        return 'TextTemplates' as const;
    }

    /**
     * @inheritDoc
     */
    public init(): void {
        const editor = this.editor;
        const t = editor.t;

        const inputCommand: Command = editor.commands.get('input')!;

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

            let dropdownPanelContent: (TextTemplatesFormView & ViewWithCssTransitionDisabler) | TextTemplatesEmptyView | TextTemplatesListView;
            dropdownView.on<ObservableChangeEvent<boolean>>('change:isOpen', (event, d, isOpen) => {
                if (!isOpen) {
                    if (this._deleteItemCallback) {
                        dropdownView.off('delete', this._deleteItemCallback);
                        this._deleteItemCallback = undefined;
                    }
                    if (this._insertItemCallback) {
                        dropdownView.off('insert', this._insertItemCallback);
                        this._insertItemCallback = undefined;
                    }
                    if (this._submitCallback) {
                        dropdownView.off('submit', this._submitCallback);
                        this._submitCallback = undefined;
                    }
                    if (this._cancelCallback) {
                        dropdownView.off('cancel', this._cancelCallback);
                        this._cancelCallback = undefined;
                    }
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
            }, {priority: 'low'});

            return dropdownView;
        });
    }

    private _getItems(): TemplateItemModel[] {
        try {
            const items = localStorage.getItem('ckTextTemplates');
            return items ? JSON.parse(items) : [];
        } catch (ignore) {
            return [];
        }
    }

    private _setItems(items: TemplateItemModel[]) {
        try {
            localStorage.setItem('ckTextTemplates', JSON.stringify(items));
        } catch (ignore) {
        }
    }

    private _createDropdownPanelListContent(locale: Locale, dropdownView: DropdownView, dataList: TemplateItemModel[]) {
        const list = new TextTemplatesListView(locale, dataList);

        this._deleteItemCallback = (_, data): void => {
            const items = dataList.filter(item => item.id !== data.itemId);
            this._setItems(items);
            this._closeDropdown(dropdownView);
        };

        dropdownView.on('delete', this._deleteItemCallback);

        this._insertItemCallback = (_, data): void => {
            const viewFragment = this.editor.data.processor.toView(data.itemText);
            const modelFragment = this.editor.data.toModel(viewFragment);
            this.editor.model.insertContent(modelFragment);
            this._closeDropdown(dropdownView);
        };

        dropdownView.on('insert', this._insertItemCallback);

        list.delegate('delete', 'insert').to(dropdownView);

        return list;
    }

    private _createDropdownPanelEmptyContent(locale: Locale) {
        const view = new TextTemplatesEmptyView(locale);

        return view;
    }

    private _createDropdownPanelFormContent(locale: Locale, dropdownView: DropdownView, selectedContent: string): TextTemplatesFormView & ViewWithCssTransitionDisabler {
        const form = new (CssTransitionDisablerMixin(TextTemplatesFormView))(locale, getFormValidators(this.editor));
        this._submitCallback = (): void => {
            if (form.isValid()) {
                const items = this._getItems();
                const id = items.length > 0 ? +items[items.length - 1].id + 1 : 1;
                items.push({name: form.name, content: selectedContent, id});
                this._setItems(items);
                this._closeDropdown(dropdownView);
            }
        };

        dropdownView.on('submit', this._submitCallback);

        this._cancelCallback = (): void => {
            this._closeDropdown(dropdownView);
        };

        dropdownView.on('cancel', this._cancelCallback);

        form.delegate('submit', 'cancel').to(dropdownView);

        return form;
    }

    private _closeDropdown(dropdown: DropdownView): void {
        this.editor.editing.view.focus();
        dropdown.isOpen = false;
    }
}

function getFormValidators(editor: Editor): Array<TextTemplatesFormValidatorCallback> {
    const t = editor.t;

    return [
        form => {
            if (!form.name.length) {
                return t('Назва не повинна бути порожньою.');
            }
        }
    ];
}
