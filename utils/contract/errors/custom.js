"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromCode = exports.NoNftLeftError = exports.InitializeError = void 0;
class InitializeError extends Error {
  constructor(logs) {
    super("6000: Failed to initialize contract.");
    this.logs = logs;
    this.code = 6000;
    this.name = "InitializeError";
    this.msg = "Failed to initialize contract.";
  }
}
exports.InitializeError = InitializeError;
InitializeError.code = 6000;
class NoNftLeftError extends Error {
  constructor(logs) {
    super("6001: There is not NFTs left to withdraw sol");
    this.logs = logs;
    this.code = 6001;
    this.name = "NoNftLeftError";
    this.msg = "There is not NFTs left to withdraw sol";
  }
}
exports.NoNftLeftError = NoNftLeftError;
NoNftLeftError.code = 6001;
function fromCode(code, logs) {
  switch (code) {
    case 6000:
      return new InitializeError(logs);
    case 6001:
      return new NoNftLeftError(logs);
  }
  return null;
}
exports.fromCode = fromCode;
//# sourceMappingURL=custom.js.map
