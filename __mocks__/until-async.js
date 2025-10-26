// Mock implementation of until-async for Jest
function until(predicate, options = {}) {
  const { timeout = 5000, interval = 100 } = options;

  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    function check() {
      try {
        if (predicate()) {
          resolve();
        } else if (Date.now() - startTime >= timeout) {
          reject(new Error('Timeout exceeded'));
        } else {
          setTimeout(check, interval);
        }
      } catch (error) {
        reject(error);
      }
    }

    check();
  });
}

// Support both CommonJS and ESM imports
module.exports = { until };
module.exports.until = until;
module.exports.default = { until };