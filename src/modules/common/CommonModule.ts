import {Module} from 'react.di';
import {HISTORY_TOKEN, history} from './history';

@Module({
  providers: [
    {provide: HISTORY_TOKEN, useValue: history},
  ]
})
export class CommonModule {
}
