import { Plugin } from 'ckeditor5';
export default class LinkName extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "LinkName";
    /**
     * @inheritDoc
     */
    init(): void;
}
