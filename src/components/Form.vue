HTML

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const touched = ref({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
});

const errors = ref({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
});

function validateName() {
    if (!touched.value.name) return;
    errors.value.name = !name.value ? "El nombre es requerido" : "";
}

function validateEmail() {
    if (!touched.value.email) return;
    if (!email.value) {
        errors.value.email = "El correo es requerido";
    } else if (!isValidEmail(email.value)) {
        errors.value.email = "Correo inválido";
    } else {
        errors.value.email = "";
    }
}

function validatePassword() {
    if (!touched.value.password) return;
    errors.value.password = !password.value ? "La contraseña es requerida" : "";
    if (touched.value.confirmPassword) validateConfirmPassword();
}

function validateConfirmPassword() {
    if (!touched.value.confirmPassword) return;
    if (!confirmPassword.value) {
        errors.value.confirmPassword = "Confirma tu contraseña";
    } else if (password.value !== confirmPassword.value) {
        errors.value.confirmPassword = "La contraseña debe coincidir";
    } else {
        errors.value.confirmPassword = "";
    }
}

function validate() {
    Object.keys(touched.value).forEach(key => touched.value[key] = true);

    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    const hasErrors = Object.values(errors.value).some(error => error !== "");

    if (hasErrors) return;

    alert("El registro se ha realizado correctamente");
}

function isValidEmail(val) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val);
}
</script>

<template>
    <form class="card" @submit.prevent="validate">
        <h2>Registro</h2>
        <div>
            <p>Nombre</p>
            <input 
                v-model="name" 
                type="text" 
                placeholder="Nombre" 
                @blur="touched.name = true; validateName()"
                @input="validateName()"
            />
            <p class="error" v-if="errors.name">{{ errors.name }}</p>
        </div>
        <div>
            <p>Correo Electrónico</p>
            <input 
                v-model="email" 
                type="email" 
                placeholder="Correo" 
                @blur="touched.email = true; validateEmail()"
                @input="validateEmail()"
            />
            <p class="error" v-if="errors.email">{{ errors.email }}</p>
        </div>
        <div>
            <p>Contraseña</p>
            <input 
                v-model="password" 
                type="password" 
                placeholder="Contraseña" 
                @blur="touched.password = true; validatePassword()"
                @input="validatePassword()"
            />
            <p class="error" v-if="errors.password">{{ errors.password }}</p>
        </div>
        <div>
            <p>Confirmar Contraseña</p>
            <input 
                v-model="confirmPassword" 
                type="password" 
                placeholder="Confirmar contraseña" 
                @blur="touched.confirmPassword = true; validateConfirmPassword()"
                @input="validateConfirmPassword()"
            />
            <p class="error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
        </div>

        <button type="submit">Registrar</button>
    </form>
</template>
<style scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 12px;
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

input {
    width: 100%;
    padding: 10px;
    /* margin-bottom: 10px; */
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
    margin-top: 15px;
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
</style>