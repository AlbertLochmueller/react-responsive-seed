import {Module} from 'react.di';
import {UserHttpService} from './services/UserHttpService';

@Module({
  providers: [
    UserHttpService,
  ]
})
export class UserModule {
}
