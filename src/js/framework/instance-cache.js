let defaultFactory = function() {};

class InstanceCache {
  constructor(config = {}) {
    this.factory = config.factory || defaultFactory;
    this.cache = {};
  }

  get(key) {
    let instance = this.cache[key];
    if(instance) { return instance; }
    instance = this.factory.apply(undefined, arguments);
    this.cache[key] = instance;
    return instance;
  }
}

export default InstanceCache;
