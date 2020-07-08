<template>
  <item-container>
    <q-expansion-item
      expand-separator
      default-opened
      :icon="isExpanded ? 'edit' : 'visibility'"
      v-model="isExpanded"
      label="Html"
      header-class="bg-grey-3"
    >
      <monaco-editor
        v-model="selectedDefinition.htmlSource"
        :options="$data.options"
        class="editor"
      />
    </q-expansion-item>
    <div
      v-html="selectedDefinition.htmlSource"
      class="preview-section"
    ></div>
  </item-container>
</template>

<script lang="js">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import MonacoEditor from 'vue-monaco';

import ItemContainer from './ItemContainer.vue';

@Component({
  components: {
    MonacoEditor,
    ItemContainer
  },
  computed: {
    ...mapGetters('definitions', [
      'selectedDefinition'
    ])
  },
  data: () => ({
    isExpanded: true,
    options: {
      theme: 'vs-dark',
      language: 'html',
      minimap: {
        enabled: false,
      },
      automaticLayout: {
        enabled: true,
      },
    }
  })
})
export default class HtmlEditor extends Vue {}
</script>

<style lang="scss" scoped>
.editor {
  height: 30vh; 
  width: 100%;
}

.preview-section {
  width: 100%;
  background: #fdfef3; // $lime-1;
  height: auto;
  overflow-y: auto;
}
</style>
