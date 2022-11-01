// import catchAsync from "../../utils/catchAsync.js";
// import AppError from "../../utils/appError.js";
// import graphDBEndpoint from "../../config/db/index.js";
// import env from "dotenv"; // /api/v1/Color/getAll
// env.config();
// export const getAllColors = catchAsync(async (req, res, next) => {
//   const queryResult = [];
//   const finalResult = [];
//   const result = await graphDBEndpoint.query(
//     `
//     PREFIX : <${process.env.PREFIX}>
//     PREFIX owl: <http://www.w3.org/2002/07/owl#>
//     PREFIX rdf: <${process.env.RDF}>
//     SELECT ?subject where {
//       ?subject rdf:type :Color
//     }
// `
//   );

//   result.records.map((x, y) => {
//     queryResult.push(x.subject.substr(process.env.PREFIX.length));
//   });

//   for (let i = 0; i < queryResult.length; i++) {
//     await graphDBEndpoint
//       .query(
//         `
//         PREFIX : <${process.env.PREFIX}>
//         PREFIX owl: <http://www.w3.org/2002/07/owl#>
//         PREFIX rdf: <${process.env.RDF}>
//         select ?predicate ?value where {
//         :${queryResult[i]} ?predicate ?value .
//         MINUS{ ?y rdf:type ?value }
//         }
//       `
//       )
//       .then((data) => {
//         let filterData = [];
//         data.records.map((x, y) => {
//           filterData.push({
//             predicate: x.predicate.substr(process.env.PREFIX.length),
//             value: x.value,
//           });
//         });

//         finalResult.push({
//           Color: queryResult[i],
//           Properties: filterData,
//         });
//       });
//   }
//   res.status(200).json({
//     finalResult,
//   });
// });
