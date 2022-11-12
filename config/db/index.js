import { EnapsoGraphDBClient } from "@innotrade/enapso-graphdb-client";

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
  baseURL: "http://localhost:7200",
  repository: "englishApp",
  triplestore: "graphdb", // 'graphdb' or 'fuseki' or 'stardog'
  prefixes: [
    {
      prefix: "entest",
      iri: "http://ont.enapso.com/englishApp#",
    },
  ],
  transform: "toJSON",
});

export default graphDBEndpoint;
