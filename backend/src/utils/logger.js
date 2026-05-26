export const logger = {
  info(event, meta = {}) {
    console.log(JSON.stringify({ level: "info", event, ...meta, timestamp: new Date().toISOString() }));
  },
  error(event, meta = {}) {
    console.error(JSON.stringify({ level: "error", event, ...meta, timestamp: new Date().toISOString() }));
  },
};
