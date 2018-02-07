import {Module} from 'react.di';
import {NewsletterHttpService} from './shared/services/NewsletterHttpService';

@Module({
  providers: [
    NewsletterHttpService,
  ]
})
export class StartModule {
}
