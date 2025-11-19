import { Command } from 'ckeditor5';
export default class BlogcutCommand extends Command {
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * @inheritDoc
     */
    execute(options?: {
        text?: string;
        replace?: boolean;
    }): void;
}
