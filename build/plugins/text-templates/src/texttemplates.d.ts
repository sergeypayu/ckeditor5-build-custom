export default class TextTemplates extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): string;
    constructor(editor: any);
    init(): void;
    _getItems(): any;
    _setItems(items: any): void;
    _createDropdownPanelListContent(locale: any, dropdownView: any, dataList: any): TextTemplatesListView;
    _createDropdownPanelEmptyContent(locale: any): TextTemplatesEmptyView;
    _createDropdownPanelFormContent(locale: any, dropdownView: any, selectedContent: any): TextTemplatesFormView;
}
import { Plugin } from '@ckeditor/ckeditor5-core/src';
import TextTemplatesListView from './ui/texttemplateslistview';
import TextTemplatesEmptyView from './ui/texttemplatesemptyview';
import TextTemplatesFormView from './ui/texttemplatesformview';
