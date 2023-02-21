import { EntryRouter } from './entry-router';
import { EntryController } from '../controllers';
import { ApiRouter } from './api-router';

export const routes: ApiRouter[] = [new EntryRouter(new EntryController())];
