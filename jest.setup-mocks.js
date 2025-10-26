// Jest setup file for mocks
// This runs before any tests to set up mocks that must be available globally

// Mock until-async to prevent ESM issues
jest.mock('until-async', () => {
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

  return { until };
});