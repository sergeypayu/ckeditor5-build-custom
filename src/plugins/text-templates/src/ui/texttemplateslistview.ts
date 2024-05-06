import { View, ListView, ListItemView, ViewModel, ButtonView } from '@ckeditor/ckeditor5-ui';
import { Collection, type Locale } from '@ckeditor/ckeditor5-utils';
import { icons } from '@ckeditor/ckeditor5-core';

import '../../theme/texttemplateslistview.css';
import { TemplateItemModel } from '../templateitemmodel';

export default class TextTemplatesListView extends View<HTMLDivElement> {

    constructor(locale: Locale, dataList: TemplateItemModel[]) {
        super(locale);

        const list = this._createList(locale, dataList);

        this.setTemplate({
            tag: 'div',
            children: [
                list
            ],
            attributes: {
                class: [
                    'ck',
                    'ck-texttemplates-list'
                ]
            }
        });
    }

    private _createList(locale: Locale, dataList: TemplateItemModel[]): ListView {
        const listView = new ListView(locale);
        const items = new Collection();

        for (const index in dataList) {
            const data = dataList[index];
            const def = {
                type: 'button',
                model: new ViewModel({
                    commandValue: data.content,
                    commandId: data.id,
                    label: data.name,
                    withText: true,
                    tooltip: this.strip(data.content),
                })
            };
            items.add(def);
        }

        listView.items.bindTo(items).using(({ model }) => {
            const listItemView = new ListItemView(this.locale);
            const buttonView = new ButtonView(this.locale);
            const buttonDelete = new ButtonView(this.locale);

            buttonDelete.class = 'ck-texttemplates-delete-item'
            buttonDelete.icon = icons.cancel;
            buttonDelete.on('execute', () => {
                this.fire<DeleteEvent>('delete', {
                    itemId: model.commandId
                });
            });

            buttonView.on('execute', () => {
                this.fire<InsertEvent>('insert', {
                    itemText: model.commandValue
                });
            })
            buttonView.label = model.label;
            buttonView.withText = model.withText;
            buttonView.tooltip = model.tooltip;

            listItemView.children.add(buttonView);
            listItemView.children.add(buttonDelete);

            return listItemView;
        });

        return listView;
    }

    public focus(): void {
        // не робимо нічого, це треба щоб уникнути ui-dropdown-panel-focus-child-missing-focus помилки
    }

    private strip(html: string): string {
        const tmp = document.implementation.createHTMLDocument('New').body;
        tmp.innerHTML = html.replace(/(<\/(?:p|h[1-6])>)/gi, ' $1').replace(/^&nbsp;/i, '');
        return tmp.textContent || tmp.innerText || '';
    }
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
}

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
}
