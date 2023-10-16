import {ref, watch} from "vue";
import {WebsoketEventsEnum} from "../../enums/websoket-events.enum";

export const useWebsocket = () => {
    const status = ref(false);
    const ws = ref<WebSocket>(null);
    const onMessage = ref<Function>(() => null);
    const connect = () => {
        try {
            ws.value = new WebSocket('ws://localhost:32123')
        } catch (e) {
            console.log(e)
        }
    }

    const send = (data: any) => {
        ws.value.send(JSON.stringify({event: WebsoketEventsEnum.CHANGE, data}))
    }

    const update = () => {
        ws.value.send(JSON.stringify({event: WebsoketEventsEnum.UPDATE}))
    }

    watch(ws, (newWs) => {
        if (newWs) {
            newWs.onopen = () => {
                status.value = true
            }
            newWs.onclose = () => {
                status.value = false;
                ws.value = null;
            }
            newWs.onmessage = (event) => {
                const data = JSON.parse(event.data)
                onMessage.value(data.data)
            }
        }
    })

    return {
        status,
        onMessage,
        connect,
        send,
        update,
    }
}