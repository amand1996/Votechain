import { voterSchema } from './schema/Voter';
import { adminSchema } from './schema/Admin';

export const models = (app, mongoose) => {
    voterSchema(app, mongoose);
    adminSchema(app, mongoose);
}