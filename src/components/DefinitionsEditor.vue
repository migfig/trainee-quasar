<template>
  <item-container>
    <q-toolbar class="bg-grey-3">
      <q-btn flat round dense icon="ballot">
        <q-badge floating color="primary">{{
          $store.state.definitions.definitions.length
        }}</q-badge>
      </q-btn>
      <q-toolbar-title>
        Definitions
      </q-toolbar-title>
      <q-btn flat round dense title="Add Definition" icon="add_circle" @click="addDefinition" />
    </q-toolbar>
    <div class="q-pa-md q-gutter-md">
      <q-list bordered class="rounded-borders" clickable>
        <q-expansion-item
          v-for="(definition, index) in $store.state.definitions.definitions"
          :key="index"
          group="definitions"
          expand-separator
          :header-class="definition.id === selectedDefinition.id ? 'bg-grey-3' : ''"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon
                name="ballot"
                color="primary"
              />
            </q-item-section>

            <q-item-section>
              {{ definition.name }}
            </q-item-section>

            <q-item-section side>
              <div class="row items-center">
                <q-btn
                  class="gt-xs"
                  size="12px"
                  flat
                  dense
                  round
                  title="Clone Definition"
                  icon="file_copy"
                  @click="cloneDefinition(definition)"
                />
                <q-btn
                  size="12px"
                  flat
                  dense
                  round
                  title="Remove Definition"
                  icon="delete"
                  @click="removeDefinition(definition)"
                />
              </div>
            </q-item-section>
          </template>
          <definition-form :definition="definition"></definition-form>
        </q-expansion-item>
      </q-list>
    </div>
    <tests-editor :definition="selectedDefinition" style="width: 100%" />
  </item-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';

import ItemContainer from './ItemContainer.vue';
import TestsEditor from 'components/TestsEditor.vue';
import DefinitionForm from './../forms/DefinitionForm.vue';

@Component({
  components: {
    ItemContainer,
    DefinitionForm,
    TestsEditor
  },
  methods: {
    ...mapActions('definitions', [
      'addDefinition',
      'cloneDefinition',
      'removeDefinition'
    ])
  },
  computed: {
    ...mapGetters('definitions', ['selectedDefinition'])
  }
})
export default class DefinitionsEditor extends Vue {}
</script>
