<template>
  <div>
    <label class='upload-button'>
      <h1>Upload Rankings CSV</h1>
      <input ref='upload' type='file' @click='resetUpload' @change='getFile'>
    </label>
    <div v-if="error" id="error">
      <p><span class="error">{{errorMsg}}</span></p>
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
      // let errors = null
      // let meta = null

      // parse with papa
      this.$papa.parse(file, {
        header: true,
        complete: function (results) {
          rows = results.data
          // errors = results.errors
          // meta = results.meta
          // console.log('ROWS: %o', rows)
          // console.log('ERRORS: %o', errors)
          // console.log('META: %o', meta)
        }
      })

      // should slo send errors and meta
      // sets parent component's @load method params to rows
      this.$emit('load', rows)
    },
    getFile (event) {
      if (!event.target.files[0]) {
        return
      }

      let file = event.target.files[0]
      console.log('FILE: %o', file)

      if (file.type === 'text/csv') {
        let reader = new FileReader()

        reader.onload = e => this.parseFile(e.target.result)
        reader.readAsText(file)
      } else {
        this.error = true
        this.errorMsg = 'That ain\'t it, boss. Try a .csv file.'
      }
    }
  }
}
</script>

<style>
.upload-button {
  position: relative;
  overflow: hidden;
  display: inline-block;
  background-color: #ffffff;
  color: orange;
  border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.upload-button:hover {
  background-color: #d6d6d6;
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
  border: 1px solid red;
  border-radius: 2px;
  background-color: pink;
  padding: .2em .3em .2em;
  font-size: large;
}
</style>
