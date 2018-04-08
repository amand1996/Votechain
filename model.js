import {
    voterSchema
} from './schema/Voter';
import {
    adminSchema
} from './schema/Admin';
import {
    candidateSchema
} from './schema/Candidate'

export const models = (app, mongoose) => {
    voterSchema(app, mongoose);
    adminSchema(app, mongoose);
    candidateSchema(app, mongoose);
}