<template>
  <div class="sns-share-buttons">
    <div class="line-it-button" data-lang="ja" data-type="share-a" data-ver="3"
         data-url="https://mediage.org/votematch/sen2019/" data-color="default" data-size="small"
         data-count="true" style="display: none;"></div>
    <script src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js" async="async"
            defer="defer"></script>
    <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-hashtags="仙台市議選,ボートマッチ,仙台市議選ボートマッチ"
       data-show-count="false">Tweet</a>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    <div class="fb-share-button" data-href="https://mediage.org/votematch/sen2019/" data-layout="button_count"
         data-size="small"><a target="_blank"
                              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmediage.org%2Fvotematch%2Fsen2019%2F&amp;src=sdkpreparse"
                              class="fb-xfbml-parse-ignore">シェア</a></div>
  </div>
</template>

<script>
  export default {
    name: "SnsShareButtons",
    data() {
      return {
        defaultUrl: 'https://votematch-2019-sendai-shigi.firebaseapp.com/'
      }
    },
    props: {
      ogpId: {
        type: String,
        required: false
      },
    },
    computed: {
      url() {
        return !!this.ogpId ? 'https://us-central1-votematch-2019-sendai-shigi.cloudfunctions.net/s/' + this.ogpId : this.defaultUrl;
      }
    },
  }
</script>

<style scoped lang="scss">
  .sns-share-buttons {
    display: flex;
    justify-content: space-around;
    width: 300px;
    margin: 0 auto;
  }
</style>
