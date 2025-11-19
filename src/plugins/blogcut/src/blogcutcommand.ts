import { Command } from 'ckeditor5';

import { getSelectedBlogcut } from './helper';

export default class BlogcutCommand extends Command {

    /**
     * @inheritDoc
     */
    public override refresh() {
        const selected = getSelectedBlogcut(this.editor);
        this.isEnabled = true;
        this.value = !!selected;
    }

    /**
     * @inheritDoc
     */
    public override execute(options: { text?: string; replace?: boolean } = {}) {
        const { text = '', replace = false } = options;
        const editor = this.editor;

        editor.model.change(writer => {
            const selected = getSelectedBlogcut(editor);

            if (replace && selected) {
                writer.setAttribute('text', text, selected);
                return;
            }

            const blogcut = writer.createElement('blogcut', { text });
            editor.model.insertObject(blogcut, null, null, { setSelection: 'on', findOptimalPosition: 'auto' });
        });
    }
}
