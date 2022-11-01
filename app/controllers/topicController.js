import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import graphDBEndpoint from "../../config/db/index.js";
import env from "dotenv"; // /api/v1/Color/getAll
env.config();

// localhost:3000/api/v1/topic/getAll

export const getAllTopic = catchAsync(async (req, res, next) => {
  const allTopics = [];
  let finalResult = [];
  await graphDBEndpoint
    .query(
      `
        PREFIX : <${process.env.PREFIX}>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <${process.env.RDF}>
        PREFIX rdfs: <${process.env.RDFS}>
        select ?subject ?predicate ?object FROM <http://www.ontotext.com/explicit> where { 
            ?subject rdfs:subClassOf :Vocabulary
        }
    `
    )
    .then((data) => {
      data.records.map((x, y) => {
        allTopics.push(x.subject.substr(process.env.PREFIX.length));
      });
    });

  allTopics.map(async (x, y) => {
    await graphDBEndpoint
      .query(
        `
                  PREFIX : <${process.env.PREFIX}>
                  PREFIX owl: <http://www.w3.org/2002/07/owl#>
                  PREFIX rdf: <${process.env.RDF}>
                  PREFIX rdfs: <${process.env.RDFS}>
                  select ?subject ?predicate ?object where { 
                    ?subject rdf:type :${x}
                  }
            `
      )
      .then((data) => {
        finalResult.push({
          topicName: x,
          vocabName: data.records.length,
        });
      });
  });

  res.status(200).json({
    finalResult,
  });
});

const topic = async (topicName) => {
  return await graphDBEndpoint.query(
    `
    PREFIX : <${process.env.PREFIX}>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <${process.env.RDF}>
    SELECT ?subject where { 
      ?subject rdf:type :${topicName}
    }
    `
  );
};

// localhost:3000/api/v1/topic/getTopicList/:name
export const getTopicList = catchAsync(async (req, res, next) => {
  const topicName = req.params["name"];
  const queryResult = [];
  const finalResult = [];
  await topic(topicName).then((data) => {
    data.records.map((x, y) => {
      queryResult.push(x.subject.substr(process.env.PREFIX.length));
    });
  });

  for (let i = 0; i < queryResult.length; i++) {
    await graphDBEndpoint
      .query(
        `
        PREFIX : <${process.env.PREFIX}>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <${process.env.RDF}>
        select ?predicate ?value where { 
        :${queryResult[i]} ?predicate ?value .
        MINUS{ ?y rdf:type ?value }
        }
      `
      )
      .then((data) => {
        let filterData = [];
        data.records.map((x, y) => {
          filterData.push({
            predicate: x.predicate.substr(process.env.PREFIX.length),
            value: x.value,
          });
        });

        finalResult.push({
          word: queryResult[i],
          properties: filterData,
        });
      });
  }

  res.status(200).json({
    data: finalResult,
  });
});

// localhost:3000/api/v1/topic/getTopicDetail/:vocab
export const getTopicDetail = catchAsync(async (req, res, next) => {
  const finalResult = [];
  const suggestArr = [];

  const vocab = req.params["vocab"];
  const name = req.params["name"];
  await graphDBEndpoint
    .query(
      `
        PREFIX : <${process.env.PREFIX}>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <${process.env.RDF}>
        select ?predicate ?value where { 
            :${vocab} ?predicate ?value .
              MINUS{ ?y rdf:type ?value }
              
          }
        `
    )
    .then((data) => {
      let filterData = [];
      data.records.map((x, y) => {
        filterData.push({
          predicate: x.predicate.substr(process.env.PREFIX.length),
          value: x.value,
        });
      });

      finalResult.push({
        Properties: filterData,
      });
    });
  await graphDBEndpoint
    .query(
      `
        PREFIX : <${process.env.PREFIX}>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <${process.env.RDF}>
        SELECT ?subject where { 
            ?subject rdf:type :${name}
        }
        `
    )
    .then((data) => {
      data.records.map((x, y) => {
        if (x.subject.substr(process.env.PREFIX.length) === vocab.trim()) {
        } else {
          suggestArr.push(x.subject.substr(process.env.PREFIX.length));
        }
      });
    });
  res.status(200).json({
    data: finalResult,
    suggestWord: suggestArr,
  });
});
