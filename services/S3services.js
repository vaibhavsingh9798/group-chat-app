const AWS = require('aws-sdk')
const uploadTos3 = async(fileData,fName) =>{
  
 // 1) Configure AWS SDK with my IAM credentials
  AWS.config.update({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_SECRET_KEY,
});

    // 2) Create an instance of the S3 service
    const s3 = new AWS.S3();

    // 3) Set your bucket name and file information
      const bucketName = process.env.BUCKET_NAME;
       const fileName =  fName;
      const fileContent = fileData;

      // 4) Set the parameters for S3 upload
   const params = {
     Bucket: bucketName,
     Key: fileName,
      Body: fileContent,
      ACL: 'public-read',
    };
      
      // 5) Upload the file to S3
      try{
let data = await s3.upload(params).promise() // aws sdk not support properly async await so these resion we can use promise()
    let url = data.Location
    return url;
}catch(err){
  return '';
}
   }
   module.exports = {uploadTos3}