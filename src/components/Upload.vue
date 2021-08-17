<template>
  <label class='upload-button'>
    <h1>Upload Rankings CSV</h1>
    <input type='file' @change='getFile'>
  </label>
</template>

<script>
export default {
  name: 'Upload',
  methods: {
    parseFile (file) {
      // // clean things up a bit
      // let noQuotes = file.replace(/"/g, '')
      // // for blank, toublesome columns
      // let noBlankCols = noQuotes.replace(/,,/g, ',')
      // let parsedRankings = noBlankCols.split(/,[\r\n]/)

      let rows = null
      // rows = parsedRankings[0].split(/\r\n/)

      // parse with papa
      this.$papa.parse(file, {
        header: true,
        complete: function (results) {
          rows = results.data
          // let errors = results.errors
          // let meta = results.meta
          console.log('ROWS: %o', rows)
          // console.log('ERRORS: %o', errors)
          // console.log('META: %o', meta)
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

      // unsure this stuff is necessary with papa
      let reader = new FileReader()

      reader.onload = e => this.parseFile(e.target.result)
      reader.readAsText(file)
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
</style>
