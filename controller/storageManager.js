const firebaseApp = require("./../firebase");
const {
  getStorage,
  uploadBytes,
  ref,
  getDownloadURL,
} = require("firebase/storage");

const storage = getStorage(firebaseApp, "gs://kadam-for-stree.appspot.com");

// returns downloadUrl
async function uploadFile(file, newFileName) {
  const storageRef = ref(storage, newFileName);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    // GETTING THE DOWNLOAD URL
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (err) {
    console.log("err in image uploading: ", err);

    return new Error(`Error uploading img: ${err}`);
  }
}

module.exports = uploadFile;

// WORKING RULES
// rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write;
//     }
//   }
// }
