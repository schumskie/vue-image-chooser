<template>
  <div :style="style" class="image-uploader">
    <label :for="name">
      <svg
        v-if="!src && !baseSrc"
        viewBox="0 0 99 80"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
        <title>icon_camera</title>
        <desc>Created with Sketch.</desc>
        <defs />
        <g
          id="tours"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="MY_TOURS-create_a_tour"
            transform="translate(-218.000000, -767.000000)"
            fill="#aaaaaa"
            fill-rule="nonzero"
          >
            <g id="Group-12" transform="translate(67.000000, 698.000000)">
              <path
                id="icon_camera"
                d="M151,93.4807644 L151,136.970832 C151,143.609002 156.390998,149 163.029168,149 L237.537591,149 C244.175761,149 249.566759,143.609002 249.566759,136.970832 L249.566759,93.4807644 C249.566759,87.1644456 244.437264,82.034951 238.120945,82.034951 L222.108876,82.034951 L221.726678,80.3653508 C220.177772,73.6668343 214.283882,69 207.404325,69 L193.142318,69 C186.282877,69 180.388987,73.6668343 178.819965,80.3653508 L178.437767,82.034951 L162.445813,82.034951 C156.129495,82.034951 151,87.1845612 151,93.4807644 Z M180.409102,86.9632889 C181.555695,86.9632889 182.541363,86.178778 182.802866,85.0523007 L183.627609,81.4717123 C184.673623,77.0261504 188.576062,73.9283379 193.142318,73.9283379 L207.404325,73.9283379 C211.970581,73.9283379 215.87302,77.0261504 216.919034,81.4717123 L217.743777,85.0523007 C218.00528,86.1586623 218.990948,86.9632889 220.137541,86.9632889 L238.10083,86.9632889 C241.701534,86.9632889 244.618305,89.8800603 244.618305,93.4807644 L244.618305,136.970832 C244.618305,140.893387 241.44003,144.071662 237.517475,144.071662 L163.029168,144.071662 C159.106613,144.071662 155.928338,140.893387 155.928338,136.970832 L155.928338,93.4807644 C155.928338,89.8800603 158.845109,86.9632889 162.445813,86.9632889 L180.409102,86.9632889 Z M167.675886,100.782751 C169.497857,100.782751 170.974855,99.3057521 170.974855,97.4837817 C170.974855,95.6618114 169.497857,94.1848127 167.675886,94.1848127 C165.853916,94.1848127 164.376917,95.6618114 164.376917,97.4837817 C164.376917,99.3057521 165.853916,100.782751 167.675886,100.782751 Z M200.283379,136.347247 C211.688962,136.347247 220.982399,127.053809 220.982399,115.648227 C220.982399,104.242645 211.688962,94.9492079 200.283379,94.9492079 C188.877797,94.9492079 179.58436,104.22253 179.58436,115.648227 C179.58436,127.073925 188.877797,136.347247 200.283379,136.347247 Z M200.283379,99.8775459 C208.973347,99.8775459 216.054061,106.95826 216.054061,115.648227 C216.054061,124.338195 208.973347,131.418909 200.283379,131.418909 C191.593412,131.418909 184.512698,124.338195 184.512698,115.648227 C184.512698,106.95826 191.593412,99.8775459 200.283379,99.8775459 Z"
              />
            </g>
          </g>
        </g>
      </svg>
      <p v-if="!src">Add Photo</p>
      <div v-if="uploading" class="progress-overlay">
        <span>{{ progress }} %</span>
      </div>
      <div v-else-if="src" class="overlay">Change Photo</div>
    </label>
    <input
      ref="inputFile"
      :id="name"
      :name="name"
      type="file"
      accept="image/*"
      style="display:none;"
      @change="displayFile"
    />
    <ul v-if="error" class="errors">
      <li v-for="err in normalizedErrors" :key="err">{{ err }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ImageChooser",
  props: {
    name: {
      required: true,
      type: String
    },
    baseSrc: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: "350px"
    },
    error: {
      default: null,
      validator: function(value) {
        return (
          value === null || Array.isArray(value) || typeof value === "string"
        );
      }
    },
    progress: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      src: null
    };
  },
  computed: {
    normalizedErrors() {
      if (typeof this.error === "string") return [this.error];
      if (this.error instanceof Array) return [...this.error];
      return [];
    },
    uploading() {
      return this.progress !== null && this.progress !== 100;
    },
    style() {
      let containerStyle = {
        height: this.height
      };
      if (this.src || this.baseSrc) {
        containerStyle.backgroundImage = `url(${this.src || this.baseSrc})`;
        containerStyle.backgroundSize = "cover";
      }
      if (this.error) {
        containerStyle.border = "1px solid red";
      }
      return containerStyle;
    }
  },
  methods: {
    displayFile(event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.src = e.target.result;
          const $event = {
            // data: e.target.result.replace(/^data:image\/[a-z]+;base64,/, ''),
            file: event.target.files[0],
            field: this.name
          };
          this.$emit("change", $event);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.image-uploader {
  cursor: pointer;
  display: flex;
  border: 1px solid #aaa;
  border-radius: 0.5rem;
  box-shadow: 0 0 5px 1px #aaa inset;
  flex-direction: column;
  justify-content: center;
  background: white;
  position: relative;
  // border: 1px solid #aaa;
  overflow: hidden;
  label {
    cursor: pointer;
    height: 100%;
    box-sizing: border-box;
    padding-top: 4rem;
    padding-bottom: 1rem;
  }
  svg,
  p {
    display: block;
    color: #aaa;
    margin: 0 auto;
  }
  svg {
    height: calc(100% - 8rem);
  }
  svg + p {
    line-height: 8rem;
    text-align: center;
  }

  .progress-overlay {
    height: 100%;
    transition: all 0.3s;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    color: #aaa;
    bottom: 0;
    text-align: center;
    position: absolute;
  }

  .overlay {
    opacity: 0;
    transition: all 0.3s;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
  }
  &:hover {
    box-shadow: 0 0 10px 1px #ccc inset;
    label {
      opacity: 0.5;
    }

    .overlay {
      opacity: 1;
    }
  }
  ul.errors {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: red;
    li {
      color: white;
    }
  }
}
</style>
