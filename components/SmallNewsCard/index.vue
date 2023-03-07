<template>
    <nuxt-link :to="path" class="collection-grid-item">
        <div class="small-news-card">
            <div class="profile-image">
                <SanityImage :image="image" />
            </div>

            <div class="profile-image-description">
                <h5 itemprop="name" class="news-article-card-title"> <a :href="path">{{ name }}</a> </h5>
            </div>
        </div>
    </nuxt-link>
</template>
  
<script>
import helpers from '@/lib/mixins/helpers'
export default {
    mixins: [helpers],
    props: {
        profile: {
            type: Object,
            required: true
        },
        variation: {
            type: String,
            default: ''
        }
    },
    computed: {
        image() {
            return this.variation === 'artist'
                ? this.profile.featuredImage
                : this.profile.heroImage
        },
        name() {
            return this.variation === 'artist'
                ? this.formatName(this.profile)
                : this.profile.title
        },
        // ? not sure if I need to change the computed path value
        path() {
            return this.variation === 'artist'
                ? this.getArtistOrDesignerPath(this.profile)
                : `/news/${this.profile.slug.current}`
        }
    }
}
</script>
  
<style lang="scss" scoped>
.small-news-card {
    display: flex;

    .profile-image {
        width: 100%;
        padding-bottom: 20px;

        img {
            width: 95px;
            height: 95px;
        }
    }

    .profile-image-description {

        h5 {
            color: #747372;
            font-size: 13px;
            line-height: 15px;
            font-style: italic;
        }
    }

}

.collection-grid-item {
    background-color: #FFFFFF;
}

.news-article-card-title {
    margin: 0 0 10px;


}
</style>
  