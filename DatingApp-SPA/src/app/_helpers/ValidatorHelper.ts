export namespace ValidatorHelper {
    export function isInvalidControl(registerForm: any, controlName: string): boolean {
        return registerForm.get(controlName).errors && registerForm.get(controlName).touched;
    }

    export function getControlError(registerForm: any, controlName: string,
            specificErrorMessage?: string): string {
        const formControl = registerForm.get(controlName);

        if (formControl.hasError('required')) {
            return 'Field is required';
        }
        if (formControl.hasError('minlength')) {
            return 'Value is to short';
        }
        if (formControl.hasError('maxlength')) {
            return 'Value is to long';
        }

        return specificErrorMessage;
    }
}
