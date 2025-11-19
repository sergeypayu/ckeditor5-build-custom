import { Plugin } from 'ckeditor5';

import BlogcutCommand from './blogcutcommand';

export default class BlogcutEditing extends Plugin {
    /**
     * @inheritDoc
     */
    public static get pluginName() {
        return 'BlogcutEditing' as const;
    }

    /**
     * @inheritDoc
     */
    public init(): void {
        const editor = this.editor;

        editor.commands.add('insertBlogcut', new BlogcutCommand(editor));
    }
}