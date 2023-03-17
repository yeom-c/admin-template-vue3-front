<script setup>
import { NForm, NFormItem, NInput, NButton, NIcon, NDivider, NH2, NP } from 'naive-ui'
import { LogoGoogle as GoogleIcon } from '@vicons/carbon'
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { postSignIn } from '@/requests/auth.js'

const appStore = useAppStore()
const userStore = useUserStore()
const formRef = ref(null)
const model = ref({
	email: null,
	password: null
})
const rules = {
	email: [
		{
			type: 'email',
			required: true,
			message: '이메일을 입력해주세요.'
		}
	],
	password: [
		{
			required: true,
			message: '비밀번호를 입력해주세요.'
		}
	]
}

const onSignIn = (e) => {
	e.preventDefault()
	formRef.value?.validate(async (errors) => {
		if (!errors) {
			const res = await postSignIn({
				authProvider: 'email',
				email: model.value.email,
				password: model.value.password
			})
			successSignIn(res)
		}
	})
}

const googleSignInCallback = async (response) => {
	const res = await postSignIn({
		authProvider: 'google',
		authCode: response.code
	})
	successSignIn(res)
}

const successSignIn = (res) => {
	userStore.signIn(res.data.access_token, res.data.user)
}
</script>

<template>
	<div class="rounded-box box-shadow bg-white" style="width: 320px; padding: 2rem">
		<n-h2 class="text-slate-600" style="font-weight: bold; margin: 0">{{ appStore.appName }}</n-h2>
		<n-p class="text-slate-500" style="font-size: 18px">안녕하세요! 👋</n-p>
		<n-form ref="formRef" :model="model" :rules="rules" size="large" :show-require-mark="false">
			<n-form-item path="email" label="이메일">
				<n-input
					v-model:value="model.email"
					placeholder="admin@email.com"
					@keydown.enter.prevent
				/>
			</n-form-item>
			<n-form-item path="password" label="비밀번호">
				<n-input
					v-model:value="model.password"
					type="password"
					show-password-on="mousedown"
					@keydown.enter.prevent
				/>
			</n-form-item>
			<n-button
				:disabled="model.email === null || model.password === null"
				type="primary"
				size="large"
				style="width: 100%"
				secondary
				@click="onSignIn($event)"
				>로그인</n-button
			>
			<n-divider />
			<GoogleLogin :callback="googleSignInCallback" style="width: 100%">
				<n-button size="large" style="width: 100%">
					<template #icon>
						<n-icon>
							<google-icon />
						</n-icon>
					</template>
					with Google
				</n-button>
			</GoogleLogin>
		</n-form>
	</div>
</template>

<style lang="scss" scoped></style>
