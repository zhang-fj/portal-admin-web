<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

  .el-table .edit-table-row .edit-table-col .el-form-item {
      width: 100%;
      margin-bottom: 0px;
  }

  .el-table .edit-table-row .edit-table-col .el-form-item .column-input {
      width: 100%;
  }

  .el-table  .edit-table-row:not(.current-row) .edit-table-col .el-form-item:not(.is-error) .column-input input {
    border: 0px;
  }

  .el-table .el-table__body tr.edit-table-row > td.edit-table-col {
    padding: 5px;
  }

  .el-table .el-table__body tr.edit-table-row > td.edit-table-col .cell {
    padding-left: 0px;
    padding-right: 0px;
  }

  .el-table .el-table__body tr.edit-table-row > td.edit-table-col.is-edit::before{
      content: ""; position: absolute; top: 0; left: 0; width: 10px; height: 10px; border: 5px solid;
      border-top-color: #e36159; border-left-color: #e36159; border-right-color: transparent;
      border-bottom-color: transparent; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;
  }

</style>
