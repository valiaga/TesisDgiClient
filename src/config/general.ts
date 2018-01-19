export const snackBarDuration = {
    duration: 3000
};

export function getMessageConfirm(message, viewContainerRef) {
    return {
        message: message,
        // disableClose: true | false, // defaults to false
        disableClose: false, // defaults to false
        viewContainerRef: viewContainerRef, // OPTIONAL
        title: 'Confirmación', // OPTIONAL, hides if not provided
        cancelButton: 'Cancelar', // OPTIONAL, defaults to 'CANCEL'
        acceptButton: 'Aceptar', // OPTIONAL, defaults to 'ACCEPT'
    };
}
