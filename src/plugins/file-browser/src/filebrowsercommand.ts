import { Editor, Command } from 'ckeditor5';
import { CKEditorError } from 'ckeditor5';

export default class FileBrowserCommand extends Command {

    private messageHandlerListener: ((event: MessageEvent) => void) | undefined;

    private pollTimer: number | undefined;

    /**
     * @inheritDoc
     */
    constructor(editor: Editor) {
        super(editor);

        // Remove default document listener to lower its priority.
        this.stopListening(this.editor.model.document, 'change');

        // Lower this command listener priority to be sure that refresh() will be called after link & image refresh.
        this.listenTo(this.editor.model.document, 'change', () => this.refresh(), { priority: 'low' });
    }

    /**
     * @inheritDoc
     */
    public override refresh(): void {
        const imageCommand = this.editor.commands.get('insertImage')!;
        const linkCommand = this.editor.commands.get('link')!;

        // The FileBrowser command is enabled when one of image or link command is enabled.
        this.isEnabled = imageCommand.isEnabled || linkCommand.isEnabled;
    }

    /**
     * @inheritDoc
     */
    public override execute(): void {
        const editor = this.editor;
        const t = editor.t;

        const browseUrl = this.editor.config.get('fileBrowser.browseUrl') as string;

        if (!browseUrl) {
            /**
             * The `fileBrowser.browseUrl` is required.
             */
            throw new CKEditorError('filebrowser-missing-browse-url', editor);
        }

        const fileBrowserUrl = new URL(browseUrl, window.location.href);
        fileBrowserUrl.searchParams.set('editor', editor.id);

        function messageHandler(event: MessageEvent): void {
            // try parsing incoming event
            let fileBrowserEvent;
            try {
                fileBrowserEvent = JSON.parse(event.data);
            } catch (ignore) {
                return;
            }

            // we are interested only in events targeted for the current editor
            if (fileBrowserEvent.editor !== editor.id) {
                return;
            }

            insertImages(editor, fileBrowserEvent.source);
        }

        this.messageHandlerListener = messageHandler.bind(this);

        window.addEventListener('message', this.messageHandlerListener, false);

        // open popup
        const popupWindow = window.open(fileBrowserUrl, t('Вставити зображення чи файл'), 'popup,left=100,top=100,width=930,height=800');

        // check if popup is closed in polling cycle
        this.pollTimer = window.setInterval(() => {
            if (popupWindow?.closed !== false) {
                // if popup is closed, clear timer and message listener
                window.removeEventListener('message', this.messageHandlerListener!, false);
                this.messageHandlerListener = undefined;
                window.clearInterval(this.pollTimer);
                this.pollTimer = undefined;
            }
        }, 1000);
    }

    public override destroy(): void {
        super.destroy();

        // clear timer
        if (this.pollTimer) {
            window.clearInterval(this.pollTimer);
            this.pollTimer = undefined;
        }
        // clear message listener
        if (this.messageHandlerListener) {
            window.removeEventListener('message', this.messageHandlerListener, false);
            this.messageHandlerListener = undefined;
        }
    }
}

function insertImages(editor: Editor, urls: Array<string>): void {
    const imageCommand = editor.commands.get('insertImage')!;

    // Check if inserting an image is actually possible - it might be possible to only insert a link.
    if (!imageCommand.isEnabled) {
        const notification = editor.plugins.get('Notification');
        const t = editor.locale.t;

        notification.showWarning(t('Не вдалося вставити зображення в поточну позицію.'), {
            title: t('Не вдалося вставити зображення'),
            namespace: 'fileBrowser'
        });

        return;
    }

    editor.execute('insertImage', {source: urls});
}
