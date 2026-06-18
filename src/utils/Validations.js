export function noteValidator(note) {
    if (note === null || note === "") {
        return {
            valid: true,
            message: "",
        };
    }

    if (note < 10) {
        return {
            valid: false,
            message: "El valor debe ser superior o igual a 10",
        };
    }

    if (note > 70) {
        return {
            valid: false,
            message: "El valor ddebe ser inferior o igual a 70",
        };
    }

    return {
        valid: true,
        message: "",
    };
}

export function asistValidator(value) {
    if (value === null || value === "") {
        return true;
    }

    return value >= 0 && value <= 100;
}