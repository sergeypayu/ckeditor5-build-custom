import { Plugin } from '@ckeditor/ckeditor5-core/src';
export default class TextTemplates extends Plugin {
    private _deleteItemCallback;
    private _insertItemCallback;
    private _submitCallback;
    private _cancelCallback;
    /**
     * @inheritDoc
     */
    static get pluginName(): "TextTemplates";
    /**
     * @inheritDoc
     */
    init(): void;
    private _getItems;
    private _setItems;
    private _createDropdownPanelListContent;
    private _createDropdownPanelEmptyContent;
    private _createDropdownPanelFormContent;
    private _closeDropdown;
}
