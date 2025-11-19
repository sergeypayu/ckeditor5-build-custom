import { Plugin, Widget } from 'ckeditor5';
import BlogcutEditing from './blogcutediting';
import BlogcutUI from './blogcutui';
export default class Blogcut extends Plugin {
    static get requires(): (typeof Widget | typeof BlogcutEditing | typeof BlogcutUI)[];
    static get pluginName(): "Blogcut";
    init(): void;
}
