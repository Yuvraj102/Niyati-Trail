// const firebase = require("firebase-admin");
require("firebase/firestore");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} = require("firebase/firestore");
const firebaseApp = require("./../firebase");
const uploadFile = require("./storageManager");
const db = getFirestore();

async function addWork(work, filePath, originalFilename, mimeType) {
  try {
    // upload photo
    const newFileName = originalFilename + uuid() + `.${mimeType}`;
    const url = await uploadFile(fs.readFileSync(filePath), newFileName);

    // console.log("raw data: ", fs.readFileSync(filePath));
    const workObj = { ...work, imageDownloadURL: url, imageName: newFileName };
    console.log("downloadURL: ", url);
    const docRef = await addDoc(collection(db, "Work"), workObj);
    return docRef;
  } catch (err) {
    console.log("err uploading new doc: ", err);
    return new Error(`Err uploading work: ${err}`);
  }
}

async function fetchWork() {
  try {
    const querySnapshot = await getDocs(collection(db, "Work")); //[doc]
    const jobs = [];
    querySnapshot.forEach((doc) => {
      jobs.push(doc.data());
    });
    return jobs;
  } catch (err) {
    return new Error(`error fetching work: ${err}`);
  }
}

module.exports = { addWork, fetchWork };
