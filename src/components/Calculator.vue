<script setup>
import { ref, computed } from "vue";
import { noteValidator, asistValidator } from "@/utils/Validations";

const note1 = ref(null);
const note2 = ref(null);
const note3 = ref(null);
const asist = ref(null);

const averageResult = ref("");
const status = ref("");
const showResult = ref(false);
const resultValidation = ref("");

const isFormValid = computed(() => {
    return (
        noteValidator(note1.value).valid &&
        noteValidator(note2.value).valid &&
        noteValidator(note3.value).valid &&
        asistValidator(asist.value)
    );
});

function calculate() {
    resultValidation.value = "";
    showResult.value = false;

    if (!isFormValid.value) {
        resultValidation.value = "Debe completar todos los campos correctamente.";
        return;
    }

    const average =
        note1.value * 0.35 +
        note2.value * 0.35 +
        note3.value * 0.3;

    averageResult.value = average;

    status.value = average >= 40 && asist.value >= 80
        ? "Aprobado"
        : "Reprobado";

    showResult.value = true;
}
</script>

<template>
    <form class="card" @submit.prevent="calculate">
        <h2>Calculadora de Notas</h2>

        <div>
            <input v-model.number="note1" type="number" min="10" max="70" placeholder="Nota 1" />
            <p v-if="!noteValidator(note1).valid" class="error">
                {{ noteValidator(note1).message }}
            </p>
        </div>

        <div>
            <input v-model.number="note2" type="number" min="10" max="70" placeholder="Nota 2" />
            <p v-if="!noteValidator(note2).valid" class="error">
                {{ noteValidator(note2).message }}
            </p>
        </div>

        <div>
            <input v-model.number="note3" type="number" min="10" max="70" placeholder="Nota 3" />
            <p v-if="!noteValidator(note3).valid" class="error">
                {{ noteValidator(note3).message }}
            </p>
        </div>

        <div>
            <input v-model.number="asist" type="number" min="0" max="100" placeholder="Asistencia %" />
            <p v-if="!asistValidator(asist)" class="error">
                La asistencia debe estar entre 0 y 100%.
            </p>
        </div>

        <button :disabled="!isFormValid" type="submit">
            Calcular
        </button>

        <p v-if="resultValidation" class="error">
            {{ resultValidation }}
        </p>

        <div v-if="showResult" class="result" :class="status === 'Aprobado' ? 'approved' : 'rejected'">
            <p><strong>Promedio:</strong> {{ averageResult }}</p>
            <p><strong>Estado:</strong> {{ status }}</p>
        </div>
    </form>
</template>

<style scoped>
.card {
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.card div {
    padding-bottom: 10px;
}

input {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    outline: none;
    transition: 0.2s;
}

input:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #4f46e5;
    color: white;
    cursor: pointer;
    margin-top: 10px;
    transition: 0.2s;
}

button:disabled {
    background: #9ca3af;
    cursor: not-allowed;
}

button:hover {
    background: #3730a3;
}

.error {
    color: #e11d48;
    font-size: 12px;
    margin: 4px 0 0;
}

.result {
    margin-top: 15px;
    padding: 10px;
    background: #f3f4f6;
    border-radius: 8px;
}

.approved {
    border: 2px solid #22c55e;
}

.rejected {
    border: 2px solid #ef4444;
}
</style>