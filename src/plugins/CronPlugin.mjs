import fs from "fs";
import path from "path";
import { scheduleJob } from "node-schedule";
import { Logger } from "../core/Logger.mjs";
import { ModulePlugin } from "../core/Plugin.mjs";
import { FileUtils } from "../core/Utils.mjs";
import { createRequire } from "module";


const __dirname = FileUtils.resolvePath({ meta: import.meta, path: '.' });

export class Job {
  constructor(interval, info) {
    this.logger = Logger.get(this.constructor.name);
    this.interval = interval;
    this.info = info;
  }

  setup() {
    this.logger.info('Start scheduler');
    this.scheduler = scheduleJob(this.interval, async () => {
      this.process(this.info);
    });
  }

  process(info) {

  }

  shutdown() {
    this.logger.info('Stop scheduler');
    if (this.scheduler) {
      this.scheduler.cancel();
    }
  }
}

export const CRON_STORE = {
  file: 'file',
  mongo: 'mongo'
}

export class CronPlugin extends ModulePlugin {

  constructor({ folder, interval = 1, store = CRON_STORE.file }) {
    super();
    this.folder = folder;
    this.interval = interval; // s
    this.store = store;
    this.running = {};
  }

  async getConfigs() {
    if (this.store === CRON_STORE.file) {
      const configFile = path.join(this.folder, '../jobs.json');
      return FileUtils.readJsonFile({ filePath: configFile });
    }
  }

  async saveConfigs(configs) {
    if (this.store === CRON_STORE.file) {
      const configFile = path.join(this.folder, '../jobs.json');
      FileUtils.saveJsonFile({ filePath: configFile, data: configs });
    } 
  }

  async setup(module) {
    super.setup(module);

    scheduleJob(`*/${this.interval} * * * * *`, async () => {
      try {
        const configs = await this.getConfigs(); 
        const startTriggerKeys = [];
        const stopTriggerKeys = [];
        for (const jobConfig of configs.jobs) {
          if (jobConfig.trigger) {
            if (jobConfig.active) {
              startTriggerKeys.push(jobConfig.job);
            } else {
              stopTriggerKeys.push(jobConfig.job);
            }
            jobConfig.trigger = false;
          }
        }
        await this.saveConfigs(configs);
        const files = fs.readdirSync(this.folder);
        for (const file of files) {
          const jobExport = await import(
            path.relative(__dirname, path.join(this.folder, file))
              .replace(/\\/g, '/') + `?=${Date.now()}`
          );
          const exportKeys = Object.keys(jobExport);
  
          for (const key of exportKeys) {
            const runningJob = this.running[key];
            if (runningJob && stopTriggerKeys.includes(key)) {
              runningJob.shutdown();
            }
            if (!runningJob || startTriggerKeys.includes(key)) {
              if (runningJob) {
                runningJob.shutdown();
              }
              const jobConfig = configs.jobs.find(item => item.job === key);
              if (!jobConfig || !jobConfig.active) continue;

              const jobClass = jobExport[key];
              const job = new jobClass(jobConfig.interval, jobConfig.info);
              if (job && job instanceof Job) {
                job.setup();
              }
              this.running[key] = job;
            }
          }
        }
      } catch (e) {
        this.logger.error(e);
      }
    });
  }
} 