export function noteValidator(note) {
    if (note === null || note === "" || isNaN(note)) {
        return { valid: false, message: "Campo obligatorio" };
    }
    if (note < 10) {
        return { valid: false, message: "El valor debe ser superior o igual a 10" };
    }
    if (note > 70) {
        return { valid: false, message: "El valor debe ser inferior o igual a 70" };
    }
    return { valid: true, message: "" };
}

export function asistValidator(value) {
    if (value === null || value === "" || isNaN(value)) {
        return { valid: false, message: "Campo obligatorio" };
    }

    if (value < 0 || value > 100) {
        return { valid: false, message: "La asistencia debe estar entre 0 y 100%" };
    }

    return { valid: true, message: "" };
}