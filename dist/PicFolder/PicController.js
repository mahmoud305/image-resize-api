"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageProccessing = exports.checkCache = exports.imageResizing = void 0;
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = require("fs");
var cache = './src/images/resized/';
var sendImage = function (res, imgName) {
    var absolutePath = path_1.default.resolve("./src/images/resized/".concat(imgName));
    res.sendFile(absolutePath);
};
function spiltResizedImgesNames(name) {
    var resizedName = name.split('.')[0];
    var imgInfo = resizedName.split('_');
    return imgInfo;
}
function getImageInfo(req) {
    // get the image Info.
    var width = +req.query.width;
    var height = +req.query.height;
    var filename = req.query.filename;
    return [filename, width, height];
}
var checkCache = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, filename, width, height, _b, imgName, imgExtension, files, i, file, _c, cachedimgName, cachedImgWidth, cachedImgHeight, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = getImageInfo(req), filename = _a[0], width = _a[1], height = _a[2];
                _b = filename.split('.'), imgName = _b[0], imgExtension = _b[1];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs_1.promises.readdir('./src/images/resized')];
            case 2:
                files = _d.sent();
                for (i = 0; i < files.length; i++) {
                    file = files[i];
                    _c = spiltResizedImgesNames(file), cachedimgName = _c[0], cachedImgWidth = _c[1], cachedImgHeight = _c[2];
                    if (cachedimgName == imgName &&
                        width == +cachedImgWidth &&
                        height == +cachedImgHeight) {
                        sendImage(res, file);
                        return [2 /*return*/]; // if image was found in cahe then return ;
                    }
                }
                next();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _d.sent();
                res.send("<h1>error in get image from cahce: ".concat(error_1, " </h1>"));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.checkCache = checkCache;
var imageProccessing = function (filename, width, height, newName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var resized, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, (0, sharp_1.default)("./src/images/full/".concat(filename))
                                    .resize({ width: width, height: height })
                                    .toFile("./src/images/resized/".concat(newName))];
                        case 1:
                            resized = _a.sent();
                            resolve(true);
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            reject(error_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.imageProccessing = imageProccessing;
function imageResizing(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, filename, width, height, nameSplited, newName, result, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('---------------------------------in processing--------------------------------');
                    _a = getImageInfo(req), filename = _a[0], width = _a[1], height = _a[2];
                    nameSplited = filename.split('.');
                    newName = nameSplited.join("_".concat(width, "_").concat(height, "."));
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, imageProccessing(filename, width, height, newName)];
                case 2:
                    result = _b.sent();
                    sendImage(res, newName);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    res.send("<h1>An error occurred during processing: ".concat(error_3, " </h1>"));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.imageResizing = imageResizing;
