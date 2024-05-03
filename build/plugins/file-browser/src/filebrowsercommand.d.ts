export default class FileBrowserCommand extends Command {
    /**
     * @inheritDoc
     */
    constructor(editor: any);
    /**
     * @inheritDoc
     */
    execute(): void;
    messageHandlerListener: ((event: any) => void) | null | undefined;
    pollTimer: any;
}
import { Command } from '@ckeditor/ckeditor5-core/src';
