<template>
    <div>
        <div class="artist-hero-grid">
            <div class="artist-detail-left">
                <SanityImage :image="image"></SanityImage>

                <div class="artist-detail-right">
                    <div class="artist-detail-text">
                        <h2 v-if="mainTitle">
                            <a :href="url">{{ mainTitle }}</a>
                        </h2>
                        <h3><a href="">ArtExhibit</a></h3>
                        <SanityContentLite v-if="blurbBlock.length" :blocks="blurbBlock" />

                        <!-- <p v-if="blurb">{{ blurb }}</p> -->
                    </div>
                </div>

            </div>
        </div>
        <div>

            <h3>ARTIST EXHIBITS</h3>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        mainTitle: {
            type: String,
            default: ''
        },
        image: {
            type: Object,
            default: null
        },
        blurbBlock: {
            type: Array,
            default: () => [],
            required: false
        },
        blurb: {
            type: String,
            default: '',
            required: false
        },
        top: {
            type: String,
            default: ''
        }
    },
    computed: {
        url() {
            return this.image.url
        }
    }
}
</script>
  
<style lang="scss" scoped>
h3 {
    text-align: center;
    font-weight: 600;
}

.artist-hero-grid {
    background-color: #ffffff;
    margin: 16px;
    // display: grid;
    // grid-gap: 16px;

    @include breakpoint('mobile') {
        grid-template-columns: repeat(2, 1fr);

        .artist-detail-left {
            position: relative !important;
            display: flex;
            justify-content: center;
            height: 310px;
            width: 100%;

            .artist-detail-text {
                h2 {
                    font-weight: 600;
                    font-size: 20px;
                }

                h2:hover {
                    color: #dd3333;
                }

                h3 {
                    color: #dd3333;
                    padding-top: 30px;
                    font-size: 14px;
                }

                h3:hover {
                    color: #000000;
                }
            }

            img {
                width: 100%;
                object-fit: cover;

            }
        }

        .artist-detail-right {
            padding: 0 20px 0 20px;
            top: 10%;
            background-color: rgba(255, 255, 255, 0.6);
            position: absolute;
            width: 80%;
            height: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            gap: 16px;
        }
    }

    .read-more-button {
        display: flex;
        justify-content: center;
        padding-top: 10px;

        h4:hover {
            color: #ffffff;
            background-color: #000000;
            font-weight: 600;
        }

        h4 {
            display: flex;
            border: solid 1px #000000;
            padding: 4px;
        }
    }
}
</style>
  