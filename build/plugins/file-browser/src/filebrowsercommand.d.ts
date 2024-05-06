import { Editor } from '@ckeditor/ckeditor5-core';
import { Command } from '@ckeditor/ckeditor5-core/src';
export default class FileBrowserCommand extends Command {
    private messageHandlerListener;
    private pollTimer;
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * @inheritDoc
     */
    execute(): void;
    destroy(): void;
}
