import { Plugin } from '@ckeditor/ckeditor5-core/src';
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
