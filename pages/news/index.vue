<template>
  <main v-if="!$fetchState.pending">
    <div class="page-container-wide">
      <div class="column1">
        <div class="column1-container">
          <div class="top-title">
            <h1>ARTLIFE NEWS</h1>
            <p>
              Don’t miss a thing. Check out our wide array of news, posts,
              exhibits and more at ArtLife News.
            </p>
          </div>
          <news-main-article :image="heroImage" :main-title="heroTitle" />
          <h2 v-if="customSectionTitle" class="article-grid-title">
            {{ customSectionTitle }}
          </h2>

          <div class="collection-grid exhibit-card">
            <grid-news-exhibit-card v-for="(newsArticle, ix) in customNewsArticles" :key="ix"
              :image="newsArticle.heroImage" :main-title="newsArticle.title" />
          </div>
          <div class="latest-views">
            <h3>LATEST NEWS</h3>
            <hr />
          </div>
          <div class="collection-grid">
            <GridNewsArticleCard v-for="(newsArticle, ix) in gridArticles" :key="ix" :profile="newsArticle" />
          </div>
        </div>
      </div>
      <div class="column2">
        <div class="opinion">
          <h5>OPINION</h5>
          <small-news-card v-for="(newsArticle, ix) in customNewsArticles" :key="ix" :profile="newsArticle" />
        </div>
        <div class="featured">
          <h5>FERTURED ARTIST-WARHOL</h5>
          <small-news-card v-for="(newsArticle, ix) in customNewsArticles" :key="ix" :profile="newsArticle" />
        </div>
        <div class="fashion">
          <h5>FASHION</h5>
          <small-news-card v-for="(newsArticle, ix) in customNewsArticles" :key="ix" :profile="newsArticle" />
        </div>
        <div class="signup-form">
          <div>
            <h5>SIGN UP FOR EXCLUSIVE NEWS & RELEASES</h5>
          </div>
          <div class="signup-input">
            <input type="text" placeholder="Full Name" />
          </div>
          <div class="signup-input">
            <input type=" text" placeholder="Enter Your Email" />
          </div>

          <recaptcha />
          <div class="subscrib">
            <span>SUBSCRIBE</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import newsPage from '@/apollo/queries/sanity/newsPage'
import helpers from '@/lib/mixins/helpers'
import meta from '@/lib/mixins/meta'
export default {
  mixins: [helpers, meta],
  data() {
    return {
      page: null,
      newsArticles: null
      // sitekey: `${process.env.RECAPTCHA_SITE_KEY}`
    }
  },
  async fetch() {
    const { app } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({ query: newsPage })
    this.page = data.page
    this.newsArticles = data.newsArticles
    console.log(this.data)
  },
  methods: {},
  computed: {
    customNewsArticles() {
      // return this.page?.customNewsArticleList

      return this.newsArticles.slice(30, 32)
    },
    gridArticles() {
      return this.newsArticles.slice(1)
    },
    heroArticle() {
      const [first] = this.newsArticles
      return first
    },
    heroImage() {
      return this.heroArticle?.heroImage
    },
    heroTitle() {
      return this.heroArticle?.title
    },
    sectionTitle() {
      return this.page?.sectionTitle
    },
    customSectionTitle() {
      return this.page?.customSectionTitle
    }
  },
  createElement() { }
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  padding: 30px 160px 0 160px !important;

  h5 {
    font-weight: 600;
    font-size: 16px;
  }
}

.page-container-wide {
  background-color: #f8f8f8;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  position: relative;

  .column1 {
    width: 75%;
    float: left;
    // width: 880px;

    .column1-container {
      padding-right: 20px;
    }

    .exhibit-card {
      background-color: #ffffff;
      padding: 20px;
    }
  }

  .column2 {
    // width: calc(100% - 880px);
    width: 25%;
    float: left;

    .signup-form {
      display: flex;
      flex-direction: column;

      .signup-input {
        padding: 8px;
        background-color: #ffffff;
        margin-bottom: 30px;

        input {
          outline: none;
          border: none;
          width: 100%;
          font-size: 12px;
          font-family: 'Raleway';
        }
      }

      .subscrib {
        margin-top: 20px;

        span {
          padding: 15px 30px 15px 30px;
          border: solid 1px #000000;
          text-align: center;
          transition: ease-in 0.3s;
          font-size: 12px;
        }

        span:hover {
          color: #ffffff;
          background-color: #000000;
        }
      }
    }
  }

  .top-title {
    text-align: center;

    margin-bottom: 30px;

    h1 {
      color: #000000;
      font-size: 48px;
      line-height: 64px;
      font-style: normal;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    p {
      color: #000000;
      font-size: 14px;
      line-height: 24px;
      font-style: normal;
      font-weight: 500;
    }
  }

  .article-grid-title {
    max-width: 1280px;
    margin: 20px auto;
    text-align: center;
  }

  .collection-grid:not(:last-of-type) {
    padding-bottom: 56px;
  }

  .latest-views {
    padding-bottom: 30px;
    padding-top: 60px;

    h3 {
      text-align: center;
      padding-bottom: 10px;
      font-weight: 600;
    }
  }
}

@media only screen and (max-width: 600px) {
  main {
    padding: 30px 20px 0 20px !important;
  }


  .page-container-wide {
    display: flex;
    flex-direction: column;

    padding-top: 30px;

    .column2 {
      width: 100%;
    }

    .column1 {
      width: 100%;
    }

  }
}
</style>
