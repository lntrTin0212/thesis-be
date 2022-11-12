// import { Image, loadImage } from "canvas";
// import { load, version } from "@tensorflow-models/mobilenet";

// import catchAsync from "../../utils/catchAsync.js";
// import AppError from "../../utils/appError.js";
// import { v2 } from "../../cloudinary/cloudinary.js";

// export const getMobile = catchAsync(async (req, res) => {
//   // Load the model.
//   let img =
//     "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=640:*";
//   await load().then((model) => {
//     // Classify the image.
//     model.classify(img).then((predictions) => {
//       console.log("Predictions: ");
//       console.log(predictions);
//     });
//   });

//   res.status(200).json({
//     status: "success",
//     data: {
//       // predict,
//     },
//   });
// });

// export const detectAnimal = catchAsync(async (req, res) => {
//   // Load the model.
//   console.log("begin load module");
//   const model = await load().catch((err) => console.log(err));
//   console.log("after load module");
//   // Classify the image.
//   const predictions = await model.classify(
//     "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=640:*"
//   );

//   console.log("Predictions: ");
//   console.log(predictions);
//   // model = VGG16(weights='imagenet')
//   //     response = requests.get(im)
//   //     img = Image.open(BytesIO(response.content))
//   //     img.show()
//   //     img = img.save("testing1.png")
//   //     directory = os.getcwd()
//   //     data_dir = pathlib.Path(directory)
//   //     data_dir = str(data_dir) + "\\testing1.png"
//   //     print("DIRRRRRRRRR: ", data_dir)
//   //     img = image.load_img(data_dir,color_mode='rgb', target_size=(224, 224))
//   //     # img.show()
//   //     x = image.img_to_array(img)
//   //     x.shape
//   //     x = np.expand_dims(x, axis=0)
//   //     x = preprocess_input(x)
//   //     features = model.predict(x)
//   //     p = decode_predictions(features)
//   //     return p[0]
// });

// export const get = catchAsync(async (req, res) => {
//   res.status(200).json({
//     status: "success",
//     data: {
//       name: "trong tin",
//       age: 22,
//     },
//   });
// });

// export const getImg = catchAsync(async (req, res) => {
//   v2.uploader
//     .upload(
//       "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=640:*"
//     )
//     .then((finalData) => {
//       res.status(200).json({
//         status: "OK",
//         data: {
//           finalData,
//         },
//       });
//     });
// });
