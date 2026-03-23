import swaggerJsDoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
  openapi: "3.0.0",
  info: {
    title: "CRM API",
    version: "1.0.0"
  },
  servers: [
    { url: "http://localhost:5000" }
  ],
  components: {
    schemas: {
      Component: {
        type: "object",
        properties: {
          name: { type: "string" },
          length: { type: "number" },
          breadth: { type: "number" },
          thickness: { type: "number" }
        }
      },

      Product: {
        type: "object",
        properties: {
          productName: { type: "string" },
          quantity: { type: "number" },
          length: { type: "number" },
          breadth: { type: "number" },
          thickness: { type: "number" },
          laborCharge: { type: "number" },
          polishingCharge: { type: "number" },
          components: {
            type: "array",
            items: { $ref: "#/components/schemas/Component" }
          }
        }
      },

      Estimation: {
        type: "object",
        properties: {
          project: { type: "string" },
          description: { type: "string" },
          status: {
            type: "string",
            enum: ["Draft", "Pending", "Approved", "Rejected"]
          },
          products: {
            type: "array",
            items: { $ref: "#/components/schemas/Product" }
          },
          transportCharge: { type: "number" },
          discount: { type: "number" },
          tax: { type: "number" },
          totalAmount: { type: "number" },
          additionalNotes: { type: "string" },
          attachments: {
            type: "array",
            items: { type: "string" }
          }
        }
      }
    }
  }
},
  apis: ["./src/routes/*.ts"] // scans route files for documentation
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
