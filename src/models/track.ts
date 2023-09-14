import { Schema } from 'mongoose';

export interface ITrack {
  userId: Schema.Types.ObjectId;
  name: string;
  locations: IPoint[];
}

export interface IPoint {
  timestamp: number;
  coordinates: ICoordinate
}

export interface ICoordinate {
  latitude: number;
  longitude: number;
  altitude: number;
  accuracy: number;
  heading: number;
  speed: number;
}
