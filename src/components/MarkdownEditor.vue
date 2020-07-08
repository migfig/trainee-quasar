<template>
  <item-container>
    <q-expansion-item
      expand-separator
      default-opened
      :icon="isExpanded ? 'edit' : 'visibility'"
      v-model="isExpanded"
      label="Markdown"
      header-class="bg-grey-3"
    >
      <monaco-editor
        v-model="selectedDefinition.description"
        :options="$data.options"
        class="editor"
      />
    </q-expansion-item>
    <div
      v-html="compiledDescriptionMarkdown"
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
      'selectedDefinition',
      'compiledDescriptionMarkdown'
    ])
  },
  data: () => ({
    isExpanded: true,
    options: {
      theme: 'vs-dark',
      language: 'markdown',
      minimap: {
        enabled: false,
      },
      automaticLayout: {
        enabled: true,
      },
    }
  })
})
export default class MarkdownEditor extends Vue {}
</script>

<style lang="scss">
.editor {
  height: 30vh; 
  width: 100%;
}

.preview-section {
  padding: 8px;
  background: #fdfef3;
  height: auto;
  overflow-y: auto;
}

div code {
  background: $grey-3;
  color: $primary;
}
</style>
