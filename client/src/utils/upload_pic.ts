import axios from 'axios';
import compressImage from './compress_image';

const uploadPic = async (pic: File) => {
  try {
    const compressedPic: any = await compressImage(pic);

    const data = new FormData();
    data.append('upload_preset', process.env.REACT_APP_UploadPreset!);
    data.append('cloud_name', process.env.REACT_APP_CloudName!);
    data.append('file', compressedPic);

    const res = await axios.post(process.env.REACT_APP_ImageDatabaseUrl!, data);
    return res.data.url;
  } catch (error) {
    console.log(error.message);
  }
};

export default uploadPic;
