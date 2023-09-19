import { Schema } from 'mongoose';

export interface ITrack {
  userId: Schema.Types.ObjectId;
  name: string;
  locations: IPoint[];
}

export interface IPoint {
  timestamp: number;
  coords: ICoordinate
}

export interface ICoordinate {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}
