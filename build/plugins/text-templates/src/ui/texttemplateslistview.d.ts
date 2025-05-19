import { View } from 'ckeditor5';
import { type Locale } from 'ckeditor5';
import '../../theme/texttemplateslistview.css';
import { TemplateItemModel } from '../templateitemmodel';
export default class TextTemplatesListView extends View<HTMLDivElement> {
    constructor(locale: Locale, dataList: TemplateItemModel[]);
    private _createList;
    focus(): void;
    private strip;
}
/**
 * Fired when one of the items is the list view is selected
 *
 * @eventName ~TextTemplatesListView#insert
 */
export type InsertEvent = {
    name: 'insert';
    args: [InsertEventData];
};
export type InsertEventData = {
    itemText: string;
};
/**
 * Fired when one of the items in the list view is deleted
 *
 * @eventName ~TextTemplatesListView#delete
 */
export type DeleteEvent = {
    name: 'delete';
    args: [DeleteEventType];
};
export type DeleteEventType = {
    itemId: number;
};
