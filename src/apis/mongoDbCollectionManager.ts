import {
  Collection,
  Db,
  Filter, FindCursor, FindOptions, InsertManyResult,
  InsertOneResult,
  MongoClient,
  OptionalUnlessRequiredId,
  WithId, Document
} from 'mongodb';

export default class MongoDbCollectionManager<T extends Document = any> {
  private readonly collection: Collection<T>;
  private db: Db;
  private client: MongoClient;

  constructor(client: MongoClient, collection: string) {
    this.client = client

    this.db = this.client.db(process.env.MONGODB_DATABASE);
    this.collection = this.db.collection(collection);
  }

  public async connect(): Promise<void> {
    await this.client.connect();
  }

  public async close(): Promise<void> {
    await this.client.close();
  }

  public async insert(item: OptionalUnlessRequiredId<T>): Promise<InsertOneResult<T>> {
    return this.collection.insertOne(item);
  }

  public async insertMany(items: OptionalUnlessRequiredId<T>[]): Promise<InsertManyResult<T>> {
    return this.collection.insertMany(items);
  }

  public async find(filter: Filter<T>, options?: FindOptions): Promise<FindCursor<WithId<T>>> {
    return this.collection.find(filter, options);
  }

  public async findAll(): Promise<FindCursor<WithId<T>>> {
    return this.collection.find();
  }
}
