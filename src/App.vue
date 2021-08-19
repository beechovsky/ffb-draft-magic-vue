<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <section class="hero">
      <header>
        <br>
        <h1><b>FFB Draft Magic</b></h1>
        <!-- <p><i>by <a href="https://github.com/beechovsky/ffb-draft-magic-vue" target="_blank">Jeff Bucklew</a></i></p> -->
        <!-- TODO: include a link for a popup with instructions -->
        <br>
      </header>
    </section>
    <br>
    <upload v-if="this.showUpload === true" @load="setRows" id="uploadButton" class="visible"></upload>
    <br>
    <br>
    <!--
    <div class="search">
      <div v-if="this.rankings.length > 0" class="orange">
          <label><b>Search Rankings:</b></label>
          <input type="text" v-model="search" placeholder="Player Name"/>
      </div>
    </div>
    <br>
    -->
    <!--
    <div class="search results">
      <table>
        <tbody> -->
          <!-- eslint-disable-next-line -->
          <!-- <tr v-for="(row, index) in searchList" @click="hideRow(row, index, false)" class="clickable">-->
            <!-- eslint-disable-next-line -->
            <!-- <td v-for="columnData in row.split(',').splice(2, 3)">{{ columnData }}</td>
          </tr>
        </tbody>
      </table>
    </div> -->

    <div class="container">
      <div v-if="this.rankings.length > 0" class="item">
        <th>
          <tr class="orange">
            Rankings
          </tr>
        </th>
        <div>
          <b-table id="rankingsTable" @row-clicked="removeFromRankings" :items="this.rankings"></b-table>
        </div>
      </div>
      <div v-if="this.rankings.length > 0" class="item">
        <th>
          <tr class="orange">
            Drafted
          </tr>
        </th>
        <div>
          <b-table id="draftedTable" @row-clicked="removeFromRankings" :items="this.drafted"></b-table>
        </div>
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
    rankingsTableReady: true, // 'lock' table to avoid b-table's dumb double event submit
    drafted: [],
    draftedTableReady: true,
    colHeaders: [],
    search: ''
  }),
  computed: {
    // THIS REQUIRES THE ROWS ARE STRINGS - THEY ARE NOT ANYMORE - SEARCH DISABLED
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
      // console.log('ROWS: %o', rows)
      // hide the upload button
      this.showUpload = false

      // update wider-scoped var
      this.rankings = rows

      // get columns headers for use in drafted table (not using b-table there due to event collision)
      // this.colHeaders = Object.keys(this.rankings[0])
      // console.log('COL HEADERS: %o', this.colHeaders)
    },
    removeFromRankings (row) {
      console.log('ROW: %o', row)
      // stop the tables from doing other things
      // this.rankingsTableReady = false
      // this.draftedTableReady = false

      this.drafted.splice(0, 0, row)
      this.rankings.splice(this.rankings.indexOf(row), 1)

      // opent he tables back up
      // this.rankingsTableReady = true
      // this.draftedTableReady = true
      console.log('DRAFTED AFTER ADDITION: %o', this.drafted)
      this.search = ''
    },
    unDraft (row) {
      this.rankings.splice(0, 0, row)
      this.drafted.splice(this.drafted.indexOf(row), 1)
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
  font-size: xx-large;
}

/* for headers and labels */
.orange {
  border: none;
  padding: 0 0 0 5px;
  color: orange;
  font-weight: bold;
}

/* search */
.search {
  display: flex;
  justify-content: center;
}
.search results {
  min-height: 100px;
}

/* grid for rankings tables*/
.container {
  display: grid;
  grid-template-columns: 50% 50%;
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

.rankingsTable th {
  background-color: #d6d6d6;
}

.draftedTable th {
  background-color: #d6d6d6;
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
