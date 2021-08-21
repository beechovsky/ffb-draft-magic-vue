<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <section class="hero">
      <header>
        <br>
        <h1><b>FFB DraftMagic</b></h1>
        <br>
      </header>
    </section>

    <!-- UPLOAD BUTTON -->
    <br>
    <upload v-if="this.showUpload === true" @load="setRows" id="uploadButton" class="visible"></upload>
    <br>
    <br>

    <!-- TABLES -->
    <div class="container">
      <!-- RANKINGS TABLE -->
      <div v-if="this.rankings.length > 0" class="item">
        <!-- FILTERING -->
        <!-- https://bootstrap-vue.org/docs/components/table#complete-example -->
        <b-form-group
          label="Filter"
          label-for="filter-input"
          class="orange"
          >
            <b-input-group>
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>

            </b-input-group>
          </b-form-group>
        <!-- END FILTERING -->
        <th>
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
            >
          </b-table>
        </div>
      </div>
      <!-- END RANKINGS TABLE -->

      <!-- DRAFTED TABLE -->
      <div v-if="this.rankings.length > 0" class="item">
        <div style="margin-top: 2.5em;">
          <th>
            <tr class="orange">
              Drafted
            </tr>
          </th>
          <div>
            <b-table :items="this.drafted" :fields="this.draftedColumns" @row-clicked="undraft"></b-table>
          </div>
        </div>
      </div>
      <!-- END DRAFTED TABLE -->
    </div>
  </div>
</template>

<script>
import Upload from './components/Upload'

export default {
  name: 'app',
  data: () => ({
    // upload button
    showUpload: true,

    // tables
    // b-table :items
    rankings: [],
    drafted: [],

    // b-table :fields - may need extra options for styling
    // see: https://bootstrap-vue.org/docs/components/table#complete-example
    colHeaders: [], // useful for smaller drafted table and grokking sheets wih disparate formats
    draftedColumns: [],

    // important/useful columns processing
    nameCol: null, // determined below; used in filter
    nameColIndex: null, // determined below
    posCol: null, // determined below; used in filter
    rankColNames: ['ranking', 'rank', 'rk', 'rk.', 'overall', 'ovr', 'ovr.', 'player rank', 'player.rank'],
    nameColNames: ['player name', 'player.name', 'player', 'name', 'nm', 'nm.'],
    posColNames: ['position', 'pos.', 'pos'],

    // table sorting/filtering
    sortBy: null, // whatever rank is called; determined below, b-table and filter need :field name not index
    sortDirection: 'asc',
    filter: null,
    filterOn: []
  }),
  methods: {
    setRows (rows) {
      // hide the upload button
      this.showUpload = false

      // set wider-scoped var for populating main rankings table
      this.rankings = rows

      // get column headers for use as b-table :fields and for determining rank and name fields, upon which we'll operate
      this.colHeaders = Object.keys(this.rankings[0])
      // determine rank and name columns
      for (var idx in this.colHeaders) {
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

      // populate drafted table :items var
      this.draftedColumns.push(this.colHeaders[this.nameColIndex]) // name - could possibly go in loop above
    },
    removeFromRankings (row) {
      this.drafted.splice(0, 0, row)
      this.rankings.splice(this.rankings.indexOf(row), 1)
    },
    undraft (row) {
      this.rankings.splice(0, 0, row)
      this.drafted.splice(this.drafted.indexOf(row), 1)
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
  /* probably hide drafted table */
}

/* banner */
.hero {
  height: auto; /* grows according to text - won't need updating if I move the instructions*/
  background: url(assets/ffb-banner.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
  /* font-size: x-large;*/
}

.hero h1 {
  color: #fff;
  text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;
  font: xx-large 'ChunkFiveRegular';
}

/* for headers and labels */
.orange {
  border: none;
  padding: 0 0 0 5px;
  color: orange;
  font-weight: bold;
  background-color: #ffffff;
}

/* grid settings*/
.container {
  display: grid;
  grid-template-columns: 50% 25%;
}
.item {
  margin: 1em;
}

/* general table styles since b-table styling isnt working ... */
table {
  min-width: 100%;
  background-color: #ffffff; /* in case page bg color is different */
}

table, tr, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th {
  font-weight: bold;
  background-color: #d6d6d6;
}
td {
  padding: 1px 2px 1px 2px;
}
tr:hover {
  background-color: #d6d6d6;
}
</style>
