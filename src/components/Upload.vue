<template>
<div class="upload-container">
  <div class="upload-button">
    <label class='upload-label'>
      <h1>Upload Rankings</h1>
      <input ref='upload' type='file' @click='resetUpload' @change='getFile' required>
    </label>
    <div v-if="error" id="error">
      <p><span class="error">{{errorMsg}}</span></p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Upload',
  data: () => ({
    error: false,
    errorMsg: ''
  }),
  methods: {
    // in case resubmitting the same file to restart
    resetUpload () {
      this.$refs.upload.value = ''
      this.error = false
      this.errorMsg = ''
    },
    parseFile (file) {
      let rows = null

      // parse with papa
      this.$papa.parse(file, {
        header: true,
        complete: function (results) {
          rows = results.data
        }
      })

      // sets parent component's @load method params to rows
      this.$emit('load', rows)
    },
    getFile (event) {
      if (!event.target.files[0]) {
        return
      }

      let file = event.target.files[0]

      let isCsv = this.isCsvFile(file)

      // chrome on windows doesn't recognize file type ...
      if (isCsv) {
        let reader = new FileReader()

        reader.onload = e => this.parseFile(e.target.result)
        reader.readAsText(file)
      } else {
        this.error = true
        this.errorMsg = 'That ain\'t it, boss. Try a .csv file.'
      }
    },
    isCsvFile (file) {
      let isACsv = false

      if (file.type === 'text/csv') {
        isACsv = true
      }

      // deal with chrome on windows not recognizing file.type ...
      if (file.name.split('.')[1] === 'csv') {
        isACsv = true
      }

      return isACsv
    }
  }
}
</script>

<style>
.upload-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1;
}
.upload-button {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
}
.upload-label {
  position: relative;
  overflow: hidden;
  display: inline-block;
  /* original styling; still not sure I like the new button */
  /* background-color: #ffffff;
  color: orange;
  border: 2px solid black; */
  background-color: orange;
  color: white;
  border-radius: 6px;
  padding: 8px 12px 4px 12px;
  cursor: pointer;
}
.upload-label:hover {
  position: relative;
  background-color: darkorange;
}
.upload-button input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
.error {
  color: red;
  font-size: large;
}
</style>
