export class MongoModel {
  constructor(collection) {
    this.collection = collection;
  }
  
  async findOne(...args) {
    return this.collection.findOne(...args);
  } 

  async create(...args) {
    return this.collection.create(...args);
  }

  async find(...args) {
    return this.collection.find(...args);
  } 
  
  async update(...args) {
    return this.collection.update(...args);
  } 

  async updateOne(...args) {
    return this.collection.updateOne(...args);
  } 

  async updateMany(...args) {
    return this.collection.updateMany(...args);
  } 

  async deleteOne(...args) {
    return this.collection.deleteOne(...args);
  } 

  async deleteMany(...args) {
    return this.collection.deleteMany(...args);
  } 
}
