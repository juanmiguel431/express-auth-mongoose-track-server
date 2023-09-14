import { Schema, model, Model } from 'mongoose';
import { IPoint, ITrack } from '../models/track';
import DbSchema from './dbSchema';

interface IInstanceMethods {}
interface IStaticMethods {}

type TrackModel = Model<ITrack, {}, IInstanceMethods> & IStaticMethods;


const pointSchema = new Schema<IPoint>({
  timestamp: Number,
  coordinate: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  }
});


const schema = new Schema<ITrack, TrackModel>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: DbSchema.User,
  },
  name: {
    type: String,
    default: ''
  },
  locations: [pointSchema]
});

export const trackSchema = model<ITrack, TrackModel>(DbSchema.Track, schema);

export default trackSchema;
