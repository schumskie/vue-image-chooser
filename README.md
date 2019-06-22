# vue-image-chooser
This is vue plugin with simple component for choosing image. It supports easy implementation for image upload to the backend.


## Installation

```sh
npm i vue-image-chooser --save
```

Registring plugin:

```js
import VueImageChooser from 'vue-image-chooser'

Vue.use(VueImageChooser)
```
This will make vue-image-chooser component globaly available. Bellow is example how to use it with axios library
```html
<div class="MyContent">
  <h1>Click on chooser to choose image</h1>
  <div style="width:400px;margin: 0 auto">
    <vue-image-chooser name="image-chooser" @change="uploadFile" :progress="progress" :error="error"/>
  </div>
</div>
```

```js

export default {
  data() {
    return {
      progress: null,
      error: null,
    }
  },
  methods: {
    uploadFile(file) {
      this.progres = 0;
      let formData = new FormData();
      formData.append('image', file);
      var config = {
        onUploadProgress: progressEvent => {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          this.progress = percentCompleted
        }
      }
      try {
        const { data } = await axios.post(
          '/api/route/to/upload/image',
          formData,
          config
        )
      } catch (e) {
        this.error = 'Error has occured'
      }
    }
  }
}
```

## Usage

The component takes four props:

- `name` (String): Required prop, must be unique (you can consider it like id)
- `progress` (Number): Number between `0-100`. If it is `null` or `100` component consider uploading process finished.
- `error` (String): Error message in case that server responded with error
- `height` (String): Default is `350px`

The component emits `change` event with single file as data, when it recieve an image, after it can be uploaded as described above)

## NOTE:
Component by default has width of 100%. Because of that it should put in holder of desired width. 
