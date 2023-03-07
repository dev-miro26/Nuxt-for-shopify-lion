<template>
    <nuxt-link :to="path" class="collection-grid-item">
        <div class="profile-image-crop">
            <SanityImage :image="image" />
        </div>


        <h5 itemprop="name" class="news-article-card-title"> <a :href="path">{{ name }}</a> </h5>


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
.collection-grid-item {
    background-color: #FFFFFF;
}

.news-article-card-title {
    margin: 0 0 10px;

    a {
        color: #747372;
        font-size: 13px;
        font-style: italic;
        font-weight: 400;
        letter-spacing: 0px;
        text-transform: uppercase;
    }

    a:hover {
        color: #dd3333
    }
}
</style>
  