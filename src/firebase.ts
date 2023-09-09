import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/* Your Config */
const firebaseConfig = {
    apiKey: "AIzaSyByNIPLGZbrqcrMnxJsekqoGexGmhkR4ns",
    authDomain: "md4learn-462b6.firebaseapp.com",
    projectId: "md4learn-462b6",
    storageBucket: "md4learn-462b6.appspot.com",
    messagingSenderId: "435482009303",
    appId: "1:435482009303:web:a88e33762244e011c8da92",
    measurementId: "G-2JKW8FQ3W7"
};
/* End Config */

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


export async function uploadFileToStorage(file: any, folderName: any, bufferData: any) {
    // nếu file là null thì không làm gì hết
    if (!file) {
        return false
    }

    let fileRef;
    let metadata;
    if (!bufferData) {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + file.name);
    } else {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + (file as any).filename);
        metadata = {
            contentType: (file as any).mimetype,
        };
    }
    let url;
    if (bufferData) {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, bufferData, metadata).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    } else {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, file).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    }


    return url
}
