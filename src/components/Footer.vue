<script setup>
const date = new Date()
const year = date.getFullYear()
</script>

<template>
	<div class="footer text-slate-600">ⓒ {{ year }}. Yeom.C. All rights reserved.</div>
</template>

<style lang="scss" scoped>
.footer {
	margin: 0 2rem 1rem 2rem;
	text-align: right;
}
</style>
