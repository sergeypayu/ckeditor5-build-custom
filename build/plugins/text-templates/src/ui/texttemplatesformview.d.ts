import { ButtonView, FocusCycler, InputTextView, LabeledFieldView, View, ViewCollection, type FocusableView } from '@ckeditor/ckeditor5-ui';
import { FocusTracker, KeystrokeHandler, type Locale } from '@ckeditor/ckeditor5-utils';
import '@ckeditor/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
import '../../theme/texttemplatesformview.css';
export default class TextTemplatesFormView extends View<HTMLFormElement> {
    /**
     * Tracks information about the DOM focus in the form.
     */
    readonly focusTracker: FocusTracker;
    /**
     * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    readonly keystrokes: KeystrokeHandler;
    /**
     * An input with a label.
     */
    nameInputView: LabeledFieldView<InputTextView>;
    /**
     * A button used to submit the form.
     */
    saveButtonView: ButtonView;
    /**
     * A button used to cancel the form.
     */
    cancelButtonView: ButtonView;
    /**
     * A collection of views which can be focused in the form.
     */
    protected readonly _focusables: ViewCollection<FocusableView>;
    /**
     * Helps cycling over focusable {@link #items} in the view.
     */
    protected readonly _focusCycler: FocusCycler;
    /**
     * An array of form validators used by {@link #isValid}.
     */
    private readonly _validators;
    private _nameInputViewInfoDefault;
    private _nameInputViewInfoTip;
    nameInputValue: string;
    constructor(locale: Locale, validators: Array<TextTemplatesFormValidatorCallback>);
    render(): void;
    destroy(): void;
    focus(): void;
    get name(): string;
    set name(name: string);
    isValid(): boolean;
    private _createLabeledInputView;
    /**
     * Creates the button view.
     *
     * @param label The button label
     * @param icon The button's icon.
     * @param className The additional button CSS class name.
     * @param eventName The event name that the ButtonView#execute event will be delegated to.
     * @returns The button view instance.
     */
    private _createButton;
    /**
     * Cleans up the supplementary error and information text of the {@link #labeledInput}
     * bringing them back to the state when the form has been displayed for the first time.
     *
     * See {@link #isValid}.
     */
    resetFormStatus(): void;
}
export type TextTemplatesFormValidatorCallback = (form: TextTemplatesFormView) => string | undefined;
/**
 * Fired when the form view is submitted (when one of the children triggered the submit event),
 * for example with a click on {@link ~TextTemplatesFormView#saveButtonView}.
 *
 * @eventName ~TextTemplatesFormView#submit
 */
export type SubmitEvent = {
    name: 'submit';
    args: [];
};
/**
 * Fired when the form view is canceled, for example with a click on {@link ~TextTemplatesFormView#cancelButtonView}.
 *
 * @eventName ~TextTemplatesFormView#cancel
 */
export type CancelEvent = {
    name: 'cancel';
    args: [];
};
