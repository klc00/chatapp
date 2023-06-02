import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { RootState } from './store/types'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<RootState>
    }
}

declare module "vuex" {
    export function useStore(key?: string): Store<State>;
}