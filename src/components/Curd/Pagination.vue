<!--分页-->
<template>
  <el-pagination
    :page-size.sync="$parent.size"
    :total="$parent.total"
    :current-page.sync="$parent.page"
    style="margin-top: 8px;"
    layout="total, prev, pager, next, sizes"
    @size-change="$parent.sizeChangeHandler"
    @current-change="$parent.pageChangeHandler"
  />
</template>
