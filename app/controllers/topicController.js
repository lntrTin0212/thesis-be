import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import graphDBEndpoint from "../../config/db/index.js";
import env from "dotenv"; // /api/v1/Color/getAll
env.config();

// localhost:3000/api/v1/topic/getTopics
export const getTopics = catchAsync(async (req, res, next) => {
  // let finalResult = [];
  const allTopics = [];
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
  // console.log(allTopics)
  res.status(200).json({
    allTopics,
    topicQuantity: allTopics.length,
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

// const topicList = (topicName) => {

// }

// localhost:3000/api/v1/topic/getTopicList/:topic
export const getTopicList = catchAsync(async (req, res, next) => {
  const topicName = req.params["topic"];
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
        let filterData = {};
        data.records.map((x, y) => {
          filterData = {
            ...filterData,
            [x.predicate.substr(process.env.PREFIX.length)]: x.value,
          };
        });
        let word = queryResult[i];
        finalResult.push({
          word,
          ...filterData,
        });
      });
  }

  res.status(200).json(finalResult);
});

// localhost:3000/api/v1/topic/getTopicDetail/:name/:vocab
export const getTopicDetail = catchAsync(async (req, res, next) => {
  let finalResult = [];
  const suggestArr = [];
  let filterData = {};

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
      data.records.map((x, y) => {
        filterData = {
          ...filterData,
          [x.predicate.substr(process.env.PREFIX.length)]: x.value,
        };
      });
      finalResult = filterData;
      finalResult = {
        ...finalResult,
        vocab,
      };
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
        if (y > 2) {
          return;
        }
        if (x.subject.substr(process.env.PREFIX.length) === vocab.trim()) {
        } else {
          suggestArr.push(x.subject.substr(process.env.PREFIX.length));
        }
      });
    });
  finalResult = {
    ...finalResult,
    suggestArr,
  };
  // finalResult.push()
  res.status(200).json(finalResult);
});

// localhost:3000/api/v1/topic/getSubClass/:topic
export const getSubClass = catchAsync(async (req, res, next) => {
  const topicName = req.params["topic"];
  let subclassList = [];
  let vocabsOfSubClass = [];
  let nonSubclass = [];
  await graphDBEndpoint
    .query(
      `
        PREFIX : <${process.env.PREFIX}>
        PREFIX rdf: <${process.env.RDF}>
        PREFIX rdfs: <${process.env.RDFS}>
        select ?subClass  where { 
          ?subClass rdfs:subClassOf :${topicName}
        }
        `
    )
    .then(async (data) => {
      if (data.total === 0) {
        await topic(topicName).then((data) => {
          data.records.map((x, y) => {
            nonSubclass.push(x.subject.substr(process.env.PREFIX.length));
          });
        });
        return res.status(200).json({
          subClassOf: topicName,
          data: nonSubclass,
        });
      }
      data.records.map((x, y) => {
        subclassList.push({
          subClassName: x.subClass.substr(process.env.PREFIX.length),
        });
      });
    });
  for (let i = 0; i < subclassList.length; i++) {
    await graphDBEndpoint
      .query(
        `
            PREFIX : <${process.env.PREFIX}>
            PREFIX rdf: <${process.env.RDF}>
            PREFIX rdfs: <${process.env.RDFS}>
            select ?subject ?predicate ?object  where { 
              ?subject rdf:type :${subclassList[i].subClassName} .
            }
          `
      )
      .then((x) => {
        x.records.map((data) => {
          vocabsOfSubClass.push(data.subject.substr(process.env.PREFIX.length));
        });
        subclassList[i] = {
          ...subclassList[i],
          vocabs: vocabsOfSubClass,
        };
        vocabsOfSubClass = [];
      });
  }

  res.status(200).json({
    subClassOf: topicName,
    data: subclassList,
  });
});

// topicName:color
//
export const createNew = catchAsync(async (req, res, next) => {
  console.log(req.body);
  await graphDBEndpoint.query(
    `
        PREFIX : <${process.env.PREFIX}>
        PREFIX BEaudio: <${process.env.BE_AUDIO}>
        PREFIX AEaudio: <${process.env.BE_AUDIO}>
        PREFIX BEpronun: <${process.env.BE_PRONUM}>
        PREFIX AEpronun: <${process.env.AE_PRONUM}> 
        PREFIX meaning: <${process.env.MEANING}>
        PREFIX image: <${process.env.IMG}>
        PREFIX rdf: <${process.env.RDF}>
        PREFIX topicName: <http://www.semanticweb.org/khmquan/ontologies/2022/10/EnglishApp#>
        PREFIX vocabulary: <http://www.semanticweb.org/khmquan/ontologies/2022/10/EnglishApp#Vocabulary>
        
        INSERT DATA {
            :Gold AEaudio: 'https://dictionary.cambridge.org/vi/media/english/us_pron/g/gol/gold_/gold.mp3' .
            :Gold BEaudio: 'https://dictionary.cambridge.org/vi/media/english/uk_pron/u/ukg/ukgod/ukwgodpa017.mp3' .
            :Gold BEpronun: '/ɡəʊld/' .
            :Gold AEpronun: '/ɡoʊld/' .
            :Gold meaning: 'màu gold' .
            :Gold image: 'https://htmlcolorcodes.com/assets/images/colors/gold-color-solid-background-1920x1080.png' .
            :Gold rdf:type topicName:Color .
            :Gold rdf:type vocabulary: .
            :Gold rdf:type 'http://www.w3.org/2002/07/owl#NamedIndividual'
        }
          `
  );
  res.status(200).json({
    data: req.body,
  });
});

export const getVocabsAndMeaning = catchAsync(async (req, res, next) => {
  let finalResult = [];
  let totalWord;
  await graphDBEndpoint
    .query(
      `
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX : <http://www.semanticweb.org/khmquan/ontologies/2022/10/EnglishApp#>
      PREFIX meaning: <http://www.semanticweb.org/khmquan/ontologies/2022/10/EnglishApp#hasMeaning>
      SELECT ?subject ?meaning where { 
          ?subject meaning: ?meaning
    }
    `
    )
    .then((data) => {
      totalWord = data.total;
      data.records.map((x) => {
        finalResult.push({
          word: x.subject.substr(process.env.PREFIX.length),
          meaning: x.meaning,
        });
      });
    });
  finalResult.push({
    total: totalWord,
  });
  res.status(200).json(finalResult);
});
