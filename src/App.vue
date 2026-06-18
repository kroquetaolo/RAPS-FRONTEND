<script setup>
import { ref } from "vue";

const isOpen = ref(false);

function toggleMenu() {
    isOpen.value = !isOpen.value;
}
</script>

<template>
    <nav class="navbar">
        <div class="brand">Frontend</div>

        <button class="hamburger" @click="toggleMenu">
            ☰
        </button>

        <div class="links" :class="{ open: isOpen }">
            <ul>
                <li>
                    <router-link to="/" @click="isOpen = false" active-class="active">
                        Cálculo de calificaciones
                    </router-link>
                </li>
                <li>

                    <router-link to="/formulario" @click="isOpen = false" active-class="active">
                        Formulario de Registro
                    </router-link>
                </li>
            </ul>

        </div>
    </nav>

    <router-view />
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background: #b46fcf;
    color: white;
}

.brand {
    font-weight: bold;
}

.links ul {
    list-style: none;
    display: flex;
    gap: 1rem;
}

.links li {
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 8px;
}

.links a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 8px;
    transition: 0.2s;
}

.links a:hover {
    background: rgba(255, 255, 255, 0.2);
}

.links a.active {
    background: white;
    color: #5b217a;
    font-weight: bold;
}

.hamburger {
    display: none;
    font-size: 24px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
}

@media (max-width: 768px) {
    .hamburger {
        display: block;
    }

    .links ul {
        flex-direction: column;
        gap: 10px;
    }

    .links {
        display: none;
        position: absolute;
        top: 60px;
        right: 20px;
        background: #b46fcf;
        padding: 10px;
        border-radius: 8px;
    }

    .links.open {
        display: block;
    }
}
</style>
