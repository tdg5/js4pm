import buildObserver from "./test_helpers/build_observer";

describe("Build process", function() {

  it("should be transpiled", function() {
    expect(buildObserver.isTranspiled()).toBe(true);
  });

  it("should not be minified", function() {
    expect(buildObserver.isMinified()).toBe(false);
  });

});
