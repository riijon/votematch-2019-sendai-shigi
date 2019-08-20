<template>
  <el-dialog
    :visible.sync="dialogVisible"
    top="50px"
    width="90%">
    <h2>
      候補者のアンケート回答状況
    </h2>
    <p>NPO法人メディアージでは、2019年の仙台市議会議員一般選挙に立候補の届け出をした全候補者の方にボートマッチアンケートを送付しています。</p>
    <p>送付方法は、メール、FAX、SNS等、公開されている情報を中心にご連絡を試みております。</p>
    <p>現時点でアンケートに未回答の候補者の方は、マッチ率が測定されません。</p>
    <p>弊団体では複数回に渡り、複数の手段で候補者及び選挙事務所等にご案内を試みています。</p>
    <p>すべての候補者の方に、可能な限りのご案内を試みることによって公平性の担保を行っておりますが、公平性に疑義のある場合は、本サービスのご利用はお控えください。</p>
    <p>また、現時点で回答いただけていない候補者の関係者の方がおりましたら、ぜひアンケート回答にご協力いただければ幸いです。詳細は info@mediage.org までご連絡ください。</p>

    <h2>青葉区：候補者のアンケート回答状況（届け出順・敬称略）</h2>
    <answer-situation-table :table-data="aobaku" />
    <h2>宮城野区：候補者のアンケート回答状況（届け出順・敬称略）</h2>
    <answer-situation-table :table-data="miyaginoku" />
    <h2>若林区：候補者のアンケート回答状況（届け出順・敬称略）</h2>
    <answer-situation-table :table-data="wakabayashiku" />
    <h2>太白区：候補者のアンケート回答状況（届け出順・敬称略）</h2>
    <answer-situation-table :table-data="taihakuku" />
    <h2>泉区：候補者のアンケート回答状況（届け出順・敬称略）</h2>
    <answer-situation-table :table-data="izumiku" />



    <p>全69候補者 中 回答済54名 未回答14名 回答拒否1名</p>
    <p>本企画に関する問い合わせ先 info@mediage.org</p>

    <span slot="footer" class="dialog-footer"><el-button @click="dialogVisible = false">とじる</el-button></span>
  </el-dialog>
</template>

<script>
  import AnswerSituationTable from "./AnswerSituationTable";
  import aobaku from '~/assets/aobaku.json'
  import miyaginoku from '~/assets/miyaginoku.json'
  import wakabayashiku from '~/assets/wakabayashiku.json'
  import taihakuku from '~/assets/taihakuku.json'
  import izumiku from '~/assets/izumiku.json'

  export default {
    name: "AnswerSituation",
    components: {AnswerSituationTable},
    data() {
      return {
        aobaku: aobaku,
        miyaginoku: miyaginoku,
        wakabayashiku: wakabayashiku,
        taihakuku: taihakuku,
        izumiku: izumiku,
      }
    },
    props: {
      value: {
        type: Boolean,
        required: true
      },
    },
    computed: {
      dialogVisible: {
        get() {
          return this.value
        },
        set(v) {
          this.updateValue(v)
        }
      }
    },
    methods: {
      updateValue(value) {
        this.$emit('input', value)
      }
    },
  }
</script>

<style scoped lang="scss">
  h2 {
    margin: 24px 0 16px;

    &:nth-of-type(1) {
      margin-top: 0;
    }
  }

  p {
    text-align: left;
    margin-bottom: 8px;
  }
</style>
