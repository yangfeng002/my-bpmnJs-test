<template>
  <div id="app">
    <!-- <create-doc-file :env="`development`"></create-doc-file> -->
    <!-- <clone-doc-file :env="`development`"></clone-doc-file> -->
    <doc-list :env="`development`"></doc-list>
    <!-- <file-meta-data :env="`development`"></file-meta-data> -->
  </div>
</template>
<script>
// import CreateDocFile from './CreateDocFile'
// import CloneDocFile from './CloneDocFile'
import DocList from './DocList'
// import FileMetaData from './FileMetaData'

export default {
  name: 'App',
  components: {
    // CreateDocFile
    DocList
    // FileMetaData,
    // CloneDocFile
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>
<style lang="scss"></style>
