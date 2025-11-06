<script setup lang="ts">

const { user, fetchUser, logout } = useAuth();

onMounted(async () => {
    if (!user.value) await fetchUser()
})
</script>

<template>
    <div>
        <h1>Welcome</h1>

        <div v-if="user">
            <p>Name: {{ user.name }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Email Verified: {{ user.email_verified_at }}</p>
        </div>

        <div v-else>
            Loading user...
        </div>

        <button @click="logout">Logout</button>
    </div>
</template>
