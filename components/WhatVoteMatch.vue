<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="90%">
    <h2><font-awesome-icon icon="paper-plane"/> ボートマッチとは</h2>
    <p>有権者（あなた）と立候補者の双方に同内容のアンケートに答えてもらい、政策についての考えのマッチ率（一致度）を測定することができるインターネットサービスです。<br>
      より気軽に、ゲーム感覚で政治や選挙に触れる機会がつくれないかと考え、仙台市長選挙では初となるボートマッチを公開しました。</p>

    <p>なお、アンケートの集計は厳密に行っておりますが、測定結果は、絶対的なものではありません。<br>
      あなたが今回の選挙で誰に投票するかの１つの参考に、あるいは、立候補者をより詳しく知るための機会として、ご活用ください。</p>

    <h2><font-awesome-icon icon="check"/> 回答方法</h2>
    <p>それぞれの問いについて、該当する答えを選択肢から選んでください。どうしても合致しない場合は、「無回答（わからない）」を選んでください。<br>
      問いに「3つ選んでください」と書かれている場合は、チェックボックスを3つチェックしてください。チェックが３つ以下でも測定結果を見ることはできますが、立候補者とのマッチ率は下がる場合があります。<br>
      回答漏れがあった場合は、「診断する」のボタンを押すことができませんでの、ご注意ください。</p>

    <h2><font-awesome-icon icon="calculator" /><i class="fa fa-calculator fa-blue" aria-hidden="true"></i> マッチ率の計算方法</h2>
    <p>あなたと立候補者が同じ回答をした回答について、「マッチした」とみなします。<br>
      ただし、「無回答」を選んだ場合は、一致したとみなされません（ある設問に対して、あなたと立候補者がどちらも無回答だったとしても、マッチしなかったことになります）。</p>

    <p>設問は、３つまで選択する問いが２種類と、１つだけ選択する問いが14種類あります。<br>
      つまり全部で20の選択肢がありますので、１つ選択がマッチした場合のマッチ率は５％になります。</p>

    <p>なお立候補者に「無回答」の設問がある場合、その候補者とのマッチ率は100%になりませんので予めご了承ください。<br>
      今回のアンケートでは菅原氏が6問無回答のため最大70%、郡氏が3問無回答のため最大85%、林・大久保両氏は全問解答のため最大100%となります。<br>
      また、純粋にアンケート結果に基づいてマッチ率を算出しているため、立候補者が公約として掲げている内容と回答が一致しない場合があります。</p>
    <nuxt-link
      :to="{ name: 'candidate-answers' }"
    >【候補者の回答を確認したい場合は、こちらをクリックしてください】</nuxt-link>
    <p class="small center m20">企画：NPO法人メディアージ・TOHOKU360<br>制作：NPO法人メディアージ・ゆるてっく仙台</p>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">とじる</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "WhatVoteMatch",
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

</style>
