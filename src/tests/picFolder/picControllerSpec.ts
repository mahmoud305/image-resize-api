import { imageProccessing } from '../../PicFolder/PicController';
describe('check the processing methode ', () => {
  it('the file doesnot exist return error', () => {
    expectAsync(imageProccessing('imageNotFound.jpg', 1000, 500, 'newName.jpg'))
      .toBeRejectedWithError;
  });

  it('add the image to the cache and respone with the resized image', () => {
    expectAsync(imageProccessing('fjord.jpg', 1000, 500, 'fjord_1000_500.jpg'))
      .toBeResolved;
  });

  it('get the image from the cache and respone with the resized image', () => {
    expectAsync(imageProccessing('fjord.jpg', 1000, 500, 'fjord_1000_500.jpg'))
      .toBeResolved;
  });

  // it("resize an image with negative width returns an error",()=>{
  //     expectAsync(imageProccessing("fjord.jpg", 1000, -500, "fjord_1000_500.jpg")).toBeRejectedWithError;
  // })
});
