import { Plugin } from 'ckeditor5';
import { Notification } from 'ckeditor5';
import { CKEditorError } from 'ckeditor5';

import FileBrowserCommand from './filebrowsercommand';

export default class FileBrowserEditing extends Plugin {
    /**
     * @inheritDoc
     */
    public static get pluginName() {
        return 'FileBrowserEditing' as const;
    }

    /**
     * @inheritDoc
     */
    static get requires() {
        return [Notification, 'LinkEditing'];
    }

    /**
     * @inheritDoc
     */
    public init(): void {
        const editor = this.editor;

        if (!editor.plugins.has('ImageBlockEditing') && !editor.plugins.has('ImageInlineEditing')) {
            /**
             * FileBrowser requires at least one plugin providing support for images loaded in the editor. Please
             * make sure either:
             *
             * * {@link module:image/image~Image} (which loads both types of images),
             * * or {@link module:image/imageblock~ImageBlock},
             * * or {@link module:image/imageinline~ImageInline}.
             *
             * is loaded in your editor configuration.
             */
            throw new CKEditorError('filebrowser-missing-image-plugin', editor);
        }

        editor.commands.add('fileBrowser', new FileBrowserCommand(editor));
    }
}
