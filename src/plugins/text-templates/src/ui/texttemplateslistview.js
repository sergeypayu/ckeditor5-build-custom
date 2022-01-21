import { View, ListView, ListItemView, Model, ButtonView } from '@ckeditor/ckeditor5-ui';
import { Collection } from '@ckeditor/ckeditor5-utils';
import { icons } from '@ckeditor/ckeditor5-core';

import '../../theme/texttemplateslistview.css';

export default class TextTemplatesListView extends View {
    constructor(locale, dataList) {
        super(locale);

        this.items = this._createList(dataList);

        this.setTemplate({
            tag: 'div',
            children: [
                this.items
            ],
            attributes: {
                class: [
                    'ck',
                    'ck-texttemplates-list'
                ]
            }
        });
    }

    _createList(dataList) {
        const listView = new ListView(this.locale);
        const items = new Collection();

        for (const index in dataList) {
            const data = dataList[index];
            const titles = {};
            const def = {
                type: 'button',
                model: new Model({
                    label: data.name,
                    withText: true,
                    tooltip: strip(data.content)
                })
            };

            def.model.set({
                commandValue: data.content,
                commandId: data.id
            });

            items.add(def);

            titles[index] = data.name;
        }

        listView.items.bindTo(items).using(({model}) => {
            const listItemView = new ListItemView(this.locale);
            let buttonView = new ButtonView(this.locale);
            let buttonDelete = new ButtonView(this.locale);

            buttonDelete.delegate('execute').to(this, 'delete');
            buttonDelete.class = 'ck-texttemplates-delete-item'
            buttonDelete.icon = icons.cancel;

            buttonView.delegate('execute').to(this, 'insert');
            buttonView.bind(...Object.keys(model)).to(model);

            listItemView.children.add(buttonView);
            listItemView.children.add(buttonDelete);

            return listItemView;
        });

        return listView;
    }
}

function strip(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
}
