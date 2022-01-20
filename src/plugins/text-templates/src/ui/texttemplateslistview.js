import { View, ListView, ListItemView, Model, ButtonView } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';
import { icons } from 'ckeditor5/src/core';

import '../../theme/texttemplateslistview.css';

export default class TextTemplatesListView extends View {
    constructor(locale, editor, dropdown) {
        super(locale);

        this.items = this._createList(editor, dropdown);

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

    _createList(editor, dropdown) {
        const listView = new ListView(this.locale);
        const dataList = JSON.parse(localStorage.getItem('ckTextTemplates'));
        const headingCommand = editor.commands.get('heading');
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

            def.model.bind('isOn').to(headingCommand, 'value', value => value === data.content);
            def.model.set({
                commandName: 'heading',
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

            buttonDelete.on('execute', () => {
                const newList = dataList.filter(data => data.id !== model.commandId);
                localStorage.setItem('ckTextTemplates', JSON.stringify(newList));
                closeUI(this.editor, dropdown);
            });
            buttonDelete.class = 'ck-texttemplates-delete-item'
            buttonDelete.icon = icons.cancel;

            buttonView.on('execute', () => {
                const viewFragment = editor.data.processor.toView(model.commandValue);
                const modelFragment = editor.data.toModel(viewFragment);
                editor.model.insertContent(modelFragment);
                closeUI(this.editor, dropdown);
            });
            buttonView.bind(...Object.keys(model)).to(model);
            buttonView.delegate('execute').to(listItemView);

            listItemView.children.add(buttonView);
            listItemView.children.add(buttonDelete);

            return listItemView;
        });

        return listView;
    }
}

function closeUI(editor, dropdown) {
    editor.editing.view.focus();
    dropdown.isOpen = false;
}

function strip(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
}