import { Editor, Command } from 'ckeditor5';
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
