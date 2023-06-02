import { createStore, StoreOptions } from 'vuex'
import { PlaygroundModule } from './playground';
import { RootState } from './types'
import { UserModule } from './user';

const store: StoreOptions<RootState> = {
  state: {
    helloMessage: "",
  },
  modules: {
    UserModule,
    PlaygroundModule,
  },
}

export default createStore<RootState>(store);
