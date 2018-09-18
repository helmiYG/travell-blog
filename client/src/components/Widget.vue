<template>
       <div class="col-md-4">
         <div class="main-widget">
            <!-- Search Widget -->
            <div class="card my-4">
              <h5 class="card-header">Search</h5>
              <div class="card-body">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search for...">
                  <span class="input-group-btn">
                    <button class="btn btn-secondary" type="button">Go!</button>
                  </span>
                </div>
              </div>
            </div>

            <!-- Categories Widget -->
            <div class="card my-4">
              <h5 class="card-header">Categories</h5>
              <div class="card-body">
                <div class="row">
                  <div class="list-article">
                    <ul class="list-unstyled mb-0">
                      <li v-for="(article, idx) in articles" :key="idx">
                        <router-link :to="`/article/${article.id}`">{{article.title}}</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Side Widget -->
            <div class="card my-4">
              <h5 class="card-header">Side Widget</h5>
              <div class="card-body">
                You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
              </div>
            </div>
         </div>

        </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [
        {
          id: '1',
          title: 'title 1',
          category: 'sport 1',
          content: '1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'
        },
        {
          id: '2',
          title: 'title 2',
          category: 'sport 2',
          content: '2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'
        },
        {
          id: '3',
          title: 'title 3',
          category: 'sport 3',
          content: '3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'
        }
      ]
    }
  }
}
</script>

<style>
.main-widget{
  padding-top: 100px;
}
.list-article{
  margin-left:auto;
  margin-right:auto;
}
</style>
