import { MongoClient, type Collection } from "mongodb";

type ClickDoc = {
  _id: string;
  count: number;
};

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

// 개발 중 HMR이나 서버리스 재사용 시 연결이 중복 생성되지 않도록 전역에 캐시
function getClient(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다.");
    }
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((error) => {
      globalForMongo._mongoClientPromise = undefined;
      throw error;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getClicksCollection(): Promise<Collection<ClickDoc>> {
  const client = await getClient();
  return client.db("linknamu").collection<ClickDoc>("clicks");
}
