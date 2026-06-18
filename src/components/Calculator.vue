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
const formSubmitted = ref(false);

const touched = ref({
    note1: false,
    note2: false,
    note3: false,
    asist: false
});

const errors = computed(() => {
    return {
        note1: noteValidator(note1.value),
        note2: noteValidator(note2.value),
        note3: noteValidator(note3.value),
        asist: asistValidator(asist.value)
    };
});

const isFormValid = computed(() => {
    return (
        errors.value.note1.valid &&
        errors.value.note2.valid &&
        errors.value.note3.valid &&
        errors.value.asist.valid
    );
});

function calculate() {
    formSubmitted.value = true;
    resultValidation.value = "";
    showResult.value = false;

    if (!isFormValid.value) {
        resultValidation.value = "Debe completar todos los campos correctamente.";
        averageResult.value = "";
        status.value = "";
        return;
    }

    const average = note1.value * 0.35 + note2.value * 0.35 + note3.value * 0.3;
    averageResult.value = average.toFixed(1);

    status.value = average >= 40 && asist.value >= 80 ? "Aprobado" : "Reprobado";
    showResult.value = true;
}
</script>

<template>
    <form class="card" @submit.prevent="calculate">
        <h2>Calculadora de Notas</h2>

        <div>
            <p>Nota 1</p>
            <input v-model.number="note1" type="number" placeholder="Nota 1" @blur="touched.note1 = true" />
            <p v-if="(formSubmitted || touched.note1) && !errors.note1.valid" class="error">
                {{ errors.note1.message }}
            </p>
        </div>

        <div>
            <p>Nota 2</p>
            <input v-model.number="note2" type="number" placeholder="Nota 2" @blur="touched.note2 = true" />
            <p v-if="(formSubmitted || touched.note2) && !errors.note2.valid" class="error">
                {{ errors.note2.message }}
            </p>
        </div>

        <div>
            <p>Nota 3</p>
            <input v-model.number="note3" type="number" placeholder="Nota 3" @blur="touched.note3 = true" />
            <p v-if="(formSubmitted || touched.note3) && !errors.note3.valid" class="error">
                {{ errors.note3.message }}
            </p>
        </div>

        <div>
            <p>Asistencia %</p>
            <input v-model.number="asist" type="number" placeholder="Asistencia %" @blur="touched.asist = true" />
            <p v-if="(formSubmitted || touched.asist) && !errors.asist.valid" class="error">
                {{ errors.asist.message }}
            </p>
        </div>

        <button type="submit">Calcular</button>

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