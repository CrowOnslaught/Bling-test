import { createApi } from "unsplash-js";


const unsplashApi = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "WSzVDWwVKWGY4XZ8UU-Lb3fcyKrl8CF5psUbRHdP_-E",
  headers: { 'X-Custom-Header': 'foo' },

});


export default unsplashApi;