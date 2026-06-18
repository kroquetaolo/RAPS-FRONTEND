<script setup>
import { ref } from "vue";

const name = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

const errors = ref({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
});

function validate() {
    errors.value = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    let valid = true;

    if (!name.value) {
        errors.value.name = "El nombre es requerido";
        valid = false;
    }

    if (!email.value) {
        errors.value.email = "El correo es requerido";
        valid = false;
    }

    if (!isValidEmail(email.value)) {
        errors.value.email = "Correo inválido";
        valid = false;
    }

    if (!password.value) {
        errors.value.password = "La contraseña es requerida";
        valid = false;
    }

    if (!confirmPassword.value) {
        errors.value.confirmPassword = "Confirma tu contraseña";
        valid = false;
    }
    if (password.value !== confirmPassword.value) {
        errors.value.confirmPassword = "La constraseña debe coincidir";
        valid = false;
    }

    if (!valid) return;

    alert("El registro se ha realizado correctamente")
}

function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.value)
}
</script>


<template>
    <form class="card" @submit.prevent="validate">
        <h2>Registro</h2>
        <div>
            <p>Nombre</p>
            <input v-model="name" type="text" placeholder="Nombre" />
            <p class="error" v-if="errors.name">{{ errors.name }}</p>
        </div>
        <div>
            <p>Correo Electronico</p>
            <input v-model="email" type="email" placeholder="Correo" />
            <p class="error" v-if="errors.email">{{ errors.email }}</p>
        </div>
        <div>
            <p>Contraseña</p>
            <input v-model="password" type="password" placeholder="Contraseña" />
            <p class="error" v-if="errors.password">{{ errors.password }}</p>
        </div>
        <div>
            <p>Confirmar Contraseña</p>
            <input v-model="confirmPassword" type="password" placeholder="Confirmar contraseña" />
            <p class="error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
        </div>

        <button type="submit">
            Registrar
        </button>
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