import path from "path";
import fs from "fs";
import { HttpServerPlugin } from "../../core/Plugin.mjs";
import { FileUtils } from "../../core/Utils.mjs";

export class ControllerFolderPlugin extends HttpServerPlugin {
  constructor({ baseUrl = '', folder = '', controllers = [], preRequests = [], postRequests = [] }) {
    super();
    this.baseUrl = baseUrl;
    this.folder = folder;
    this.controllers = controllers;
    this.preRequests = preRequests;
    this.postRequests = postRequests;
  }

  async setup(httpServer) {
    super.setup(httpServer);
    if (this.folder) {
      let controllerRelative = path.relative(FileUtils.dirname(import.meta.url), this.folder);
      const files = fs.readdirSync(this.folder);
      let controllers = [];
      for (const file of files) {
        let fileRelatvie = path.join(controllerRelative, file);
        fileRelatvie = fileRelatvie.replace(/\\/g, '/');
        const controllerClass = await import(fileRelatvie);
        controllers.push(controllerClass.default);
      }
       httpServer.addControllers({ controllers, baseUrl: this.baseUrl, preRequests: this.preRequests, postRequests: this.postRequests });
    } 

    if (this.controllers) {
      httpServer.addControllers({ controllers: this.controllers, baseUrl: this.baseUrl, preRequests: this.preRequests, postRequests: this.postRequests }); 
    }
  }
}