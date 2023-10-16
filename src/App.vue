<script lang="ts" setup>
import {provide, ref, watch} from "vue";
import EnvButtonsList from "@/components/envs-buttons-list/env-buttons-list.vue";
import DefinesForm from "@/components/defines-form/defines-form.vue";
import ReconnectBackdrop from "@/components/reconnect-backdrop.vue";
import {useWebsocket} from "@/services/websoket/useWebsocket";
import BaseButton from "@/components/common/base-button/base-button.vue";

const buttons = ref([]);
const define = ref({});
const variables = ref([]);
const mode = ref(null);
const changedConfig = ref({
  mode: null,
  define: {}
})

provide('variables', variables)
provide('define', define)

const {
  status,
  onMessage,
  connect,
  send,
  update,
} = useWebsocket()

onMessage.value = messageParser;
connect()

watch(status, (value) => {
  if (value) {
    update()
  }
})

function messageParser(data) {
  buttons.value = data.envs;
  mode.value = data.mode;
  define.value = data.define;
  variables.value = data.variables;
}

function changeEnv(env: string) {
  changedConfig.value.mode = env;
}

function changeDefine(define: Record<string, string>) {
  // @ts-ignore
  changedConfig.value.define = Object.entries(define).reduce((acc, [key, value]) => {
    acc[key] = JSON.stringify(value);
    return acc;
  }, {})
}

function sendChangedConfig() {
  return send(changedConfig.value);
}

</script>

<template>
  <header class="app-header">
    <h1 class="app-header__title">vite remote config plugin</h1>
  </header>
  <main class="main-app">
    <div class="main-app__fields">
      <EnvButtonsList class="main-app__block"
                      :envs="buttons"
                      :mode="mode"
                      @change-env="changeEnv"/>
      <DefinesForm class="main-app__block"
                   @change-define="changeDefine"/>
    </div>
    <BaseButton class="main-app__submit-button"
                :is-active="true"
                @click="sendChangedConfig">submit
    </BaseButton>
  </main>
  <ReconnectBackdrop v-if="!status" @reconnectWS="connect"/>
</template>

<style lang="scss" scoped src="./App.scss"></style>
