<template>
  <div id="app">
    <div class="bannerContainer">
      <img src="./assets/ffb-banner.jpg">
      <div class="centered">
        <h1><b>FFB DraftMagic by Jeff Bucklew</b></h1>
        <h2><i>Inspired by the far superior <a href="https://jayzheng.com/ff/" target="_blank">Jay Zheng's Draft Aid</a>.</i></h2>
        <h3>Steps to draft wizardry:</h3>
        <h3>Download a custom rankings CSV from <a href="https://www.fantasypros.com/nfl/rankings/consensus-cheatsheets.php" target="_blank">Fantasy Pros</a>.</h3>
        <h3>Upload it below.</h3>
        <h3>Click on a player to remove them from Rankings as they are drafted.</h3>
        <h3>If you clicked by accident, click that player on the Drafted table to return them to the Rankings table.</h3>
      </div>
    </div>
    <br>
    <upload @load="setRows" id="uploadButton"></upload>
    <br>
    <br>
    <div class="container">
      <div v-if="this.rankings.length > 0" class="rankings">
        <!-- TODO: Search needs work -->
        <!-- <div v-if="this.rankings.length > 0">
          <div class="search-wrapper">
            <label>Search Rankings:</label>
            <input type="text" v-model="search" placeholder="Player Name"/>
          </div>
          <div v-if="searchList.length > 0"> -->
            <!-- eslint-disable-next-line -->
            <!-- <tr v-for="(row, index) in searchList" @click="hideRow(row, index, false)" class="clickable"> -->
              <!-- eslint-disable-next-line -->
              <!-- <td v-for="columnData in row.split(',').splice(0, colCount)">{{ columnData }}</td>
            </tr>
          </div>
        </div> -->
        <th>
          <tr class="orange">
            Rankings
          </tr>
        </th>
        <table class="rankingsTable">
          <tbody>
            <tr>
              <!-- eslint-disable-next-line -->
              <td v-for="colHeader in columnHeaders" style="background-color: #f5f5f5;">{{ colHeader }}</td>
            </tr>
            <!-- eslint-disable-next-line -->
            <tr v-for="(row, index) in mergeSort(this.rankings).splice(1, this.rankings.length)" @click="hideRow(row, index, true)" class="clickable">
              <!-- eslint-disable-next-line -->
              <td v-for="columnData in row.split(',').splice(0, colCount)">{{ columnData }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="this.rankings.length > 0" class="rbs">
        <th>
          <tr class="orange">
            Running Backs
          </tr>
        </th>
        <table class="posTable">
          <tbody>
            <!-- eslint-disable-next-line -->
            <tr v-for="(row, index) in mergeSort(rbList)" @click="hideRow(row, index, false)" class="clickable">
              <!-- eslint-disable-next-line -->
              <td v-for="columnData in row.split(',').splice(0, 4)">{{ columnData }}</td>
            </tr>
          </tbody>
        </table>
        <br>
        <th>
          <tr class="orange">
            Quarter Backs
          </tr>
        </th>
        <table class="posTable">
          <tbody>
            <!-- eslint-disable-next-line -->
            <tr v-for="(row, index) in mergeSort(qbList)" @click="hideRow(row, index, false)" class="clickable">
              <!-- eslint-disable-next-line -->
              <td v-for="columnData in row.split(',').splice(0, 4)">{{ columnData }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="this.rankings.length > 0" class="wrs">
        <th>
          <tr class="orange">
            Wide Receivers
          </tr>
        </th>
        <table class="posTable">
          <tbody>
            <!-- eslint-disable-next-line -->
            <tr v-for="(row, index) in mergeSort(wrList)" @click="hideRow(row, index, false)" class="clickable">
              <!-- eslint-disable-next-line -->
              <td v-for="columnData in row.split(',').splice(0, 4)">{{ columnData }}</td>
            </tr>
          </tbody>
        </table>
        <br>
        <th>
          <tr class="orange">
            Tight Ends
          </tr>
        </th>
        <table class="posTable">
          <tbody>
            <!-- eslint-disable-next-line -->
            <tr v-for="(row, index) in mergeSort(teList)" @click="hideRow(row, index, false)" class="clickable">
              <!-- eslint-disable-next-line -->
              <td v-for="columnData in row.split(',').splice(0, 4)">{{ columnData }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="this.rankings.length > 0" class="drafted">
        <th>
          <tr class="orange">
            Drafted
          </tr>
        </th>
        <table>
          <tbody>
            <!-- eslint-disable-next-line -->
            <tr v-for="(row, index) in this.drafted" @click="putBack(row, index)" class="clickable">
              <!-- eslint-disable-next-line -->
              <td v-for="columnData in row.split(',').splice(1, 3)">{{ columnData }}</td>
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
    rankings: [],
    drafted: [],
    columnHeaders: [],
    colCount: 0,
    search: ''
  }),
  computed: {
    // TODO: search needs work
    searchList () {
      return this.rankings.filter(player => {
        return player.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    rbList () {
      let rbs = []
      this.rankings.filter(player => {
        if (player.split(',')[3].includes('RB')) {
          rbs.push(player)
        }
      })
      return rbs
    },
    wrList () {
      let wrs = []
      this.rankings.filter(player => {
        if (player.split(',')[3].includes('WR')) {
          wrs.push(player)
        }
      })
      return wrs
    },
    qbList () {
      let qbs = []
      this.rankings.filter(player => {
        if (player.split(',')[3].includes('QB')) {
          qbs.push(player)
        }
      })
      return qbs
    },
    teList () {
      let tes = []
      this.rankings.filter(player => {
        if (player.split(',')[3].includes('TE')) {
          tes.push(player)
        }
      })
      return tes
    }
  },
  methods: {
    setRows (rows) {
      for (var player in rows) {
        // async list equivalence op
        this.rankings.splice(rows.indexOf(player), 0, rows[player])
      }

      let headerString = this.rankings[this.rankings.length - 1] // headers magically at the bottom...
      this.columnHeaders = headerString.split(',')
      this.columnHeaders.splice(1, 1) // remove WISD column
      this.columnHeaders.splice(1, 1, 'Name') // rename FFB's dumb column name 'Overall'
      this.colCount = this.columnHeaders.length
    },
    hideRow (row, index, fromRanks) {
      // from the main table
      if (fromRanks === true) {
        this.drafted.splice(0, 0, row)
        this.rankings.splice(index, 1)
      } else {
        // from positional tables - indexes differ so look for a match
        this.rankings.filter((player, index) => {
          if (row.split(',')[0] === player.split(',')[0]) {
            this.drafted.splice(0, 0, row)
            this.rankings.splice(index, 1)
          }
        })
      }
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
        // .split(',')[0] = player rank
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
/* TODO: investigate grid for top of page */
.bannerContainer {
    position: relative;
    text-align: center;
    color: white;
    width: 100%;
}
.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.clickable {
  cursor: pointer;
}
.container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  /* align-items: baseline; */
}
table, td {
  border: 1px solid black;
  border-collapse: collapse;
}
td {
  padding: 2px 4px 2px 4px;
}
.orange {
  text-align: left;
  border: none;
  padding: 0 0 0 5px;
  color: orange;
}
tr:hover {
  background-color: #f5f5f5;
}
.posTable {
  display:block;
  overflow:auto;
  height:300px;
}
.rankingsTable {
  display:block;
  overflow:auto;
  height:1000px;
}
.rankings {
  flex: 2 0 25;
}
.rbs {
  flex: 1 0 15;
}
.wrs {
  flex: 1 0 15;
}
.drafted {
  flex: 1 0 10;
}
</style>
