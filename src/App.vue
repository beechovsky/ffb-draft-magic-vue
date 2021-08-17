<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <section class="hero">
      <header>
        <br>
        <h1><b>FFB DraftMagic</b></h1>
        <!-- <h2>by <a href="https://github.com/beechovsky/ffb-draft-magic-vue" target="_blank">Jeff Bucklew</a></h2> -->
        <!-- TODO: include a link for a popup with instructions -->
        <br>
      </header>
    </section>
    <br>
    <upload v-if="this.showUpload === true" @load="setRows" id="uploadButton" class="visible"></upload>
    <br>
    <br>
    <div class="search">
      <div v-if="this.rankings.length > 0" class="orange">
          <label><b>Search Rankings:</b></label>
          <input type="text" v-model="search" placeholder="Player Name"/>
      </div>
    </div>
    <br>
    <div class="search results">
      <table>
        <tbody>
          <!-- eslint-disable-next-line -->
          <tr v-for="(row, index) in searchList" @click="hideRow(row, index, false)" class="clickable">
            <!-- eslint-disable-next-line -->
            <td v-for="columnData in row.split(',').splice(2, 3)">{{ columnData }}</td> <!-- name, team, pos rank -->
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container">
      <div v-if="this.rankings.length > 0" class="item rankings">
        <th>
          <tr class="orange">
            Rankings
          </tr>
        </th>
        <table class="rankingsTable">
          <thead>
            <tr>
              <!-- td instead of th for aesthetics -->
              <!-- eslint-disable-next-line -->
              <th v-for="colHeader in columnHeaders" style="background-color: #d6d6d6;">{{ colHeader }}</th>
            </tr>
          </thead>
          <tbody>
            <!-- eslint-disable-next-line -->
            <tr v-for="(row, index) in mergeSort(this.rankings).splice(1, this.rankings.length)" @click="hideRow(row, index)" class="clickable">
              <!-- eslint-disable-next-line -->
              <td v-for="columnData in row.split(',').splice(0, colCount)">{{ columnData }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="this.rankings.length > 0" class="item drafted">
        <th>
          <tr class="orange">
            Drafted
          </tr>
        </th>
        <table class="draftedTable">
        <thead>
            <tr>
              <!-- td instead of th for aesthetics -->
              <!-- eslint-disable-next-line -->
              <th v-for="draftedColHeader in draftedColHeaders" style="background-color: #d6d6d6;">{{ draftedColHeader }}</th>
            </tr>
          </thead>
          <tbody>
            <!-- eslint-disable-next-line -->
            <tr v-for="(row, index) in this.drafted" @click="putBack(row, index)" class="clickable">
              <!-- eslint-disable-next-line -->
              <td v-for="name in row.split(',').splice(2, 1)">{{ name }}</td><td v-for="pos in row.split(',').splice(4, 1)">{{ pos }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from './components/Upload'

export default {
  name: 'app',
  data: () => ({
    showUpload: true,
    rankings: [],
    drafted: [],
    columnHeaders: [],
    draftedColHeaders: [],
    colCount: 0,
    nameIndex: 0,
    search: ''
  }),
  computed: {
    searchList () {
      if (this.search.length > 3) { // hacky way of keeping results table from displaying persistently and limiting the size of the results eventually displayed
        return this.rankings.filter(player => {
          return player.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  },
  methods: {
    setRows (rows) {
      // // hide the upload button
      // this.showUpload = false

      // // populate rankings
      // for (var playerIndex in rows) {
      //   this.rankings.splice(rows.indexOf(playerIndex), 0, rows[playerIndex])
      // }

      // // NOTE: rankings is a list of strings of comma-separated values

      // let headerString = this.rankings[this.rankings.length - 1] // headers end up at the bottom...
      // this.columnHeaders = headerString.split(',')
      // this.draftedColHeaders = [this.columnHeaders[2], this.columnHeaders[4]]
      // this.colCount = this.columnHeaders.length

      // NOW GETTING PARSED JSON FORM CSV FOR US WITH TABLE LIBS
      console.log('ROWS in parent component: %o' + rows)
    },
    hideRow (row, index) {
      this.drafted.splice(0, 0, row)
      this.rankings.splice(index, 1)
      this.search = ''
    },
    putBack (row, index) {
      // tables are sorted, so no need for intelligence here
      this.rankings.splice(0, 0, row)
      this.drafted.splice(index, 1)
    },
    mergeSort (arr) {
      if (arr.length < 2) {
        return arr
      }

      let middle = parseInt(arr.length / 2)
      let left = arr.slice(0, middle)
      let right = arr.slice(middle, arr.length)

      return this.merge(this.mergeSort(left), this.mergeSort(right))
    },
    merge (left, right) {
      let result = []

      while (left.length && right.length) {
        if (parseInt(left[0].split(',')[0]) <= parseInt(right[0].split(',')[0])) {
          result.push(left.shift())
        } else {
          result.push(right.shift())
        }
      }
      while (left.length) {
        result.push(left.shift())
      }
      while (right.length) {
        result.push(right.shift())
      }
      return result
    }
  },
  components: {
    Upload
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.clickable {
  cursor: pointer;
}

/* Basic mobile styling */
@media screen and (max-width: 640px) {
  /* hide positional tables */
  .child {
    display: none;
  }
}

/* banner */
.hero {
  height: auto; /* grows according to text - won't need updating if I move the instructions*/
  background-image: url(./assets/ffb-banner.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: white; /* text color */
}
.orange {
  border: none;
  padding: 0 0 0 5px;
  color: orange;
  font-weight: bold;
}
.search {
  display: flex;
  justify-content: center;
}
.search results {
  min-height: 100px;
}
/* grid */
.container {
  display: grid;
  grid-template-columns: 50% 25%;
}

.item {
  margin: 1em;
}

.rankingsTable {
  min-width: 100%;
}

.draftedTable {
  min-width: 100%;
}

/* account for gigantic names */
.rankingsTable tbody tr td:nth-child(2) {
  min-width: 100%;
}

.draftedTable tbody tr td:first-child {
  min-width: 100%;
}

table, tr, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th {
  font-weight: normal;
}
td {
  padding: 1px 2px 1px 2px;
}
tr:hover {
  background-color: #d6d6d6;
}
</style>
