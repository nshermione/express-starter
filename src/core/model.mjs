export class MongoModel {
  constructor(model) {
    this.model = model;
  }
  
  async findOne(...args) {
    return this.model.findOne(...args);
  } 

  async find(...args) {
    return this.model.findOne(...args);
  } 
  
  async update(...args) {
    return this.model.findOne(...args);
  } 

  async updateOne(...args) {
    return this.model.findOne(...args);
  } 
  async updateMany(...args) {
    return this.model.updateMany(...args);
  } 
}
