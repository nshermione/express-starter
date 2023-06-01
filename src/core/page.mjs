import { Controller } from "./Controller.mjs";

export class Page extends Controller {
   constructor(config) {
    super();
    this.meta = config;
    this.style = config.style;
    this.template = config.template;
   }
}