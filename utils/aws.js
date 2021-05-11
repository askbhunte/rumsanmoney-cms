const aws = require('aws-sdk');
const config = require('config');
const slugify = require('slugify');
// Configure client for use with Spaces
const endpoint = new aws.Endpoint(config.get('services.aws.endpoint'));
const s3 = new aws.S3({
  endpoint,
  accessKeyId: config.get('services.aws.key'),
  secretAccessKey: config.get('services.aws.secret'),
});

class AWS {
  constructor() {}

  // Create a new Space
  createBucket(bucket) {
    const params = {
      Bucket: bucket,
    };
    return s3.createBucket(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else data;
    });
  }

  // List all Spaces in the region
  listBuckets() {
    return new Promise((resolve) => {
      s3.listBuckets({}, (err, data) => {
        const buckets = [];
        if (err) console.log(err, err.stack);
        else {
          data.Buckets.forEach((space) => {
            buckets.push(space.Name);
          });
          resolve(buckets);
        }
      });
    });
  }

  // Add a file to a Space
  sendFiletoAws(payload) {
    const folderName = config.get('services.aws.folder');
    payload.originalname = slugify(payload.originalname, {
      remove: /[*+~()'"#!:@]/g,
      replacement: '-',
      lower: true,
    });
    payload.originalname = payload.originalname.replace(/_/g, '-');
    const params = {
      Body: payload.buffer,
      Bucket: config.get('services.aws.bucket'),
      Key: `${folderName}/${Date.now()}-${payload.originalname}`,
    };
    const fileData = {
      Bucket: config.get('services.aws.bucket'),
      name: payload.originalname,
      group: folderName,
      Key: `${folderName}/${Date.now()}-${payload.originalname}`,
    };
    try {
      return new Promise((resolve, reject) => {
        s3
          .putObject(params)
          .on('build', (request) => {
            request.httpRequest.headers.Host = endpoint;
            request.httpRequest.headers['Content-Length'] = payload.size;
            request.httpRequest.headers['Content-Type'] = payload.mimetype;
            request.httpRequest.headers['x-amz-acl'] = 'public-read';
          })
          .send((err, data) => {
            if (err) reject(err);
            resolve({ data, fileData });
          });
      });
    } catch (e) {
      console.log(e);
    }
  }

  deleteFileFromAWS(key, bucketName) {
    // Sample Key: "test.jpg"
    const params = { Bucket: bucketName, Key: key };
    s3.deleteObject(params, (err, data) => {
      if (!err) {
        console.log(data);
      } else {
        console.log(err);
      }
    });
  }

  async listAllFilesOfBucketsFromAWS(bucketName, folderName) {
    const params = {
      Bucket: bucketName,
      Prefix: folderName,
    };
    const files = [];
    return new Promise((resolve) => {
      s3.listObjectsV2(params, (err, data) => {
        if (!err) {
          const sortedContent = data.Contents.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));
          sortedContent.map((obj) => {
            files.push(obj.Key);
          });
          resolve(files);
        } else {
          console.log('err', err);
        }
      });
    });
  }
}

module.exports = new AWS();
