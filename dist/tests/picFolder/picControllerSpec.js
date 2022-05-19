"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PicController_1 = require("../../PicFolder/PicController");
describe('check the processing methode ', function () {
    it('the file doesnot exist return error', function () {
        expectAsync((0, PicController_1.imageProccessing)('imageNotFound.jpg', 1000, 500, 'newName.jpg'))
            .toBeRejectedWithError;
    });
    it('add the image to the cache and respone with the resized image', function () {
        expectAsync((0, PicController_1.imageProccessing)('fjord.jpg', 1000, 500, 'fjord_1000_500.jpg'))
            .toBeResolved;
    });
    it('get the image from the cache and respone with the resized image', function () {
        expectAsync((0, PicController_1.imageProccessing)('fjord.jpg', 1000, 500, 'fjord_1000_500.jpg'))
            .toBeResolved;
    });
    // it("resize an image with negative width returns an error",()=>{
    //     expectAsync(imageProccessing("fjord.jpg", 1000, -500, "fjord_1000_500.jpg")).toBeRejectedWithError;
    // })
});
