<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <section class="hero">
      <header>
        <br>
        <h1><b>FFB DraftMagic</b></h1>
        <!-- <p><i>by <a href="https://github.com/beechovsky/ffb-draft-magic-vue" target="_blank">Jeff Bucklew</a></i></p> -->
        <!-- TODO: include a link for a popup with instructions -->
        <br>
      </header>
    </section>

    <!-- UPLOAD BUTTON -->
    <br>
    <upload v-if="this.showUpload === true" @load="setRows" id="uploadButton" class="visible"></upload>
    <br>
    <br>
    <!-- FILTERING -->
   <!-- <b-container v-if="this.rankings.length > 0" fluid>
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col lg="6" class="my-1">
          <b-form-group
            v-model="sortDirection"
            label="Filter On"
            description="Leave all unchecked to filter on all data"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-checkbox-group
              v-model="filterOn"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
            >
              <b-form-checkbox value="name">Name</b-form-checkbox>
              <b-form-checkbox value="age">Position</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
    </b-container> -->
    <!-- END FILTERING -->

    <!-- TABLES -->
    <div v-if="this.rankings.length > 0">
      <b-form-group
        label="Filter"
        label-for="filter-input"

      >
        <b-input-group>
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
          ></b-form-input>

          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>
    <div v-if="this.rankings.length > 0" class="container">
      <div class="item">
        <th>
        <!-- investigate captions -->
          <tr class="orange">
            Rankings
          </tr>
        </th>
        <div>
          <b-table
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-direction="sortDirection"
            :sort-by.sync="sortBy"
            :items="this.rankings"
            :fields="this.colHeaders"
            @row-clicked="removeFromRankings"
            class="rankingsTable"></b-table>
        </div>
      </div>
      <div class="item">
        <th>
          <tr class="orange">
            Drafted
          </tr>
        </th>
        <div>
          <b-table :items="this.drafted" :fields="this.draftedColumns" @row-clicked="undraft" class="draftedTable"></b-table>
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
    // big upload button
    showUpload: true,

    // tables
    rankings: [],
    drafted: [],

    // used as fields - may need extra optinos for filtering
    // see: https://bootstrap-vue.org/docs/components/table#complete-example
    colHeaders: [], // useful for smaller drafted table and grokking sheets wih disparate formats
    draftedColumns: [],

    sortBy: null, // whatever rank is called; determined below, b-table and filter need field name not index
    nameCol: null, // determined below; used in filter
    nameColIndex: null, // determined below
    posCol: null, // determined below; used in filter
    // common col headers for important/useful columns
    rankColNames: ['ranking', 'rank', 'rk', 'rk.', 'overall', 'ovr', 'ovr.'],
    nameColNames: ['player name', 'player', 'name', 'nm', 'nm.'],
    posColNames: ['position', 'pos.', 'pos'],

    // table filtering
    sortDirection: 'asc',
    filter: null,
    filterOn: [],
    hover: true
  }),
  methods: {
    setRows (rows) {
      // hide the upload button
      this.showUpload = false

      // update wider-scoped var
      this.rankings = rows

      // get columns headers for use as b-table fields and for determining rank and name fields, upon which we'll operate
      this.colHeaders = Object.keys(this.rankings[0])
      // determine rank and name columns
      for (var idx in this.colHeaders) {
        // console.log('HEADER: ' + this.colHeaders[idx])
        // rank
        if (this.rankColNames.includes(this.colHeaders[idx].toLowerCase())) {
          this.sortBy = this.colHeaders[idx]
        }

        // name
        if (this.nameColNames.includes(this.colHeaders[idx].toLowerCase())) {
          this.nameCol = this.colHeaders[idx]
          this.nameColIndex = idx
        }

        // position
        if (this.posColNames.includes(this.colHeaders[idx].toLowerCase())) {
          this.posCol = this.colHeaders[idx]
        }
      }
      this.draftedColumns.push(this.colHeaders[this.nameColIndex]) // name - could possibly go in loop above
    },
    removeFromRankings (row) {
      this.drafted.splice(0, 0, row)
      this.rankings.splice(this.rankings.indexOf(row), 1)
    },
    undraft (row) {
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
  background: url(assets/ffb-banner.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
  font-size: xx-large;
}

.hero h1 {
  color: #fff;
  text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;
  font: 100px 'ChunkFiveRegular';
}

/* for headers and labels */
.orange {
  border: none;
  padding: 0 0 0 5px;
  color: orange;
  font-weight: bold;
}

/* grid for rankings tables*/
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
.rankingsTable th {
  background-color: #d6d6d6;
}
.draftedTable th {
  background-color: #d6d6d6;
}

/* general table styles since b-table styling isnt working ... */
table, tr, td {
  border: 1px solid black;
  border-collapse: collapse;
  background-color: #ffffff; /* in case page bg color is different */
}
th {
  font-weight: bold;
}
td {
  padding: 1px 2px 1px 2px;
}
tr:hover {
  background-color: #d6d6d6;
}
</style>
