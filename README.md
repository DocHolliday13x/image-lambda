# LAB - Class 17

## Project: image-lambda

### Author: Ryan Eastman

### Problem Domain

AWS Lambda allows writing code that is triggered in the cloud, without thinking about maintaining servers. We’ll use it today to automatically run some processing on image files after they’re uploaded to an S3 Bucket.

### Links and Resources

- [GitHub Actions ci/cd](https://github.com/DocHolliday13x/image-lambda/actions)
<!-- - [back-end server url](http://xyz.com) (when applicable)
- [front-end application](http://xyz.com) (when applicable) -->

### Collaborators

- Ryan Gallaway
- Reece Renninger
- Ike Steoger
- Kaeden O'Meara

### Setup

#### `.env` requirements (where applicable)

for now I have none and do not require one

#### How to initialize/run your application (where applicable)

- e.g. `npm start`

#### How to use your library (where applicable)

#### Features / Routes

- Create an S3 Bucket with “open” read permissions, so that anyone can see the images/files in their browser.

- A user should be able to upload an image at any size, and update a dictionary of all images that have been uploaded so far.

- When an image is uploaded to your S3 bucket, it should trigger a Lambda function which must:
  - Download a file called “images.json” from the S3 Bucket if it exists.
  - The images.json should be an array of objects, each representing an image. Create an empty array if this file is not present.
  - Create a metadata object describing the image.
    - Name, Size, Type, etc.
  - Append the data for this image to the array.
    - Note: If the image is a duplicate name, update the object in the array, don’t just add it.
  - Upload the images.json file back to the S3 bucket.

#### How to use your lambda

- Upload an image to the S3 bucket
- Check the images.json file in the S3 bucket to see if the image was added

#### Tests

- How do you run tests?
- Any tests of note?
- Describe any tests that you did not complete, skipped, etc

#### UML

Link to an image of the UML for your application and response to events
