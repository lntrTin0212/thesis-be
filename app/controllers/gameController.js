import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import graphDBEndpoint from "../../config/db/index.js";
import env from "dotenv"; // /api/v1/Color/getAll
import TrueFalseGame from "./../models/[Game]TrueFalse.js";
import DragAndDrop from "./../models/[Game]DragAndDrop.js";
// import { getTopics } from "./topicController.js";
import request from "request";
import fetch from "node-fetch";

env.config();

export const trueFalseList = catchAsync(async (req, res, next) => {
  const topic = req.params["topicName"];
  //   const searchValue = "Animal";
  let format = [];
  const response = await fetch("http://localhost:3000/api/v1/topic/getTopics", {
    method: "GET",
  });
  const body = await response.json();
  const all = await TrueFalseGame.find();
  const addQuestion = body.allTopics.map((x, y) => {
    format.push({
      topicName: x,
      question: [],
    });
  });
  console.log(all);
  all.map((x) => {
    for (let i = 0; i < format.length; i++) {
      if (x.topicName.trim() == format[i].topicName.trim()) {
        format[i].question.push(x);
      }
    }
  });

  const final = format.filter((el) => {
    return el.topicName === topic.trim();
  });

  res.status(200).json(final);
});

export const createNewTrueFalse = catchAsync(async (req, res, next) => {
  let test;
  request(
    {
      url: "http://localhost:3000/api/v1/topic/getTopics", //on 3000 put your port no.
      method: "GET",
    },
    (error, response, body) => {
      test = JSON.parse(body);
      console.log(test.topicQuantity);
    }
  );
  const newQuestion = await TrueFalseGame.create({
    topicName: req.body.topicName,
    imagePath: req.body.imagePath,
    question: req.body.question,
    bool: req.body.bool,
  });
  res.status(200).json({
    newQuestion,
  });
});

export const dragAndDropList = catchAsync(async (req, res, next) => {
  const topic = req.params["topicName"];
  //   const searchValue = "Animal";
  let format = [];
  const response = await fetch("http://localhost:3000/api/v1/topic/getTopics", {
    method: "GET",
  });
  const body = await response.json();
  const all = await DragAndDrop.find();
  const addQuestion = body.allTopics.map((x, y) => {
    format.push({
      topicName: x,
      question: [],
    });
  });
  console.log(all);
  all.map((x) => {
    for (let i = 0; i < format.length; i++) {
      if (x.topicName.trim() == format[i].topicName.trim()) {
        format[i].question.push(x);
      }
    }
  });

  const final = format.filter((el) => {
    return el.topicName === topic.trim();
  });

  res.status(200).json(final);
});
export const createDragAndDrop = catchAsync(async (req, res, next) => {
  let test;
  request(
    {
      url: "http://localhost:3000/api/v1/topic/getTopics", //on 3000 put your port no.
      method: "GET",
    },
    (error, response, body) => {
      test = JSON.parse(body);
      console.log(test.topicQuantity);
    }
  );
  const newQuestion = await DragAndDrop.create({
    topicName: req.body.topicName,
    name: req.body.name,
    imagePath: req.body.imagePath,
    value: req.body.value,
  });
  res.status(200).json({
    newQuestion,
  });
});
