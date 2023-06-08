`use strict`;

// Import the AWS SDK
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
// Import the Response object to send back to the browser
import { Response } from 'node-fetch';

// Export the handler function
export const handler = async (event) => {
  // Basic proof of life
  console.log('The event:', event);
  // Create an S3 client connection
  const s3Client = new S3Client({ region: 'us-west-1' });
  // Params to use the 'get' command
  const params = {
    Key: 'images.json',
    Bucket: 'estorm-lab-17',
  };
  console.log('New event info: ', params);

  let data;
  // Convert Size to mb
  let imageData = {
    name: event.Records[0].s3.object.key,
    size: `${event.Records[0].s3.object.size / 1048576}mb`,
    type: 'jpeg',
  };
  console.log('\n\n IMAGE DATA: ', imageData);

  try {
    let results = await s3Client.send(new GetObjectCommand(params));
    let response = new Response(results.Body);
    console.log('\n\nRESULTS:', results.Body, '\n\nRESPONSE:', response.Body);
    data = await response.json();
    console.log('\n\nDATA', data);
    // Verify that there is no matching data existing
  } catch (err) {
    console.log('\n\nGET DATA Event', JSON.stringify(event, undefined, '  '));
    console.log(err);
  }

  try {
    // Find image by name
    let foundImage = data.objects.find(
      (image) => image.name === imageData.name,
    );
    console.log('\n\nFOUND IMAGE: ', foundImage);
    if (foundImage) {
      data.objects[foundImage] = imageData;
    } else {
      data.objects.push(imageData);
    }

    const newParams = {
      ...params,
      Body: JSON.stringify(data),
      ContentType: 'application/json',
    };
    console.log('NEW PARAMS\n\n', newParams);
    // Results + Response for putting new data in
    let results = await s3Client.send(new PutObjectCommand(newParams));
    const response = new Response(results.Body);
    console.log('\n\nRESULTS:', results.Body, '\n\nRESPONSE:', response.Body);

    // Convert to JSON
  } catch (err) {
    console.log(
      '\n\nSEND NEW DATA EVENT',
      JSON.stringify(event, undefined, '  '),
    );
    console.log(err);
  }
  console.log('this is my json', data);

  const response = {
    statusCode: 200,
    body: data,
  };
  return response;
};

// Demo Code
// import {
//   S3Client,
//   GetObjectCommand,
//   PutObjectCommand,
// } from '@aws-sdk/client-s3';
// import { Response } from 'node-fetch';

// export const handler = async (event) => {
//   // basic proof of life
//   // console.log('this is our event', event);

//   // create a s3Client connection
//   const s3Client = new S3Client({ region: `us-west-2` });
//   // const Bucket = 'rkgallaway-numbers';
//   // need some parameters to use the `get` command
//   const params = {
//     Key: event.Records[0].s3.object.key,
//     // Key: 'numbers.json',
//     Bucket: `rkgallaway-numbers`,
//   };

//   console.log(`new event info`, params);

//   let data;
//   // lab-17:
//   // let summary
//   try {
//     // https://stackoverflow.com/questions/36942442/how-to-get-response-from-s3-getobject-in-node-js
//     let s3Results = await s3Client.send(new GetObjectCommand(params));
//     const response = new Response(s3Results.Body);
//     data = await response.json();

//     // for lab-17
//     // summary = await response.json();

//     // in lab, you'll try to get your images.json file.  if summary does not exist, you'll throw an error because it could not get the thing, create an empty summary array in catch
//   } catch (e) {
//     console.log(`Handler Event`, JSON.stringify(event, undefined, `  `));
//     // summary = []
//   }

//   console.log(`this is my data`, data);

//   // in demo I do calculations here, in lab, you'll assemble your params object AND use the PutObjectCommand

//   // new params for putOBjectCommand
//   // POSSIBLY what you need for lab-17
//   // let newParams = {
//   //     ...params,
//   //     Key: 'images.json',
//   //     Body: '<updatedSummaryJson>',
//   //     ContentType: `application/json` // For JSON, it's always this
//   // }
//   const { numberOne, numberTwo } = data.numbers;
//   const result = numberOne + numberTwo;
//   console.log(`my result`, result);
//   // TODO implement
//   const response = {
//     statusCode: 200,
//     // send valid json (a number is valid json)
//     body: result,
//   };
//   return response;
// };
