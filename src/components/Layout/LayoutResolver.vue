<template>
    <div>
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>

<script>
export default {
    name: "LayoutResolver",
    data: () => ({})
};
</script>