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

    <!-- TABLES -->
    <div class="container">
      <!-- FILTERING -->
      <!-- https://bootstrap-vue.org/docs/components/table#complete-example -->
      <div class="item-filter">
        <div v-if="this.rankings.length > 0">
          <b-form-group
            label="Filter"
            label-for="filter-input"
            class="section-header"
            >
            <b-input-group>
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="'QB', 'Smith', etc."
              ></b-form-input>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>

            </b-input-group>
          </b-form-group>
        </div>
      </div>
      <!-- END FILTERING -->

      <!-- INSTRUCTIONS -->
      <div v-if="this.rankings.length > 0" class="item-instructions" id="instructions">
        <div class="section-header" style="text-align: center; padding-left: 0;">
          Click a player below to return them to main table.
        </div>
      </div>
      <!-- END INSTRUCTIONS -->

      <!-- RANKINGS TABLE -->
      <div v-if="this.rankings.length > 0" class="item-rankings" id="rankings">
        <div class="section-header" style="text-align: left; padding-left: 0;">
          Rankings
        </div>
        <div>
          <b-table
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-direction="sortDirection"
            :sort-by.sync="sortBy"
            :items="this.rankings"
            :fields="this.colHeaders"
            >
            <template v-slot:cell(remove)="{ item }">
              <span><b-button variant="primary" @click="removeFromRankings(item)">Remove</b-button></span>
            </template>
            <template v-slot:cell(draft)="{ item }">
              <span><b-button variant="secondary" @click="draft(item)">Draft</b-button></span>
            </template>
          </b-table>
        </div>
      </div>
      <!-- END RANKINGS TABLE -->

      <!-- REMOVED TABLE -->
      <div v-if="this.rankings.length > 0" class="item-removed" id="removed">
        <div>
          <div class="section-header" style="text-align: left; padding-left: 0;">
              Drafted
          </div>
          <div>
            <b-table :items="this.removed" :fields="this.removedColumns" @row-clicked="putBack"></b-table>
          </div>
        </div>
      </div>
      <!-- END REMOVED TABLE -->

      <!-- DRAFTED TABLE -->
      <div v-if=" this.rankings.length > 0" class="item-drafted" id="drafted">
        <div>
          <div class="section-header" style="text-align: left; padding-left: 0;">
              Drafted by You
          </div>
          <div>
            <b-table :items="this.drafted" :fields="this.draftedColumns" @row-clicked="undraft"></b-table>
          </div>
        </div>
      </div>
      <!-- END DRAFTED -->

    </div> <!-- container -->
  </div> <!-- app -->
</template>

<script>
import Upload from './components/Upload'

export default {
  name: 'app',
  data: () => ({
    // upload button
    showUpload: true,

    // b-table :items
    rankings: [],
    removed: [],
    drafted: [],

    // b-table :fields - may need extra options for styling
    // see: https://bootstrap-vue.org/docs/components/table#complete-example
    colHeaders: [], // useful for smaller drafted table and grokking sheets wih disparate formats
    removedColumns: [],
    draftedColumns: [],

    // important/useful columns processing
    nameCol: null, // used in filter
    nameColIndex: null,
    posCol: null, // used in filter
    byeCol: null,
    byeColIndex: null,
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
      // hide the upload button - currently disbled to allow restart w/o refreshing page, and to keep elements from "jumping"
      // this.showUpload = false

      // set wider-scoped var for populating main rankings table
      this.rankings = rows

      // for b-table :fields and for determining rank, name, and position fields, upon which we'll operate
      this.colHeaders = Object.keys(this.rankings[0])
      // determine rank and name columns
      for (var idx in this.colHeaders) {
        // rank
        if (this.rankColNames.includes(this.colHeaders[idx].toLowerCase())) {
          this.sortBy = this.colHeaders[idx] // sort by overall rank
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

        // bye
        if (this.colHeaders[idx].toLowerCase() === 'bye') {
          this.byeCol = this.colHeaders[idx]
          this.byeColIndex = idx
        }
      }

      // populate removed table :items var
      // clear table in case of re-upload of same sheet (likely)
      for (var wasRemoved in this.removed) {
        this.removed.splice(this.removed[wasRemoved], 1)
      }
      this.removed.length = 0 // length is r/w. weird.

      this.removedColumns.length = 0
      this.removedColumns.push(this.colHeaders[this.nameColIndex])

      // populate drafted table :items var
      // clear table in case of re-upload of same sheet (likely)
      for (var draftee in this.drafted) {
        this.drafted.splice(this.drafted[draftee], 1)
      }
      this.drafted.length = 0 // length is r/w. weird.

      this.draftedColumns.length = 0
      this.draftedColumns.push(this.colHeaders[this.nameColIndex])
      if (this.byeCol !== null) {
        this.draftedColumns.push(this.colHeaders[this.byeColIndex])
      }

      // add actions
      this.colHeaders.push('remove')
      this.colHeaders.push('draft')
    },
    removeFromRankings (row) {
      this.removed.splice(0, 0, row)
      this.rankings.splice(this.rankings.indexOf(row), 1)
    },
    draft (row) {
      // console.log(row)
      this.drafted.splice(0, 0, row)
      this.rankings.splice(this.rankings.indexOf(row), 1)
    },
    undraft (row) {
      this.rankings.splice(0, 0, row)
      this.drafted.splice(this.drafted.indexOf(row), 1)
    },
    putBack (row) {
      this.rankings.splice(0, 0, row)
      this.removed.splice(this.removed.indexOf(row), 1)
    }
  },
  components: {
    Upload
  }
}
</script>

<style>
#app {
  font-family: "Ubuntu", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.clickable {
  cursor: pointer;
}

/* Basic mobile styling */
@media screen and (max-width: 540px) {
  /* hide  secondary tables on mobile */
  #removed, #drafted, #instructions { display: none; }
}

/* banner */
.hero {
  height: auto;
  background: url(assets/ffb-banner.jpg) center;
  background-size: cover;
  /* for non h1 text */
  color: white;

  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.hero h1 {
  color: #fff;
  text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;
  font-size: xxx-large;
}

/* for headers and labels */
.section-header {
  border: none;
  padding: 0 0 0 5px;
  margin-bottom: .1em;
  color: black;
  font-weight: bold;
  background-color: #ffffff;
}

/* grid settings*/
.container {
  display: grid;
  grid-template-columns: 2fr repeat(2, 1fr);
  grid-template-rows: 2em repeat(3, auto); /* 3 rows: one to isolate filter above tables/instructions and one for overflow */
  grid-gap: 1rem;
  grid-auto-flow: dense;
}
.item-filter {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
}
.item-instructions {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
}
.item-rankings {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
}
.item-drafted {
  grid-column-start: 3;
  grid-row-start: 2;
}
.item-removed {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
}

/* general table styles since b-table styling isnt working ... */
table {
  /* min-width: 100%; */
  width: 100%;
  background-color: #ffffff; /* in case page bg color is different */
  position: relative;
}

table, tr, td {
  border: 1px solid black;
  border-collapse: collapse;
}

th { /* may need these ahead of th: table thead  */
  font-weight: bold;
  background-color: #d6d6d6;
  /* position: sticky;
  top: 0; */
}
td {
  padding: 1px 2px 1px 2px;
}
tr:hover {
  background-color: #d6d6d6;
}
</style>
