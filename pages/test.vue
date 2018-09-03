<template>
    <test :seller="seller"></test>
</template>
<script>
import test from '~/components/detail.vue'
import axios from 'axios'
export default {
    components:{
        test
    },
    async asyncData ({ params }) {
      let { data } = await axios.get(`http://localhost:8101/api/seller`)
      return { seller: data }
    }
}
</script>

