export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: '%s - 仙台市議選ボートマッチ2019',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '仙台市議選ボートマッチ2019は、有権者（あなた）と立候補者の双方に同内容のアンケートに答えてもらい、政策についての考えのマッチ率（一致度）を測定することができるインターネットサービスです。' },
      { hid: 'og:site_name', property: 'og:site_name', content: '仙台市議選ボートマッチ2019' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'http://mediage.org/votematch/sendaishigi-2019' },
      { hid: 'og:title', property: 'og:title', content: '仙台市議選ボートマッチ2019' },
      { hid: 'og:description', property: 'og:description', content: '仙台市議選ボートマッチ2019は、有権者（あなた）と立候補者の双方に同内容のアンケートに答えてもらい、政策についての考えのマッチ率（一致度）を測定することができるインターネットサービスです。' },
      { hid: 'og:image', property: 'og:image', content: 'https://example.com/img/ogp/common.jpg' },
      // { property: 'article:publisher', content: 'FacebookURL' },
      // { property: 'fb:app_id', content: 'FacebookAppID' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@mediage_info' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#cccccc' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/firebase',
    '@/plugins/filters',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    // 'nuxt-basic-auth-module',
    'vue-scrollto/nuxt',
    ['nuxt-fontawesome', {
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faPaperPlane', 'faCheck', 'faCalculator', 'faAdjust', 'faArchive']
        }
      ]
    }],
  ],

  basic: {
    name: 'coffee',
    pass: 'house',
  },

  styleResources: {
    // your settings here
    sass: ['~assets/sass/app.scss'], // alternative: scss
    less: [],
    stylus: []
  },

  webfontloader: {
    google: {
      families: ['Josefin+Sans']
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
