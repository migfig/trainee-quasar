<template>
  <q-page class="fit row wrap justify-around items-stretch content-stretch">
    <definitions-editor />
    <markdown-editor />
    <html-editor />
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

import MarkdownEditor from 'components/MarkdownEditor.vue';
import HtmlEditor from 'components/HtmlEditor.vue';
import DefinitionsEditor from 'components/DefinitionsEditor.vue';

export default Vue.extend({
  name: 'PageIndex',
  components: { 
    MarkdownEditor,
    HtmlEditor,
    DefinitionsEditor
  }
});
</script>
