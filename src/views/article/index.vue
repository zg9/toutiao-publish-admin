<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header"
           class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form size="mini"
               label-width="40px">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <!-- el-radio默认把label作为文本和☑之后的value -->
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId"
                     placeholder="请选择频道">
            <el-option label="全部"
                       :value="null"></el-option>
            <el-option :label="channel.name"
                       :value="channel.id"
                       v-for="(channel,index) in channels"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="rangeDate"
                          type="datetimerange"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['12:00:00']"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- button按钮的click有一个默认参数,
            当你没有指定参数时,会默认传递一个没用的数据 -->
          <el-button type="primary"
                     :disabled="loading"
                     @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        根据筛选条件共查询到{{ totalCount }}条结果
      </div>
      <!-- 数据列表 -->
      <!--
        Table 表格组件
        1、把需要展示的数组列表数据绑定给 table 组件的 data 属性
        注意：你不用去 v-for 遍历，它自己会遍历
        2、设计表格列 el-table-column
        width 可以设定表格列的宽度
        label 可以设定列的标题
        prop  用来设定要渲染的列表项数据字段，只能展示文本

        3、表格列默认只能渲染普通文本，如果需要展示其它内容，例如放个按钮啊、放个图片啊，那就需要自定义表格列模板了：https://element.eleme.cn/#/zh-CN/component/table#zi-ding-yi-lie-mo-ban
 -->
      <el-table :data="articles"
                style="width: 100%"
                stripe
                size="mini"
                class="list-table"
                v-loading="loading">
        <el-table-column prop="date"
                         label="封面">
          <template slot-scope="scope">
            <!-- 这种情况是在运行期间动态改变处理的,而本地图片必须在打包的时候就存在 -->
            <!-- <img class="article-cover"
                 :src="scope.row.cover.images[0] || 'no-cover.jpg'"
                 alt=""> -->
            <img v-if="scope.row.cover.images[0]"
                 class="article-cover"
                 :src="scope.row.cover.images[0]"
                 alt="">
            <img v-else
                 class="article-cover"
                 src="./no-cover.jpg"
                 alt="">
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         label="标题">
        </el-table-column>
        <el-table-column label="状态">
          <!-- 如果需要在自定义列模板中获取当前遍历项数据，那么就在 template 上声明 slot-scope="scope" -->
          <template slot-scope="scope">
            <!-- {{scope.row.status}} -->
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
            <!-- <el-tag v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag type="warning"
                    v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag type="success"
                    v-else-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag type="danger"
                    v-else-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="info"
                    v-else-if="scope.row.status === 4">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column prop="pubdate"
                         label="发布时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       circle
                       icon="el-icon-edit"
                       type="primary"
                       @click="$router.push('/publish?id='+scope.row.id.toString())"></el-button>
            <el-button size="mini"
                       type="danger"
                       circle
                       icon="el-icon-delete"
                       @click="onDeleteArticle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表分页 -->
      <el-pagination layout="prev, pager, next"
                     background
                     :total="totalCount"
                     @current-change="loadArticles"
                     :page-size="pageSize"
                     :disabled="loading"
                     :current-page.sync="page">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article'

export default {
  name: 'ArticleIndex',
  props: {},
  components: {},
  data () {
    return {
      articles: [], // 文章数据列表
      articleStatus: [
        //   status可以不写,如果遇到没有规律的要写
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      totalCount: 0, // 总数据条数
      pageSize: 20, // 每页大小
      status: null, // 查询文章的状态,不传就是全部
      channels: [], // 文章频道列表
      channelId: null, // 查询文章的频道
      rangeDate: null, // 筛选日期范围
      loading: true, // 表单数据加载loading
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    //   页面初始化,加载第一页
    this.loadArticles(1)
    this.loadChannels()
  },
  mounted () {},
  methods: {
    loadArticles (page) {
      // 展示加载loading
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 结束日期
      }).then((res) => {
        // console.log(res)
        // 解构this.articles = res.data.data.results,定一个对象方便一些
        // 后端不允许**-**,所以用驼峰从命名
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount

        // 关闭加载loading
        this.loading = false
      })
    },

    // onCurrentChange (page) {
    //   //   console.log(page)
    //   this.loadArticles(page)
    // },

    loadChannels () {
      getArticleChannels().then((res) => {
        this.channels = res.data.data.channels
      })
    },

    onDeleteArticle (articleId) {
    //   console.log(articleId)
    //   console.log(articleId.toString())
      this.$confirm('是否确认删除', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
        //   console.log(res)
        // 删除成功,更新当前页的文章数据列表
          this.loadArticles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}

.article-cover {
  width: 50px;
  background-size: cover;
}
</style>
