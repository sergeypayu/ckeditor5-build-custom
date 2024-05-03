export default class TextTemplatesFormView extends View<HTMLElement> {
    constructor(validators: any, locale: any);
    focusTracker: FocusTracker;
    keystrokes: KeystrokeHandler;
    nameInputView: LabeledFieldView<import("@ckeditor/ckeditor5-ui").InputTextView>;
    saveButtonView: ButtonView;
    cancelButtonView: ButtonView;
    _focusables: ViewCollection<View<HTMLElement>>;
    _focusCycler: FocusCycler;
    _validators: any;
    focus(): void;
    set name(arg: string);
    get name(): string;
    isValid(): boolean;
    _createInput(): LabeledFieldView<import("@ckeditor/ckeditor5-ui").InputTextView>;
    _nameInputViewInfoDefault: string | undefined;
    _nameInputViewInfoTip: string | undefined;
    nameInputValue: string | undefined;
    _createButton(label: any, icon: any, className: any, eventName: any): ButtonView;
    resetFormStatus(): void;
}
import { View } from '@ckeditor/ckeditor5-ui';
import { FocusTracker } from '@ckeditor/ckeditor5-utils';
import { KeystrokeHandler } from '@ckeditor/ckeditor5-utils';
import { LabeledFieldView } from '@ckeditor/ckeditor5-ui';
import { ButtonView } from '@ckeditor/ckeditor5-ui';
import { ViewCollection } from '@ckeditor/ckeditor5-ui';
import { FocusCycler } from '@ckeditor/ckeditor5-ui';
