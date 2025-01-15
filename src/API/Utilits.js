import axios from "axios";

// upload image and return url
export const imageUpload = async (imagedata) => {
  const formData = new FormData();
  formData.append("image", imagedata);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KET}`,
    formData
  );
  const image_url = data.data.display_url;
  return image_url;
};
