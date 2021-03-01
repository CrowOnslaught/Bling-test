# bling-test

## Project setup
```
npm install
```

### Compiling
```
npm run serve
```

## Resume

- Web application using `unsplash` API, done in around 12h including the backend node.js app.
- The app is totally responsive to differents resolutions and even with mobile devices.

### HomeComponent

- A hero image. Load a random image everytime you enter this window.

### GalleryComponent

- It loads the 20 newest photos from the `unsplash` API. You can also swipe page to the next 20 images, and so on.
- You can also search for a keyword in the images, then it loads the images recibed by the api with that word.
- You can click an image to load the ImageDetailComponent.

### RandomGalleryComponent

- It loads 20 random images from the `unsplash` API. Yoy can also reload the images by pressing the `Randomize` button.
- You can click an image to load the ImageDetailComponent.


### ImageDetailComponent

- Child of GalleryComponent & RandomGalleryComponent.
- It contacts with the Backend to send images in emails.
- You need to enter a valid mail in the input to be able to send it.
